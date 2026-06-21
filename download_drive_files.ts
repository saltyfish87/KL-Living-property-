import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

interface DriveFile {
  id: string;
  name: string;
  suggestedName: string;
}

const filesToDownload: DriveFile[] = [
  { id: '1TeX3AP9V4iPI-Bbmzh4btwDNe3MT4O1S', name: 'Axis', suggestedName: 'axis_temp' },
  { id: '1LborLBbc1QmSEMz9767L0TWW8lxUfiz6', name: 'Axis compressed image', suggestedName: 'axis_compressed_temp' },
  { id: '1ee8QcOHMpgtlSR4Ks6BMBsb6xGBCWGjS', name: 'Brixton', suggestedName: 'brixton_temp' },
  { id: '1Bga7qrf0Ev3Ra-88VrVba_wZCSIv2EWx', name: 'causewayz square compressed', suggestedName: 'causewayz_square_temp' },
  { id: '1SlTBLhiBJ-eKjchIbJmfB4KZj6Jq2lWk', name: 'Dover (2)', suggestedName: 'dover_temp' }
];

function getCookiesString(setCookieHeaders: string[] | undefined): string {
  if (!setCookieHeaders) return '';
  return setCookieHeaders
    .map(cookie => cookie.split(';')[0])
    .join('; ');
}

async function requestWithRedirects(url: string, headers: Record<string, string> = {}): Promise<{ buffer: Buffer; headers: any }> {
  return new Promise((resolve, reject) => {
    const handleRequest = (currentUrl: string, depth: number) => {
      if (depth > 15) {
        reject(new Error('Too many redirects'));
        return;
      }

      const client = currentUrl.startsWith('https') ? https : http;
      client.get(currentUrl, { headers }, (res) => {
        // Handle redirect
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          let nextUrl = res.headers.location;
          if (!nextUrl.startsWith('http')) {
            const parsedUrl = new URL(currentUrl);
            nextUrl = parsedUrl.origin + nextUrl;
          }
          
          // Merge set-cookie from redirect header if any
          const newCookies = getCookiesString(res.headers['set-cookie']);
          let updatedHeaders = { ...headers };
          if (newCookies) {
            updatedHeaders['Cookie'] = headers['Cookie'] 
              ? `${headers['Cookie']}; ${newCookies}` 
              : newCookies;
          }
          
          handleRequest(nextUrl, depth + 1);
          return;
        }

        if (res.statusCode !== 200) {
          reject(new Error(`Failed with status ${res.statusCode} for URL: ${currentUrl}`));
          return;
        }

        const chunks: Buffer[] = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => {
          resolve({ buffer: Buffer.concat(chunks), headers: res.headers });
        });
      }).on('error', reject);
    };

    handleRequest(url, 0);
  });
}

async function downloadDriveFile(id: string): Promise<Buffer> {
  const url = `https://drive.google.com/uc?export=download&id=${id}`;
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/437.36';
  
  try {
    const res = await requestWithRedirects(url, { 'User-Agent': userAgent });
    const buffer = res.buffer;
    const text = buffer.toString('utf-8', 0, 3000);
    
    if (text.includes('Google Drive - Virus scan warning') || text.includes('download_warning') || text.includes('confirm=')) {
      // Parse for confirm token
      const match = /confirm=([a-zA-Z0-9_-]+)/i.exec(text);
      if (match) {
        const confirmToken = match[1];
        console.log(`[ID: ${id}] Found confirmation token: ${confirmToken}`);
        const confirmUrl = `https://drive.google.com/uc?export=download&id=${id}&confirm=${confirmToken}`;
        
        // Extract cookies if any from the header of the warning page
        const warningCookies = getCookiesString(res.headers['set-cookie']);
        
        const finalRes = await requestWithRedirects(confirmUrl, {
          'User-Agent': userAgent,
          'Cookie': warningCookies
        });
        return finalRes.buffer;
      }
      
      // Another match format
      const confirmFormMatch = /action="([^"]+confirm=([a-zA-Z0-9_-]+)[^"]*)"/i.exec(text);
      if (confirmFormMatch) {
         const confirmToken = confirmFormMatch[2];
         console.log(`[ID: ${id}] Found confirmation token via form action: ${confirmToken}`);
         const confirmUrl = `https://drive.google.com/uc?export=download&id=${id}&confirm=${confirmToken}`;
         const warningCookies = getCookiesString(res.headers['set-cookie']);
         const finalRes = await requestWithRedirects(confirmUrl, {
           'User-Agent': userAgent,
           'Cookie': warningCookies
         });
         return finalRes.buffer;
      }
    }
    return buffer;
  } catch (err: any) {
    console.log(`Direct download failed for ID ${id}: ${err.message}. Retrying with confirm=t fallback...`);
    const confirmUrl = `https://drive.google.com/uc?export=download&id=${id}&confirm=t`;
    const finalRes = await requestWithRedirects(confirmUrl, { 'User-Agent': userAgent });
    return finalRes.buffer;
  }
}

async function run() {
  const tempDir = path.join(process.cwd(), 'temp_downloads');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  for (const f of filesToDownload) {
    console.log(`\n========================================`);
    console.log(`Starting download for: ${f.name} (${f.id})`);
    try {
      const buffer = await downloadDriveFile(f.id);
      console.log(`Downloaded ${buffer.length} bytes.`);
      
      // Detect file type
      let ext = '.bin';
      let isZip = false;
      
      if (buffer.length > 4) {
        // Zip magic: PK\x03\x04
        if (buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04) {
          ext = '.zip';
          isZip = true;
          console.log(`DETECTED TYPE: ZIP archive`);
        } else if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
          ext = '.jpg';
          console.log(`DETECTED TYPE: JPEG image`);
        } else if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
          ext = '.png';
          console.log(`DETECTED TYPE: PNG image`);
        } else if (buffer.toString('utf-8', 0, 4) === 'RIFF' && buffer.toString('utf-8', 8, 12) === 'WEBP') {
          ext = '.webp';
          console.log(`DETECTED TYPE: WebP image`);
        } else if (buffer.toString('utf-8', 0, 1000).includes('<!DOCTYPE html>') || buffer.toString('utf-8', 0, 1000).includes('<html')) {
          ext = '.html';
          console.log(`DETECTED TYPE: HTML page (could be error page or list view)`);
        } else if (buffer.toString('utf-8', 0, 4) === '%PDF') {
          ext = '.pdf';
          console.log(`DETECTED TYPE: PDF document`);
        } else {
          console.log(`DETECTED TYPE: Unknown. First 16 bytes hex: ${buffer.slice(0, 16).toString('hex')}`);
        }
      }

      const tempFilePath = path.join(tempDir, f.suggestedName + ext);
      fs.writeFileSync(tempFilePath, buffer);
      console.log(`Saved file to ${tempFilePath}`);
      
      if (isZip) {
        // Extract Zip!
        const zipExtractDir = path.join(tempDir, f.suggestedName + '_extracted');
        if (!fs.existsSync(zipExtractDir)) {
          fs.mkdirSync(zipExtractDir, { recursive: true });
        }
        console.log(`Extracting zip to ${zipExtractDir}...`);
        const zip = new AdmZip(tempFilePath);
        zip.extractAllTo(zipExtractDir, true);
        console.log(`Extraction done! Files extracted:`);
        const extractedFiles = fs.readdirSync(zipExtractDir);
        for (const ef of extractedFiles) {
          const efPath = path.join(zipExtractDir, ef);
          const stat = fs.statSync(efPath);
          if (stat.isDirectory()) {
            console.log(`  [DIR]  ${ef}`);
            console.log(`         Sub-files:`, fs.readdirSync(efPath));
          } else {
            console.log(`  [FILE] ${ef} (${stat.size} bytes)`);
          }
        }
      } else if (ext === '.html') {
        console.log(`HTML snippet size ${buffer.length}:`);
        console.log(buffer.toString('utf-8', 0, 1000));
      }

    } catch (err: any) {
      console.error(`Error downloading file ${f.name}: ${err.message}`);
    }
  }
}

run();
