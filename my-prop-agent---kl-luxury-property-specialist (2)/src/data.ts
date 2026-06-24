import { Project, Area, BlogPost } from './types';

export const PROJECTS: Project[] = [
  {
    id: '2',
    slug: 'aldenz-damansara',
    name: 'The Aldenz',
    developer: 'EXSIM Group',
    location: 'Damansara Perdana, Petaling Jaya',
    state: 'Selangor',
    area: 'Central Park Damansara',
    minPrice: 625000,
    priceRange: 'From RM 625,000+',
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80',
    status: 'New Launch',
    tenure: 'Leasehold',
    propertyType: 'Serviced Residence',
    tagline: 'Colonial Class In the Hills',
    completionDate: '2028 - 2029',
    completionYear: 2029,
    totalUnits: 662,
    sizeSqft: '775 - 926 sqft',
    rooms: '2 - 3 Bedrooms',
    landSize: 'Approx. 2.55 acres',
    towerCount: 'Single Tower',
    floorCount: '40 Floors',
    maintenanceFee: 'Approx. RM0.38 psf',
    commercialTitle: true,
    overview: 'The Aldenz is a new serviced residence project by EXSIM Group located in Damansara Perdana, within the 65-acre Central Park Damansara township. The concept focuses on "colonial class in the hills" — combining greenery, lifestyle retail, pet-friendly living, and modern city convenience.',
    keyFeatures: [
      'Pet-Friendly Living with Walkable Dining Street',
      'Lush Green Park with Waterfall Landscape Concept',
      'Inspired by Colonial Retail Architecture',
      'Single Tower Luxury (Approx. 40 floors)',
      'Integrated Township with Nanyang Alley & Trader\'s Market'
    ],
    locationAdvantage: [
      'Located in Damansara Perdana near Bandar Utama, TTDI & Kota Damansara',
      'Easy access via LDP, SPRINT & DASH Highway',
      'Strategic for PJ & KL working professionals',
      'Surrounded by 1 Utama, IKEA, The Curve & Empire City'
    ],
    investmentHighlights: [
      'Commercial Title Serviced Residence in Strategic PJ North',
      'Targeted at Professionals, DINK couples and Pet Owners',
      'High demand for pet-friendly concepts in Damansara'
    ],
    nearbyAmenities: [
      { name: 'Mutiara Damansara MRT', distance: '5 mins' },
      { name: 'Bandar Utama MRT', distance: '7 mins' },
      { name: 'IKEA Damansara & The Curve', distance: '5 mins' },
      { name: '1 Utama Shopping Centre', distance: '8 mins' },
      { name: 'KPJ Damansara Specialist Hospital 2', distance: '500m' },
      { name: 'British International School', distance: '2km' },
      { name: 'Sri KDU & SEGi University', distance: '10 mins' }
    ],
    mapImageUrl: 'https://drive.google.com/uc?export=view&id=1xvarCt6LDpiIOBeK6Y8EGZMDYRceVaRD',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dcea42e49?auto=format&fit=crop&q=80'
    ],
    layouts: [
      {
        id: 'al-a1-a2',
        name: 'Type A1 & A2',
        size: '775 sqft',
        rooms: '2 Bedrooms, 2 Bathrooms',
        description: 'Elegant 2-bedroom and 2-bathroom layout styled with Nanyang colonial accents. Perfectly suits young professional couples or smart property investors.',
        imageUrl: 'https://aldenzdamansara.com/wp-content/uploads/2026/03/Aldenz-Type-A-Layout-775-sqft-.png',
        price: 'From RM 625,000'
      },
      {
        id: 'al-b1-b2',
        name: 'Type B1 & B2',
        size: '926 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms',
        description: 'Balanced 3-bedroom and 2-bathroom layout offering enhanced spatial functionality, and a dedicated utility laundry yard. Sized perfectly for modern families.',
        imageUrl: 'https://aldenzdamansara.com/wp-content/uploads/2026/03/Aldenz-Type-B-layout-926-sqft.png',
        price: 'From RM 730,000'
      },
      {
        id: 'al-c1-c2',
        name: 'Type C1 & C2',
        size: '926 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms',
        description: 'Premium 3-bedroom, 2-bathroom model featuring the wider dining and living room hall concepts, overlooking Central Park Damansara scenery.',
        imageUrl: 'https://aldenzdamansara.com/wp-content/uploads/2026/03/Aldenz-Type-C-Layout-926-sqft.png',
        price: 'From RM 750,000'
      },
      {
        id: 'al-d1-d2',
        name: 'Type D1 & D2',
        size: '926 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms',
        description: 'Versatile 3-bedroom, 2-bathroom luxury corner suite featuring a dual-foyer structure. Optimized for complete comfort and multi-generational living.',
        imageUrl: 'https://aldenzdamansara.com/wp-content/uploads/2026/03/Aldenz-Type-D-Layout-926-sqft.png',
        price: 'From RM 780,000'
      }
    ]
  },
  {
    id: '1',
    slug: 'queenswoodz-bukit-jalil',
    name: 'Queenswoodz @ Bukit Jalil',
    developer: 'EXSIM Group',
    location: 'Bukit Jalil, Kuala Lumpur',
    state: 'WP Kuala Lumpur',
    area: 'Bukit Jalil',
    minPrice: 650000,
    priceRange: 'From RM 650,000+',
    thumbnail: 'https://drive.google.com/uc?export=view&id=1fQuUQ0lLRptgseka7bkb2ukwRf1AFX_S',
    status: 'New Launch',
    tenure: 'Leasehold',
    propertyType: 'Serviced Residence',
    tagline: '20ft Extra Wide Living Hall & Unblocked Golf View',
    completionDate: '2029',
    completionYear: 2029,
    totalUnits: 1000,
    sizeSqft: '807 - 1,410 sqft',
    rooms: '2 - 4 Bedrooms',
    landSize: 'Approx. 5 acres',
    towerCount: 'Single Tower',
    floorCount: '52 Floors',
    maintenanceFee: 'Approx. RM0.35 psf',
    commercialTitle: true,
    overview: 'Queenswoodz is a premium serviced residence adjacent to Bukit Jalil Golf & Country Resort, offering extra-wide living halls and unmatched connectivity to Pavilion Bukit Jalil.',
    keyFeatures: ['20ft extra-wide living hall', 'Unblocked Golf Course View', 'Walking distance to Pavilion', 'Near LRT Awan Besar'],
    locationAdvantage: ['Adjacent to Bukit Jalil Golf Resort', 'Minutes to Pavilion Mall'],
    investmentHighlights: ['Premium golf-side Living', 'Strong capital growth potential'],
    nearbyAmenities: [
      { name: 'Pavilion Bukit Jalil', distance: '500m' },
      { name: 'LRT Awan Besar', distance: '400m' },
      { name: 'IMU (International Medical University)', distance: '2.2km' },
      { name: 'Bukit Jalil Recreational Park', distance: '150m' },
      { name: 'KESAS Highway', distance: 'Direct Access' }
    ],
    mapImageUrl: 'https://drive.google.com/uc?export=view&id=1HdAvGdhMqUgnGC1nE4SdX_fAxQmulerE',
    gallery: [
      'https://drive.google.com/uc?export=view&id=1fQuUQ0lLRptgseka7bkb2ukwRf1AFX_S',
      'https://drive.google.com/uc?export=view&id=1so2fgCoyKDevd66NZFOLHepNWtHIKYwP',
      'https://drive.google.com/uc?export=view&id=1jnncG5CZyBoo55CqV0_QsJGEf_7nQuCR',
      'https://drive.google.com/uc?export=view&id=1BVBPvGTfXfAO7S02qto4PIZTxg3MiK2q',
      'https://drive.google.com/uc?export=view&id=1F4ebdPy_BZyBIQst72paZb5SJsTwnUYY',
      'https://drive.google.com/uc?export=view&id=16emYHuwpep5o73vPeOm1AzK5Gz17clZK',
      'https://drive.google.com/uc?export=view&id=1DRLoWJSM0L5kw4aW8KYHl706wNBrTf16',
      'https://drive.google.com/uc?export=view&id=10nFQYLk30fvGJMVAjhCYw20MyoK9K_nN',
      'https://drive.google.com/uc?export=view&id=1zn2jLKCLZtINFg6R-h6DxUbDymrw44pW',
      'https://drive.google.com/uc?export=view&id=1uP8UEoluXyd67Cwx5rZCEBw5zKc7Zj9P',
      'https://drive.google.com/uc?export=view&id=1wUWN9lRtVW6z18mpn7PleUdPkK_fryDZ',
      'https://drive.google.com/uc?export=view&id=1FVluq-hdlPe2Fq7PTsCT0g6stR7vTPuq',
      'https://drive.google.com/uc?export=view&id=1o00HhUbwep5e2ZwlJkNZNxMDYF74Kn89',
      'https://drive.google.com/uc?export=view&id=1wtKSps2Tmw-lQB-UW44B_s1O5gRaVhvl',
      'https://drive.google.com/uc?export=view&id=1FBoaO_mfuBu_rBFnuDr_5WKjRSIjZ974',
      'https://drive.google.com/uc?export=view&id=1YjW5aKuKFDV8n9IOPJVMfCbF-PYvGcq6',
      'https://drive.google.com/uc?export=view&id=1kkPqoshTG_fzSzz4gceUGLSTH6sari-g',
      'https://drive.google.com/uc?export=view&id=1FWxSEvqIDNKuvaLsDCwV218X9WwajWu8'
    ],
    galleryItems: [
      { url: 'https://drive.google.com/uc?export=view&id=1fQuUQ0lLRptgseka7bkb2ukwRf1AFX_S', description: 'Majestic Modern External Facade Design' },
      { url: 'https://drive.google.com/uc?export=view&id=1so2fgCoyKDevd66NZFOLHepNWtHIKYwP', description: 'Second Perspective of Elegant High-Rise Facade' },
      { url: 'https://drive.google.com/uc?export=view&id=1jnncG5CZyBoo55CqV0_QsJGEf_7nQuCR', description: 'Tower Glass & Steel Architectural Details' },
      { url: 'https://drive.google.com/uc?export=view&id=1BVBPvGTfXfAO7S02qto4PIZTxg3MiK2q', description: 'Grand Arrival Drop-off Area Lobby Entrance' },
      { url: 'https://drive.google.com/uc?export=view&id=1F4ebdPy_BZyBIQst72paZb5SJsTwnUYY', description: 'Serene Queens Court Courtyard Landscape' },
      { url: 'https://drive.google.com/uc?export=view&id=16emYHuwpep5o73vPeOm1AzK5Gz17clZK', description: 'Spacious Leisure Lawn and Landscaped Zone' },
      { url: 'https://drive.google.com/uc?export=view&id=1DRLoWJSM0L5kw4aW8KYHl706wNBrTf16', description: 'Shimmering Leisure Lap Swimming Pool' },
      { url: 'https://drive.google.com/uc?export=view&id=10nFQYLk30fvGJMVAjhCYw20MyoK9K_nN', description: 'Relaxing Sun Deck and Lounge Deck Area' },
      { url: 'https://drive.google.com/uc?export=view&id=1zn2jLKCLZtINFg6R-h6DxUbDymrw44pW', description: 'Panoramic Rooftop Sky BBQ Zone' },
      { url: 'https://drive.google.com/uc?export=view&id=1uP8UEoluXyd67Cwx5rZCEBw5zKc7Zj9P', description: 'Safe Kid\'s Shallow Splash and Fun Pool' },
      { url: 'https://drive.google.com/uc?export=view&id=1wUWN9lRtVW6z18mpn7PleUdPkK_fryDZ', description: 'Stately Queen\'s Banquet Hall with grand lighting' },
      { url: 'https://drive.google.com/uc?export=view&id=1FVluq-hdlPe2Fq7PTsCT0g6stR7vTPuq', description: 'Elevated Green Garden Terrace Viewing Deck' },
      { url: 'https://drive.google.com/uc?export=view&id=1o00HhUbwep5e2ZwlJkNZNxMDYF74Kn89', description: 'Whimsical Kid\'s Wonderland Indoor Playroom' },
      { url: 'https://drive.google.com/uc?export=view&id=1wtKSps2Tmw-lQB-UW44B_s1O5gRaVhvl', description: 'Fully Outfitted modern Momentum Fitness Gym' },
      { url: 'https://drive.google.com/uc?export=view&id=1FBoaO_mfuBu_rBFnuDr_5WKjRSIjZ974', description: 'Chic Inspired Lounge reading alcove and coworking zone' },
      { url: 'https://drive.google.com/uc?export=view&id=1YjW5aKuKFDV8n9IOPJVMfCbF-PYvGcq6', description: 'Moonlight Sip Panoramic Rooftop Sky Bar' },
      { url: 'https://drive.google.com/uc?export=view&id=1kkPqoshTG_fzSzz4gceUGLSTH6sari-g', description: 'Double volume Queen\'s social lounge' },
      { url: 'https://drive.google.com/uc?export=view&id=1FWxSEvqIDNKuvaLsDCwV218X9WwajWu8', description: 'Regal Multi-Purpose Private Event Hall' }
    ],
    layouts: [
      {
        id: 'q-a1-a2',
        name: 'Type A',
        size: '807 sqft',
        rooms: '2 Bedrooms, 2 Bathrooms',
        description: 'Charming 2-bedroom and 2-bathroom layout with generous open residential floor space and smart premium kitchen layout. Overlooking scenic community gardens.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1cA1l-m7KWnLoT9X3dZQoFYQGI0Y3kLSN',
        price: 'From RM 650,000'
      },
      {
        id: 'q-b1-b2',
        name: 'Type B',
        size: '936 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms',
        description: 'Optimized 3-bedroom, 2-bathroom architectural blueprint featuring extended common living halls. The ideal home choice for smart modern families.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1o_7_mclK3TB1zbtK6EXuSr7T5XWPS-Qt',
        price: 'From RM 750,000'
      },
      {
        id: 'q-c1',
        name: 'Type C1',
        size: '1,206 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms',
        description: 'Spacious family unit featuring 3 bedrooms plus a dedicated study room, wide balcony layouts, and breathtaking views over Bukit Jalil Golf Greens.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1fEepsxKDlEKlxVnkAaAnR2TaOwwePew7',
        price: 'From RM 950,000'
      },
      {
        id: 'q-c2',
        name: 'Type C2',
        size: '1,206 sqft',
        rooms: '3+1 Bedrooms, 2 Bathrooms',
        description: 'Aesthetic family design layout featuring 3 bedrooms plus an extra study/utility room, extra large layout spacing and panoramic golf views.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1838mV1LlajAUl_y2L2Qq9vpVTQPgpHF_',
        price: 'From RM 970,000'
      },
      {
        id: 'q-d1',
        name: 'Type D1',
        size: '1,410 sqft',
        rooms: '4 Bedrooms (Dual Key), 3 Bathrooms',
        description: 'Premium dual-key floorplan with 4 bedrooms, 3 bathrooms, and an independent key-card entry studio. Configured for maximum monthly rental yield.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=192uiFVO_oTzJ2b-Cs5l6Lu-TptQftfjM',
        price: 'From RM 1,150,000'
      },
      {
        id: 'q-d2',
        name: 'Type D2',
        size: '1,410 sqft',
        rooms: '4 Bedrooms (Dual Key), 3 Bathrooms',
        description: 'Spacious dual-key design showcasing extended living hall layouts, additional utility rooms and unblocked view of the golf resort.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1Qx4Gi3BunDVolt2t-8o2Jgy0zwWQ0tTL',
        price: 'From RM 1,170,000'
      }
    ]
  },
  {
    id: '3',
    slug: 'parkside-residence-bangsar',
    name: 'Parkside Residences @ Setia Federal Hill',
    developer: 'S P Setia',
    location: 'Bangsar Federal Hill, Kuala Lumpur',
    state: 'WP Kuala Lumpur',
    area: 'Bangsar',
    minPrice: 580000,
    priceRange: 'From RM 580,000+',
    thumbnail: 'https://drive.google.com/uc?export=view&id=1RLNAJrK74NlAKVSZhFlHkFUaQSWd8I5O',
    status: 'New Launch',
    tenure: 'Freehold',
    propertyType: 'Serviced Residence',
    tagline: 'Luxury Living at the Edge of Federal Hill',
    completionDate: '2028',
    completionYear: 2028,
    totalUnits: 712,
    sizeSqft: '485 - 1,325 sqft',
    rooms: '1 - 3 Bedrooms',
    landSize: 'Approx. 52-acre Integrated Masterplan',
    towerCount: '2 Towers',
    floorCount: '38 Floors',
    maintenanceFee: 'Approx. RM0.55 psf',
    commercialTitle: true,
    overview: 'Parkside Residences at Setia Federal Hill is a premier luxury development offering unparalleled luxury and greenery, situated within a 52-acre integrated master plan with a 5-acre central park.',
    keyFeatures: ['Direct sheltered link to Bangsar LRT', 'Surrounded by 52-acre integrated masterplan', 'Low density luxury with 5-acre central park'],
    locationAdvantage: ['Walking distance to Bangsar LRT', 'Minutes to Mid Valley City & KL Sentral'],
    investmentHighlights: ['Strategic Transit-Oriented Development', 'High capital appreciation potential in prime Bangsar'],
    nearbyAmenities: [
      { name: 'Bangsar LRT Station', distance: '100m' },
      { name: 'Mid Valley Megamall', distance: '1.5km' },
      { name: 'Bangsar Village', distance: '1.2km' },
      { name: 'KL Sentral', distance: '2km' }
    ],
    mapImageUrl: 'https://drive.google.com/uc?export=view&id=1O41o0DEPH9JhIa6Me30tH05hhd7JLsgU',
    masterPlanImageUrl: 'https://drive.google.com/uc?export=view&id=1G1MxpXPHRdy5IQiZeOBDaW8L-5mt8yd-',
    gallery: [
      'https://drive.google.com/uc?export=view&id=1RLNAJrK74NlAKVSZhFlHkFUaQSWd8I5O',
      'https://drive.google.com/uc?export=view&id=1L50dUsHD4E4VmggEYmhVg9gMiYD3geCr',
      'https://drive.google.com/uc?export=view&id=11e9jn5N8T2Erc7ym6kSP-TfielwoYbkD',
      'https://drive.google.com/uc?export=view&id=1r4epRyvV4KBawmRo4Z7CPkkhmjZgow7Z',
      'https://drive.google.com/uc?export=view&id=1FMQe4r_N86TIEJXLMCr30lgskTYz826a',
      'https://drive.google.com/uc?export=view&id=1ZbruA_7-R59XkodCdS52t6YeYIi2u2Wi',
      'https://drive.google.com/uc?export=view&id=1DaPsepBW6AMRdJdR87MoBh4cBthSsiTA',
      'https://drive.google.com/uc?export=view&id=1kjO1uj_yY4Tdo6kV2ibpjKF-UhakANo9',
      'https://drive.google.com/uc?export=view&id=1HeLTT_LCWB5ubwk_l1Zy2gUVpznAfPW5',
      'https://drive.google.com/uc?export=view&id=17Hqb3JA6PYT03xnC10G_dZY_TK9h3M-0',
      'https://drive.google.com/uc?export=view&id=1bSoqJnX2ddlr_kzGi6YTcH8vvk3jxRwE',
      'https://drive.google.com/uc?export=view&id=1TwYFAxvQRvw05ncj-evzu90-dg8zYYaP',
      'https://drive.google.com/uc?export=view&id=1xu9rLiciHnDbPk80WHKpkNHXIRkf92GT',
      'https://drive.google.com/uc?export=view&id=1rYRvABd78Lk57rtY7TFc2Ud56sxtFTeD',
      'https://drive.google.com/uc?export=view&id=1X1QHm4kNHYqzBDGtLKLKz-TSSvNDsrqa',
      'https://drive.google.com/uc?export=view&id=1G1MxpXPHRdy5IQiZeOBDaW8L-5mt8yd-'
    ],
    galleryItems: [
      { url: 'https://drive.google.com/uc?export=view&id=1RLNAJrK74NlAKVSZhFlHkFUaQSWd8I5O', description: 'Majestic External Archway & Glass Facade' },
      { url: 'https://drive.google.com/uc?export=view&id=1L50dUsHD4E4VmggEYmhVg9gMiYD3geCr', description: 'Grand Tower Facade Rising over Bangsar' },
      { url: 'https://drive.google.com/uc?export=view&id=11e9jn5N8T2Erc7ym6kSP-TfielwoYbkD', description: 'Stupendous Main Lobby Entrance with Concierge Desk' },
      { url: 'https://drive.google.com/uc?export=view&id=1r4epRyvV4KBawmRo4Z7CPkkhmjZgow7Z', description: 'Glittering Infinity Pool directly overlooking Bukit Persekutuan' },
      { url: 'https://drive.google.com/uc?export=view&id=1FMQe4r_N86TIEJXLMCr30lgskTYz826a', description: 'High-Contrast Pool Aerial View highlighting modern deck' },
      { url: 'https://drive.google.com/uc?export=view&id=1ZbruA_7-R59XkodCdS52t6YeYIi2u2Wi', description: 'Lush Rooftop Landscaped Gardens & Facilities' },
      { url: 'https://drive.google.com/uc?export=view&id=1DaPsepBW6AMRdJdR87MoBh4cBthSsiTA', description: 'Panoramic Sky Gym with premium workout zones' },
      { url: 'https://drive.google.com/uc?export=view&id=1kjO1uj_yY4Tdo6kV2ibpjKF-UhakANo9', description: 'Exclusive High-Floor Sky Lounge for elite social gatherings' },
      { url: 'https://drive.google.com/uc?export=view&id=1HeLTT_LCWB5ubwk_l1Zy2gUVpznAfPW5', description: 'Quiet Co-Working Space and reading alcove built for modern professionals' },
      { url: 'https://drive.google.com/uc?export=view&id=17Hqb3JA6PYT03xnC10G_dZY_TK9h3M-0', description: 'Sophisticated Drop-Off Zone structured for seamless transit ingress' },
      { url: 'https://drive.google.com/uc?export=view&id=1bSoqJnX2ddlr_kzGi6YTcH8vvk3jxRwE', description: 'Charming Family Entertainment Room and children play zone' },
      { url: 'https://drive.google.com/uc?export=view&id=1TwYFAxvQRvw05ncj-evzu90-dg8zYYaP', description: 'Double-Volume Living Hall inside premium residential units' },
      { url: 'https://drive.google.com/uc?export=view&id=1xu9rLiciHnDbPk80WHKpkNHXIRkf92GT', description: 'Fully Equipped Multi-Functional Meeting Room with audio-visual system' },
      { url: 'https://drive.google.com/uc?export=view&id=1rYRvABd78Lk57rtY7TFc2Ud56sxtFTeD', description: 'Aesthetic Retail Boulevard & Alfresco dining dining zone next to the 5-acre Central Park' },
      { url: 'https://drive.google.com/uc?export=view&id=1X1QHm4kNHYqzBDGtLKLKz-TSSvNDsrqa', description: 'Living Area Interior View of Type D Showcase unit' },
      { url: 'https://drive.google.com/uc?export=view&id=1G1MxpXPHRdy5IQiZeOBDaW8L-5mt8yd-', description: 'Comprehensive Integrated Project Master Layout Plan (Master Pelan)' }
    ],
    layouts: [
      {
        id: 'p-a',
        name: 'Type A',
        size: '485 sqft',
        rooms: '1 Bedroom',
        description: 'Compact transit-oriented hotel suite layout featuring open interior spaces. Directly connected to the Bangsar LRT walkway.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=13hNDtu3frTkSorNtx8zBGjioC0Mb6Vff'
      },
      {
        id: 'p-b',
        name: 'Type B',
        size: '552 sqft',
        rooms: '1 Bedroom',
        description: 'Spacious 1-bedroom sanctuary with standalone master bedroom and private balcony views of the 5-acre central park.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1vled_-XbeAZgP8JiLdQTH0aMywrnekOx'
      },
      {
        id: 'p-c1',
        name: 'Type C1',
        size: '750 sqft',
        rooms: '2 Bedrooms',
        description: 'Balanced 2-bedroom home meticulously planned for professional couples. Features full-height glass layouts with rich natural lighting.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1AIjuWi_eNX2QxyjGMaZNO6O5QaS8H7OR'
      },
      {
        id: 'p-c2',
        name: 'Type C2',
        size: '750 sqft',
        rooms: '2 Bedrooms',
        description: 'Luxurious 2-bedroom home highlighting extended dining layouts and elegant spatial flow overlooking the pristine central park vistas.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1sNjKZH_bLuwkS020tggozfVK8b37551b'
      },
      {
        id: 'p-d1',
        name: 'Type D1',
        size: '1,050 sqft',
        rooms: '3 Bedrooms',
        description: 'Charming 3-bedroom family layout prioritizing natural daylighting and storage. Built for ultimate urban tranquility and green living.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1FJgrbZ7U48Px25ZqDX_3C0G-iHJEoVlW'
      },
      {
        id: 'p-d2',
        name: 'Type D2',
        size: '1,050 sqft',
        rooms: '3 Bedrooms',
        description: 'Magnificent 3-bedroom premium layout with twin balconies and premium layout details, facing the Bangsar skyline.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1IiCCETWdh1Qy_ORUXnJPDxKOCGBBeIcR'
      },
      {
        id: 'p-d3',
        name: 'Type D3',
        size: '1,050 sqft',
        rooms: '3 Bedrooms',
        description: 'Aesthetic 3-bedroom, 2-bathroom layout featuring an optimized dual-balcony arrangement and breathtaking city views.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=11N5zJbcb62C6onz1FpQlJKaJaN3DJ4yO'
      },
      {
        id: 'p-e1',
        name: 'Type E1',
        size: '1,325 sqft',
        rooms: '3 Bedrooms',
        description: 'Superb executive 3-bedroom residence. Highlights a separate wet and dry kitchen, dining hall, and spectacular skyline views of KL Sentral.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1sncMmgY_gDpF_gZHHU3mDi8gVT6i4k6i'
      },
      {
        id: 'p-e2',
        name: 'Type E2',
        size: '1,325 sqft',
        rooms: '3 Bedrooms',
        description: 'Grand elite executive 3-bedroom penthouse-style suite, with dual kitchen layout. Overlooks full unblocked panoramas of Bukit Persekutuan.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1poQruQORdzM8HblgQIpmsrlxQkx0q79t'
      }
    ]
  },
  {
    id: '4',
    slug: 'kingswoodz-bukit-jalil',
    name: 'Kingswoodz @ Bukit Jalil',
    developer: 'EXSIM Group',
    location: 'Bukit Jalil, Kuala Lumpur',
    state: 'WP Kuala Lumpur',
    area: 'Bukit Jalil',
    minPrice: 380000,
    priceRange: 'From RM 380,000+',
    thumbnail: 'https://drive.google.com/uc?export=view&id=1nTRaBrO1obirsbyinGftgvoh--_ULir7',
    status: 'New Launch',
    tenure: 'Leasehold',
    propertyType: 'Serviced Residence',
    tagline: 'Modern Living Meets Parkview Comfort',
    completionDate: '2028',
    completionYear: 2028,
    totalUnits: 1558,
    sizeSqft: '474 - 904 sqft',
    rooms: '1 - 3 Bedrooms',
    landSize: 'Approx. 4 acres',
    towerCount: '3 towers',
    floorCount: '47 floors',
    maintenanceFee: 'Approx. RM0.35 psf',
    commercialTitle: true,
    overview: 'Kingswoodz offers a balanced lifestyle with easy access to the Bukit Jalil recreational park and modern urban amenities.',
    keyFeatures: ['Park views', 'Comprehensive facilities', 'Smart security'],
    locationAdvantage: ['Near Recreational Park', 'Connected to major highways'],
    investmentHighlights: ['Proven appreciation area', 'High rental yield potential'],
    nearbyAmenities: [{ name: 'Bukit Jalil Park', distance: '300m' }],
    mapImageUrl: 'https://drive.google.com/uc?export=view&id=10fm22qKXNacc05GdH7neugI1NnQV0-3g',
    gallery: [
      'https://drive.google.com/uc?export=view&id=1FnnOQ6sJlosq3nA9pksNcyylBlpNqGut',
      'https://drive.google.com/uc?export=view&id=1X2Th68_wKOuaqb7CGaZs7cFGA8AacVoY',
      'https://drive.google.com/uc?export=view&id=1I3SZNKkrnLV2zeWBcb52z0uAthnUriBd',
      'https://drive.google.com/uc?export=view&id=1p_CtmWEBJoGuMbXaX8vvBFtKFvLtZT5C',
      'https://drive.google.com/uc?export=view&id=1Z1jcM54iaFKj50-rdB8FKuhYMuh0_gZ7',
      'https://drive.google.com/uc?export=view&id=1Wpy5VSGPlyHCr8bHPZL4GohPLoCgBeOY',
      'https://drive.google.com/uc?export=view&id=13DvnOcQS__kCpLbfxltMfZtqHSL__QiO',
      'https://drive.google.com/uc?export=view&id=1GordPnvWzzs6VzHIVkwoDIgZlQBnvx0z',
      'https://drive.google.com/uc?export=view&id=1yjDezKAHQ22rvrkopg3cWjFBmbW-9Ayp'
    ],
    layouts: [
      {
        id: 'k-a1',
        name: 'Type A1',
        size: '474 sqft',
        rooms: '1 Bedroom',
        description: 'Cozy and highly efficient 1-bedroom and 1-bathroom suite, perfectly engineered for single professionals and smart investors.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1mxcsOGVzqwQUPuTczP0oAGcRjM9L9euB'
      },
      {
        id: 'k-b1',
        name: 'Type B1',
        size: '678 sqft',
        rooms: '2 Bedrooms',
        description: 'Excellently structured layout with 2 bedrooms and 2 bathrooms, presenting the ideal home for modern couples and small families.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1wjKFcYHPh37cqH9jWlLdX1axQu2AYhWF'
      },
      {
        id: 'k-c1',
        name: 'Type C1',
        size: '904 sqft',
        rooms: '3 Bedrooms',
        description: 'Generously designed 3-bedroom, 2-bathroom family residence, featuring a signature balcony and spacious living/dining areas overlooking the skyline.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1y-mdwEsASfhaPHb-CJ_6JzFbqbkYeXAP'
      }
    ]
  },
  {
    id: '5',
    slug: 'veladaz-bukit-jalil',
    name: 'Veladaz @ Bukit Jalil',
    developer: 'EXSIM Group',
    location: 'Bukit Jalil, Kuala Lumpur',
    state: 'WP Kuala Lumpur',
    area: 'Bukit Jalil',
    minPrice: 550000,
    priceRange: 'From RM 550,000+',
    thumbnail: 'https://drive.google.com/uc?export=view&id=1alcdUILOAwsFMDnSi5bEsGDFlGB-a_Gb',
    status: 'Selling Fast',
    tenure: 'Leasehold',
    propertyType: 'Serviced Residence',
    tagline: 'Curated Living for the Modern Family',
    completionDate: '2028',
    completionYear: 2028,
    totalUnits: 508,
    sizeSqft: '1,012 sqft',
    rooms: '3 Bedrooms + Study',
    landSize: 'Approx. 3 acres',
    towerCount: 'Single Tower',
    floorCount: '43 floors',
    maintenanceFee: 'Approx. RM0.35 psf',
    commercialTitle: true,
    overview: "Veladaz (formerly known as d'Velada) in Bukit Jalil is a premium transit-oriented residence designed to offer a vibrant, curated lifestyle focusing on wellness, nature, and community collaboration.",
    keyFeatures: ['Covered walk to Alam Sutera LRT', 'Adjacent to Tzu Chi International School', 'EXSIM Premium Artistry & Interior Detailing', 'Multi-tier modern security integrations'],
    locationAdvantage: [
      'Just 150m walking distance to Tzu Chi International School, providing world-class education at your doorstep',
      'Seamlessly connected to LRT Alam Sutera with a covered, weather-shielded pedestrian walkway',
      'Only 5 minutes drive to Pavilion Bukit Jalil, the largest shopping and lifestyle hub of the southern corridor'
    ],
    investmentHighlights: [
      'Bukit Jalil high residential rental demand driven by surrounding international schools and universities',
      'Superb developer name recognition with EXSIM, known for strong capital appreciation and elite craftsmanship',
      'Excellent transit-oriented location protecting asset value against economic cycles'
    ],
    nearbyAmenities: [
      { name: 'Tzu Chi International School', distance: '150m (Direct Walking Distance)' },
      { name: 'LRT Alam Sutera Station', distance: '500m (Covered Pedestrian Walkway)' },
      { name: 'Pavilion Bukit Jalil', distance: '2.0km (5 Mins Drive)' },
      { name: 'SJK (C) Lai Meng', distance: '2.2km' },
      { name: 'Bukit Jalil Recreation Park', distance: '2.8km' },
      { name: 'Bukit Jalil Golf & Country Resort', distance: '3.0km' },
      { name: 'Giant Hypermarket Bandar Kinrara', distance: '3.0km' },
      { name: 'International Medical University (IMU)', distance: '3.5km' }
    ],
    mapImageUrl: 'https://drive.google.com/uc?export=view&id=1r1hl0335-MsW1dPSnwV7G7yxEwelMBG2',
    gallery: [
      'https://drive.google.com/uc?export=view&id=1alcdUILOAwsFMDnSi5bEsGDFlGB-a_Gb',
      'https://drive.google.com/uc?export=view&id=1oYOVL3Cb4baSwVi4Xow8EDphwNH0yinT',
      'https://drive.google.com/uc?export=view&id=1yAOi0cCKf6R6h90qWeKr9dlF-vfdQ4Tw',
      'https://drive.google.com/uc?export=view&id=1Vrbw6LNrzjIysqkvlMGq7BOJ7Ce3pGOt',
      'https://drive.google.com/uc?export=view&id=1soWoYOfSovQtW_BYdIejWEumMAtp0WFb',
      'https://drive.google.com/uc?export=view&id=1jEi-CVSowR6tCpT6l049P8RrwMr0oHnY',
      'https://drive.google.com/uc?export=view&id=1wmhNXIOtXlyKSuaq8WAk7_jGzWxAJ78_',
      'https://drive.google.com/uc?export=view&id=1nBVL9u7_ozQrasz2gzckJr-0tPmxo0_n',
      'https://drive.google.com/uc?export=view&id=1rd3zwiHTrGhCEYnWzDb0boKFWwlkyYZJ'
    ],
    galleryItems: [
      { url: 'https://drive.google.com/uc?export=view&id=1alcdUILOAwsFMDnSi5bEsGDFlGB-a_Gb', description: 'Modern Architectural High-Rise Tower Facade' },
      { url: 'https://drive.google.com/uc?export=view&id=1oYOVL3Cb4baSwVi4Xow8EDphwNH0yinT', description: 'Contemporary Tower Exterior and Green Landscape' },
      { url: 'https://drive.google.com/uc?export=view&id=1yAOi0cCKf6R6h90qWeKr9dlF-vfdQ4Tw', description: 'Scenic Evening Exterior Illumination & Entrance' },
      { url: 'https://drive.google.com/uc?export=view&id=1Vrbw6LNrzjIysqkvlMGq7BOJ7Ce3pGOt', description: 'Pristine Soothing Pool surrounded by lush tropical trees' },
      { url: 'https://drive.google.com/uc?export=view&id=1soWoYOfSovQtW_BYdIejWEumMAtp0WFb', description: 'Peaceful Yoga & Zen Meditation Deck' },
      { url: 'https://drive.google.com/uc?export=view&id=1jEi-CVSowR6tCpT6l049P8RrwMr0oHnY', description: 'Premium Relaxing Outdoor Jacuzzi Zone' },
      { url: 'https://drive.google.com/uc?export=view&id=1wmhNXIOtXlyKSuaq8WAk7_jGzWxAJ78_', description: 'Detailed Vertical Section View of facilities & towers' },
      { url: 'https://drive.google.com/uc?export=view&id=1nBVL9u7_ozQrasz2gzckJr-0tPmxo0_n', description: "Farmer's Communal Kitchen & Elegant Dining Hall" },
      { url: 'https://drive.google.com/uc?export=view&id=1rd3zwiHTrGhCEYnWzDb0boKFWwlkyYZJ', description: 'Scenic Rooftop Sky Garden & Viewing Deck' }
    ],
    layouts: [
      {
        id: 'v-a1',
        name: 'Type A1 (With Balcony)',
        size: '1,012 sqft',
        rooms: '3 Bedrooms + Study',
        description: 'Premium family layout featuring 3 bedrooms, 2 bathrooms, plus a custom study alcove and spacious balcony.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=12M0h2G7eFmLyY82f1_v0HewOq5FYyDmV'
      },
      {
        id: 'v-a2',
        name: 'Type A2 (Without Balcony)',
        size: '1,012 sqft',
        rooms: '3 Bedrooms + Study',
        description: 'Sleek, streamlined layout featuring 3 bedrooms, 2 bathrooms, plus a custom study alcove with maximized interior living room floor area.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1K2fJ8LNhHr1eviMGdeBlX3WxcXCQjDXd'
      },
      {
        id: 'v-b1',
        name: 'Type B1 (With Balcony)',
        size: '1,012 sqft',
        rooms: '3 Bedrooms + Study',
        description: 'Luminous family design featuring 3 bedrooms, 2 bathrooms, study room, and beautiful outdoor balcony orientation.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1gm61ywPZWofiXWH4f_bEGlxkaBL6Pa1u'
      },
      {
        id: 'v-b2',
        name: 'Type B2 (Without Balcony)',
        size: '1,012 sqft',
        rooms: '3 Bedrooms + Study',
        description: 'Maximized interior floor plan featuring 3 bedrooms, 2 bathrooms, and a dedicated workspace without balcony.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1GohEfb55tWGTcbo7cwPsXJQIZWplTiCa'
      }
    ]
  },
  {
    id: '6',
    slug: 'vividz-bukit-jalil',
    name: 'Vividz Bukit Jalil',
    developer: 'EXSIM Group',
    location: 'Bukit Jalil, Kuala Lumpur',
    state: 'WP Kuala Lumpur',
    area: 'Bukit Jalil',
    minPrice: 420000,
    priceRange: 'From RM 400,000+',
    thumbnail: 'https://drive.google.com/uc?export=view&id=1py192g_GxuSATwaXEkiWjKD2QtxY2v0e',
    status: 'Pre-Launch',
    tenure: 'Leasehold',
    propertyType: 'Serviced Residence',
    tagline: 'Vibrant Life, Vivid Living Near KL Wellness City',
    completionDate: '2028',
    completionYear: 2028,
    totalUnits: 712,
    sizeSqft: '650 - 950 sqft',
    rooms: '2 - 3 Bedrooms',
    landSize: 'Approx. 2.8 acres',
    towerCount: 'Single Tower',
    floorCount: '40 floors',
    maintenanceFee: 'Approx. RM0.35 psf',
    commercialTitle: true,
    overview: 'Vividz is designed for the youthful at heart, blending high-energy design with functional spaces.',
    keyFeatures: ['6 Minutes to Pavilion', 'Next to KL Wellness City', 'E-sports arena'],
    locationAdvantage: ['Next to KL Wellness City', 'Walking distance to amenities'],
    investmentHighlights: ['High potential for medical tourism rental', 'Affordable entry for youth'],
    nearbyAmenities: [{ name: 'KL Wellness City', distance: '100m' }],
    mapImageUrl: 'https://drive.google.com/uc?export=view&id=1CThPcVRZZWuEYL231bh5yZTofcXiSIuU',
    gallery: [
      'https://drive.google.com/uc?export=view&id=1py192g_GxuSATwaXEkiWjKD2QtxY2v0e',
      'https://drive.google.com/uc?export=view&id=1X4uECRgeO05-78ip0SSOd9NUvbnSakPB',
      'https://drive.google.com/uc?export=view&id=1eE8vhkrkvxrMR_o3YwnXcJ21ExHZlB-M',
      'https://drive.google.com/uc?export=view&id=1hz64rMVhaHF1Hb9axUDbvX_zFy5Jv5MK',
      'https://drive.google.com/uc?export=view&id=1jyaZJA0OiYt_Z6QNp_by3L77SEU1rxqE',
      'https://drive.google.com/uc?export=view&id=1Ibn-gsRenEGXobOqBfpBesl_GhVz_TPl',
      'https://drive.google.com/uc?export=view&id=1odN_iPwJD377o425aPnTO5xvrP5dpRAT',
      'https://drive.google.com/uc?export=view&id=1RmAerHq-9ZASnNq1nRivWumgbZyKiEFM',
      'https://drive.google.com/uc?export=view&id=1rvx5DSWrdLDkcWmugPJg8tfrg4l-Zz5u',
      'https://drive.google.com/uc?export=view&id=1-81lVcJp7WpFV6xhEsKy_E5uHsPfxqZv',
      'https://drive.google.com/uc?export=view&id=1kJpg97P36w7yX0tUDOv-9V-qiBcu90tn',
      'https://drive.google.com/uc?export=view&id=1G3ilpERzJeTvaYcdDo_9s7m4K0M5gjv6',
      'https://drive.google.com/uc?export=view&id=1VLj5dkhTcaC0F108glQe1YbvmcacpdU3',
      'https://drive.google.com/uc?export=view&id=1zqjidqD5ngiPYl7-AFjxhS42GJxoA22L'
    ],
    galleryItems: [
      { url: 'https://drive.google.com/uc?export=view&id=1py192g_GxuSATwaXEkiWjKD2QtxY2v0e', description: 'Modern Color-Pop Architectural High-Rise Tower Facade' },
      { url: 'https://drive.google.com/uc?export=view&id=1X4uECRgeO05-78ip0SSOd9NUvbnSakPB', description: 'Vibrant Chromatic Funland Outdoor Theme Park' },
      { url: 'https://drive.google.com/uc?export=view&id=1eE8vhkrkvxrMR_o3YwnXcJ21ExHZlB-M', description: 'Whimsical and Sculpted Butterscotch Garden' },
      { url: 'https://drive.google.com/uc?export=view&id=1hz64rMVhaHF1Hb9axUDbvX_zFy5Jv5MK', description: 'Intimate Quiet Aromatic Herbs Garden Zone' },
      { url: 'https://drive.google.com/uc?export=view&id=1jyaZJA0OiYt_Z6QNp_by3L77SEU1rxqE', description: 'Stylist Outdoor BBQ & Grill Garden with social spaces' },
      { url: 'https://drive.google.com/uc?export=view&id=1Ibn-gsRenEGXobOqBfpBesl_GhVz_TPl', description: 'Scenic Proposed Central Park by Master Developer' },
      { url: 'https://drive.google.com/uc?export=view&id=1odN_iPwJD377o425aPnTO5xvrP5dpRAT', description: 'Beautifully Landscaped Green Master Park View' },
      { url: 'https://drive.google.com/uc?export=view&id=1RmAerHq-9ZASnNq1nRivWumgbZyKiEFM', description: 'Exclusive High-Comfort Leisure Villa & Lounge' },
      { url: 'https://drive.google.com/uc?export=view&id=1rvx5DSWrdLDkcWmugPJg8tfrg4l-Zz5u', description: 'Chic Cloud Lounge observatory space with viewing platform' },
      { url: 'https://drive.google.com/uc?export=view&id=1-81lVcJp7WpFV6xhEsKy_E5uHsPfxqZv', description: 'Elegant Lobby Lounge B with soaring ceiling structure' },
      { url: 'https://drive.google.com/uc?export=view&id=1kJpg97P36w7yX0tUDOv-9V-qiBcu90tn', description: 'Contemporary Social Lounge ideal for work and play' },
      { url: 'https://drive.google.com/uc?export=view&id=1G3ilpERzJeTvaYcdDo_9s7m4K0M5gjv6', description: 'Premium Dine-in Gourmet Villa with kitchen facilities' },
      { url: 'https://drive.google.com/uc?export=view&id=1VLj5dkhTcaC0F108glQe1YbvmcacpdU3', description: 'Expansive Pristine Sky pool & Relaxation Deck' },
      { url: 'https://drive.google.com/uc?export=view&id=1zqjidqD5ngiPYl7-AFjxhS42GJxoA22L', description: 'State-of-the-Art Multi-Level Luxury Club Facilities diagram' }
    ],
    layouts: [
      {
        id: 'vi-a1',
        name: 'Type A1',
        size: '650 sqft',
        rooms: '2 Bedrooms + 2 Bathrooms',
        description: 'Cozy modern configuration optimizing every square inch of layout for smart living, perfect for young families and career professionals.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=12WjBS1973CkrISA0tVEwuxU00SPt5vy1'
      },
      {
        id: 'vi-b1',
        name: 'Type B1',
        size: '800 sqft',
        rooms: '3 Bedrooms + 2 Bathrooms',
        description: 'Vibrant and spacious layout focusing on open flow connectivity, private laundry yard, and a charming balcony looking towards KL Wellness City.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1O-Qze-rnS9iuSN2itQZSO6mPS2psrwsZ'
      },
      {
        id: 'vi-c1',
        name: 'Type C1',
        size: '950 sqft',
        rooms: '3 Bedrooms + 2 Bathrooms (Spacious Balcony)',
        description: 'Extended living area opening onto a magnificent wide balcony, master suite with a luxury walk-in wardrobe nook.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1VwwzdyqO2lIucdZGl9hNBIC5rVadK88b'
      },
      {
        id: 'vi-c2',
        name: 'Type C2',
        size: '950 sqft',
        rooms: '3 Bedrooms + 2 Bathrooms (Dual-Key Potential)',
        description: 'Highly versatile luxury layout prepared for Dual-Key configuration, offering unparalleled rental yield versatility and privacy.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1jTpr5bHXVY5GD89pqJ8Di2wL8WT0z9N8'
      }
    ]
  },
  {
    id: '7-axis',
    slug: 'causewayz-axis',
    name: 'Axis Tower @ Causewayz Square',
    developer: 'EXSIM Group',
    location: 'Johor Bahru City Centre (JBCC), Johor',
    state: 'Johor',
    area: 'Johor Bahru',
    minPrice: 500000,
    priceRange: 'From RM 500,000+',
    thumbnail: 'https://drive.google.com/uc?export=view&id=1H2xx_8G4fZUM6qec6qW0jNUZZMpFT7NK',
    mapImageUrl: 'https://drive.google.com/uc?export=view&id=1lDtSwQcWgv-pBsCh59lIFsGFGGCSDYhA',
    status: 'New Launch',
    tenure: 'Freehold',
    propertyType: 'Serviced Residence & Short Stay',
    tagline: 'ONLY Tower Guest-Ready for Short-Term Airbnb / Short Stay',
    completionDate: 'Approx. 60 Months from APDL',
    completionYear: 2031,
    totalUnits: 908,
    sizeSqft: '336 - 592 sqft',
    rooms: 'Studio & Dual Key',
    landSize: 'Part of Causewayz Square ~7.7 ac masterplan',
    towerCount: 'Axis Tower (Tower A)',
    floorCount: '60 storeys',
    maintenanceFee: 'Approx. RM0.45 psf',
    commercialTitle: true,
    overview: 'Axis Tower is the dynamic, high-performance SOHO and studio-focused tower at Causewayz Square. It is strictly the ONLY tower designed and approved for Airbnb and short-term stay in the entire development. Fully furnished and guest-ready upon handover, it integrates seamlessly into a managed rental ecosystem utilizing the premier Mana-Mana Hospitality concept. Rising 60 storeys with 908 prime units, Axis Tower targets active cross-border daily commuters and travelers driving immense dual-currency yields.',
    keyFeatures: [
      'The strictly ONLY tower within Causewayz Square approved for short-term and Airbnb stays',
      'Fully furnished, turnkey rental-ready units maximizing immediate occupancy post-handover',
      'Managed rental ecosystem featuring the professional Mana-Mana Hospitality concierge layout',
      'Massive 60-storey high-rise presence capturing beautiful panoramas of JB and Singapore straits'
    ],
    locationAdvantage: [
      'Just a ~600m breezy walk to Singapore Causeway CIQ and upcoming Bukit Chagar RTS terminal',
      'Deeply integrated into the bustling central Johor Bahru City Centre culinary and commercial zone',
      'Highly valued freehold status in the heart of the ultra-high demand RTS transportation gateway'
    ],
    investmentHighlights: [
      'Extremely high turnover potential catering directly to Singapore short-stay travelers and tourists',
      'Perfect exit liquidity backed by premium dual-currency commuters and executive stays',
      'Hassle-free landlordship powered by EXSIM\'s integrated hospitality management solution'
    ],
    nearbyAmenities: [
      { name: 'Singapore Causeway CIQ Complex', distance: '600m (5 Mins)' },
      { name: 'Bukit Chagar RTS Link Station', distance: '600m (5 Mins Walk)' },
      { name: 'Komtar JBCC & City Square Mall', distance: '400m (3 Mins)' },
      { name: 'Gleneagles Hospital Medini', distance: '15 Mins Drive' }
    ],
    gallery: [
      'https://drive.google.com/uc?export=view&id=1H2xx_8G4fZUM6qec6qW0jNUZZMpFT7NK',
      'https://drive.google.com/uc?export=view&id=1iHHQSzUBYRO4-yHbYhrH0s9VQ1nMQvB3',
      'https://drive.google.com/uc?export=view&id=1WTkkx0S5CrkwEEdEwr-J5yxm4wZj2gla',
      'https://drive.google.com/uc?export=view&id=15EMdJXBc6iLJw9goGylhRGL-lg7WzlSQ',
      'https://drive.google.com/uc?export=view&id=19Ga1B55ZDzh4RCeE3J5I4Ijn6IXDoDAW',
      'https://drive.google.com/uc?export=view&id=1GlJhtn-W73C_779swiqlf9IHMeMKvYBv'
    ],
    galleryItems: [
      { url: 'https://drive.google.com/uc?export=view&id=1H2xx_8G4fZUM6qec6qW0jNUZZMpFT7NK', description: 'Axis Tower stunning modern structural glass facade' },
      { url: 'https://drive.google.com/uc?export=view&id=1iHHQSzUBYRO4-yHbYhrH0s9VQ1nMQvB3', description: 'Sleek wavescape infinity swimming pool' },
      { url: 'https://drive.google.com/uc?export=view&id=1WTkkx0S5CrkwEEdEwr-J5yxm4wZj2gla', description: 'Lively Sky Deck with Panoramic Views' },
      { url: 'https://drive.google.com/uc?export=view&id=15EMdJXBc6iLJw9goGylhRGL-lg7WzlSQ', description: 'Chic double-height reception lobby lounge' },
      { url: 'https://drive.google.com/uc?export=view&id=19Ga1B55ZDzh4RCeE3J5I4Ijn6IXDoDAW', description: 'Relaxing high-floor biophilic hot jacuzzi' },
      { url: 'https://drive.google.com/uc?export=view&id=1GlJhtn-W73C_779swiqlf9IHMeMKvYBv', description: 'Social garden sky bar and biophilic BBQ zone' }
    ],
    layouts: [
      {
        id: 'causewayz-axis-studio',
        name: 'Studio Suite (Type A)',
        size: '336 sqft',
        rooms: 'Studio, 1 Bathroom',
        description: 'Elite compact suite. Highly optimized by EXSIM with premium modular layouts, turnkey furniture packs, and custom smart-home provisions.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1lwM-Xw1ZOSLPw1YzQOfyi8zZGt_hvwR1',
        price: 'From RM 500,000'
      },
      {
        id: 'causewayz-axis-dual-key',
        name: 'Dual Key Suite (Type B)',
        size: '592 sqft',
        rooms: 'Dual Key (Studio + Hotel Suite Concept)',
        description: 'High-income dual-key configuration designed to maximize active short-term platforms under managed hotel concierge operations.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=13SVmGBg9H6W6mGTzJlWUMxaffNV74PBu',
        price: 'From RM 750,000'
      }
    ]
  },
  {
    id: '7-brixton',
    slug: 'causewayz-brixton',
    name: 'Brixton Tower @ Causewayz Square',
    developer: 'EXSIM Group',
    location: 'Johor Bahru City Centre (JBCC), Johor',
    state: 'Johor',
    area: 'Johor Bahru',
    minPrice: 450000,
    priceRange: 'From RM 450,000+',
    thumbnail: 'https://drive.google.com/uc?export=view&id=1JiPtQRcjAo_dE2qCwWXIYxNcN4JZsWst',
    mapImageUrl: 'https://drive.google.com/uc?export=view&id=1lDtSwQcWgv-pBsCh59lIFsGFGGCSDYhA',
    status: 'New Launch',
    tenure: 'Freehold',
    propertyType: 'Service Apartment Residential',
    tagline: 'Premium Cozy Residences Built Specially for Long-Term Living & Own Stay',
    completionDate: 'Approx. 60 Months from APDL',
    completionYear: 2031,
    totalUnits: 1257,
    sizeSqft: '474 - 850 sqft',
    rooms: '1, 2, 3 Bedrooms & Dual Key',
    landSize: 'Part of Causewayz Square ~7.7 ac masterplan',
    towerCount: 'Brixton Tower B1 & B2 (B1: 537 units, B2: 720 units)',
    floorCount: '60 storeys',
    maintenanceFee: 'Approx. RM0.45 psf',
    commercialTitle: true,
    overview: 'Brixton Tower comprises two signature residential towers (B1 and B2) crafted precisely for owner-occupiers and stable, high-quality long-term tenants. Maintaining a strict policy against short-term Airbnb operators, Brixton provides a quiet, peaceful sanctuary perfect for families, young professionals, and Singapore workers. Offering generous lifestyle amenities, it towers 60 storeys with a combined total of 1,257 elegant homes that celebrate sophisticated, community-oriented urban living.',
    keyFeatures: [
      'Dedicated residential-only ecosystem: Strictly NO Airbnb allowed for maximum privacy and safety',
      'Dual-tower development (B1 housing 537 units & B2 housing 720 units) totaling 1,257 homes',
      'The ideal choice for cross-border professionals looking for quiet, long-term premium rental arrangements',
      'Rich multi-tier state-of-the-art wellness terraces, botanical sky gardens, and organic pool layouts'
    ],
    locationAdvantage: [
      'Effortless walking convenience (approx. 600m) to major transits, culinary hubs, and the CIQ',
      'Strolls with ease into high-end retail venues, City Square Mall, and JB Sentral',
      'Sweeping, safe view corridors towards Singapore Woodlands and Johor Straits waterfronts'
    ],
    investmentHighlights: [
      'Attracts highly stable, high-income executive tenants who prioritize security and high-end upkeep',
      'Exceedingly competitive residential entry points from RM 450,000 for a prime central freehold address',
      'Backed by EXSIM\'s stellar long-term facility management and premium lifestyle branding'
    ],
    nearbyAmenities: [
      { name: 'Singapore Causeway CIQ Complex', distance: '600m (5 Mins)' },
      { name: 'Bukit Chagar RTS Link Station', distance: '600m (5 Mins Walk)' },
      { name: 'Komtar JBCC & City Square Mall', distance: '400m (3 Mins)' },
      { name: 'Gleneagles Hospital Medini', distance: '15 Mins Drive' }
    ],
    gallery: [
      'https://drive.google.com/uc?export=view&id=1JiPtQRcjAo_dE2qCwWXIYxNcN4JZsWst',
      'https://drive.google.com/uc?export=view&id=1ujQni-geBChEaEDQgnHSjQdo0BPR9Eht',
      'https://drive.google.com/uc?export=view&id=1QAaulQ_J8JBe2VftRRlXJTXjnvtepAMF',
      'https://drive.google.com/uc?export=view&id=1iHHQSzUBYRO4-yHbYhrH0s9VQ1nMQvB3'
    ],
    galleryItems: [
      { url: 'https://drive.google.com/uc?export=view&id=1JiPtQRcjAo_dE2qCwWXIYxNcN4JZsWst', description: 'Brixton Tower modern architectural design facade' },
      { url: 'https://drive.google.com/uc?export=view&id=1ujQni-geBChEaEDQgnHSjQdo0BPR9Eht', description: 'Striking close-up view of Brixton Tower B Facade' },
      { url: 'https://drive.google.com/uc?export=view&id=1QAaulQ_J8JBe2VftRRlXJTXjnvtepAMF', description: 'Causewayz Square premium central master plan development' },
      { url: 'https://drive.google.com/uc?export=view&id=1iHHQSzUBYRO4-yHbYhrH0s9VQ1nMQvB3', description: 'Breathtaking infinity wavescape pool deck' }
    ],
    layouts: [
      {
        id: 'causewayz-brixton-1bed',
        name: 'Type 1-Bed (Tower Brixton - Type C)',
        size: '474 sqft',
        rooms: '1 Bedroom, 1 Bathroom',
        description: 'Spacious and cozy 1-bedroom suite, perfectly sized for young executives and cross-border singles.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1Dv_POkSqHgljTlaPcS5mtvg6qwJdRqno',
        price: 'From RM 450,000'
      },
      {
        id: 'causewayz-brixton-2bed',
        name: 'Type 2-Bed (Tower Brixton - Type D1)',
        size: '667 sqft',
        rooms: '2 Bedrooms, 2 Bathrooms',
        description: 'Elite layout featuring beautifully separated double bedrooms, ideal for co-sharing colleagues or young families.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1cfQ7Zgo7mW42vaQPw-NIoWgG-cab6vWm',
        price: 'From RM 600,000'
      },
      {
        id: 'causewayz-brixton-3bed',
        name: 'Type 3-Bed / Dual-Key (Tower Brixton - Type E)',
        size: '850 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms (Or Dual-Key)',
        description: 'Generously proportioned family dimensions featuring flexible layout orientations to support own-stay or dual rental strategies.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1_vZ4e947X3lCz6FE0P0sbfdZcwKOuaSs',
        price: 'From RM 850,000'
      }
    ]
  },
  {
    id: '7-dover',
    slug: 'causewayz-dover',
    name: 'Dover Tower @ Causewayz Square',
    developer: 'EXSIM Group',
    location: 'Johor Bahru City Centre (JBCC), Johor',
    state: 'Johor',
    area: 'Johor Bahru',
    minPrice: 500000,
    priceRange: 'From RM 500,000+',
    thumbnail: 'https://drive.google.com/uc?export=view&id=1XJjLSM_C7uj2o2eZPZfaqdvSaxpR-31d',
    mapImageUrl: 'https://drive.google.com/uc?export=view&id=1lDtSwQcWgv-pBsCh59lIFsGFGGCSDYhA',
    status: 'Selling Fast',
    tenure: 'Freehold',
    propertyType: 'Service Apartment Residential',
    tagline: 'Home-Oriented Living & Comfort Designed for Growing Families',
    completionDate: 'Approx. 60 Months from APDL',
    completionYear: 2031,
    totalUnits: 1527,
    sizeSqft: '474 - 850 sqft',
    rooms: '1, 2, 3 Bedrooms & Dual Key',
    landSize: 'Part of Causewayz Square ~7.7 ac masterplan',
    towerCount: 'Dover Tower D1 & D2 (D1: 810 units, D2: 717 units)',
    floorCount: '60 storeys',
    maintenanceFee: 'Approx. RM0.45 psf',
    commercialTitle: true,
    overview: 'Dover Tower represents the later-stage family-oriented residential cluster within the premier Causewayz Square development. Sharing the exact high-specification spacious floor layouts as Brixton (474 sqft, 667 sqft, and 850 sqft variants), Dover is distinguished by its highly stable, multigenerational residential atmosphere. Homeowners enjoy 1,527 premium housing units layout across Towers D1 (810 units) and D2 (717 units) spanning 60 storeys. Strictly closed to short-stay Airbnb rentals, it is the peak sanctuary choice for growing families.',
    keyFeatures: [
      'Strictly family-focused, home-oriented positioning with no short-term Airbnb rentals permitted',
      'Dual tower blueprint (D1 housing 810 units & D2 housing 717 units) yielding 1,527 high-end homes',
      'Excellent multigenerational environment located in the more peaceful, latest release phase',
      'Unobstructed panoramic alignment towards the Johor waterfront, Straits, and local sky decks'
    ],
    locationAdvantage: [
      'Perfect proximity (600m) to cross-border lines (CIQ and RTS) for highly mobile dual-country owners',
      'Direct arterial connection to elite international academies, healthcare complexes, and culinary markets',
      'Private entry drop-offs and lobbies specially designed to preserve serene family privacy'
    ],
    investmentHighlights: [
      'High long-term capital preservation potential driven by premium multigenerational demand',
      'Impeccable structural builds featuring higher ceiling volumes and superior acoustic insulation',
      'Outstanding legacy asset holding backed by EXSIM\'s impeccable premium standards'
    ],
    nearbyAmenities: [
      { name: 'Singapore Causeway CIQ Complex', distance: '600m (5 Mins)' },
      { name: 'Bukit Chagar RTS Link Station', distance: '600m (5 Mins Walk)' },
      { name: 'Komtar JBCC & City Square Mall', distance: '400m (3 Mins)' },
      { name: 'Gleneagles Hospital Medini', distance: '15 Mins Drive' }
    ],
    gallery: [
      'https://drive.google.com/uc?export=view&id=1XJjLSM_C7uj2o2eZPZfaqdvSaxpR-31d',
      'https://drive.google.com/uc?export=view&id=1QAaulQ_J8JBe2VftRRlXJTXjnvtepAMF',
      'https://drive.google.com/uc?export=view&id=1ujQni-geBChEaEDQgnHSjQdo0BPR9Eht',
      'https://drive.google.com/uc?export=view&id=1WTkkx0S5CrkwEEdEwr-J5yxm4wZj2gla'
    ],
    galleryItems: [
      { url: 'https://drive.google.com/uc?export=view&id=1XJjLSM_C7uj2o2eZPZfaqdvSaxpR-31d', description: 'Dover Tower magnificent family residence facade' },
      { url: 'https://drive.google.com/uc?export=view&id=1QAaulQ_J8JBe2VftRRlXJTXjnvtepAMF', description: 'Causewayz Square premium central master plan development' },
      { url: 'https://drive.google.com/uc?export=view&id=1ujQni-geBChEaEDQgnHSjQdo0BPR9Eht', description: 'Beautifully-aligned view of Causewayz Towers' },
      { url: 'https://drive.google.com/uc?export=view&id=1WTkkx0S5CrkwEEdEwr-J5yxm4wZj2gla', description: 'Elite panoramic Sky BBQ Deck lounge' }
    ],
    layouts: [
      {
        id: 'causewayz-dover-1bed',
        name: 'Type 1-Bed (Tower Dover - Type C)',
        size: '474 sqft',
        rooms: '1 Bedroom, 1 Bathroom',
        description: 'Cozy and spacious single-bedroom layout offering an efficient setup with premium acoustic soundproofing.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1YrirGroLVcrZuGl1pH18ZY8J4QFZWbNK',
        price: 'From RM 500,000'
      },
      {
        id: 'causewayz-dover-2bed',
        name: 'Type 2-Bed (Tower Dover - Type D1)',
        size: '667 sqft',
        rooms: '2 Bedrooms, 2 Bathrooms',
        description: 'Spacious dual-bedroom layout prioritizing natural light, high ceilings, and beautiful scenic balcony scopes.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1jVl7MjVfT8bBYPTy24njUb-H27LsGDvs',
        price: 'From RM 650,000'
      },
      {
        id: 'causewayz-dover-3bed',
        name: 'Type 3-Bed / Dual-Key (Tower Dover - Type E)',
        size: '850 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms (Or Dual-Key)',
        description: 'Our premier multigenerational layout providing an elite 3-bedroom arrangement or highly functional dual-key versatility.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1eFwPOOwo4qy-xUmStYvsRRmjYCdWdvhn',
        price: 'From RM 900,000'
      }
    ]
  },
  {
    id: '8',
    slug: 'oaka-residence',
    name: 'The Oaka Residences',
    developer: 'Berjaya Group',
    location: 'Bukit Jalil, Kuala Lumpur',
    state: 'WP Kuala Lumpur',
    area: 'Kuala Lumpur',
    minPrice: 840000,
    priceRange: 'From RM 840,000+',
    thumbnail: 'https://drive.google.com/uc?export=view&id=1dWgmVqgZk6bFD9Pn5Ndd6i1-tq2_tdLH',
    status: 'New Launch',
    tenure: 'Freehold',
    propertyType: 'Luxury Serviced Residence',
    tagline: 'Exquisite Golf-front Sanctuaries',
    completionDate: '2028',
    completionYear: 2028,
    totalUnits: 350,
    sizeSqft: '1,023 - 2,131 sqft',
    rooms: '3 - 4+1 Bedrooms',
    landSize: 'Approx. 4.2 acres',
    towerCount: 'Single Tower',
    floorCount: '39 floors',
    maintenanceFee: 'Approx. RM0.40 psf',
    commercialTitle: true,
    overview: 'The Oaka Residences by Berjaya Group is an upscale, low-density modern residential enclave beautifully set beside the premier 18-hole Bukit Jalil Golf & Country Resort in Bukit Jalil. Offering exquisite architectures integrated with lush panoramic fairway views, Oaka Residences presents homeowners with luxurious resort facilities, spacious family arrangements, and ultra-short drives to Pavilion Bukit Jalil.',
    keyFeatures: ['Exclusive low-density composition with majestic golf course frontage', 'Generously proportioned family sizes from 1,023 up to 2,131 sqft', 'High-end multi-tier facial recognition security and smart-home automation', 'Luxurious resort pool, club-level recreational podium, and sky gazebos'],
    locationAdvantage: [
      'Positioned directly adjacent to Bukit Jalil Golf & Country Resort',
      'Under 3 minutes (1.2km) to Pavilion Bukit Jalil Mall lifestyle center',
      'Direct arterial access via Bukit Jalil Highway, KESAS, and MEX expressways'
    ],
    investmentHighlights: [
      'Freehold tenure with high capital retention within Bukit Jalil prime zone',
      'Berjaya Group’s proven track record of upscale resort-level developments',
      'Excellent rentability driven by proximity to IMU University and wellness hubs'
    ],
    nearbyAmenities: [
      { name: 'Pavilion Bukit Jalil', distance: '1.2km (3 Mins Drive)' },
      { name: 'Bukit Jalil Golf & Country Resort', distance: 'Adjacent (0m)' },
      { name: 'International Medical University (IMU)', distance: '2.5km' },
      { name: 'Awan Besar LRT Station', distance: '1.8km' }
    ],
    mapImageUrl: 'https://drive.google.com/uc?export=view&id=1fPqhg62OuXveD22ChP6vzMfmNWDwThPz',
    gallery: [
      'https://drive.google.com/uc?export=view&id=1dWgmVqgZk6bFD9Pn5Ndd6i1-tq2_tdLH',
      'https://drive.google.com/uc?export=view&id=1E2HNMVOOMFIwIjvZk5Q2ioDP8UOO1xFl',
      'https://drive.google.com/uc?export=view&id=1c3VixuXCgTMugP364lsGKZP-QmDw_mDd',
      'https://drive.google.com/uc?export=view&id=15YLvoM4TD60wqyhjSuTq-f7ji9MY3IVv',
      'https://drive.google.com/uc?export=view&id=1_ChxfigQJbBo3d2W46fMTEcALwmsuMZT',
      'https://drive.google.com/uc?export=view&id=1BIkgbA_kowJxp9hnyukUbM7gTwtjo_GH',
      'https://drive.google.com/uc?export=view&id=10lrMEZrEwTzLuHT-v8RwBLXbb1mJ3iWY',
      'https://drive.google.com/uc?export=view&id=1ZycheMfeUQi2vb5-vSOLgY4ao1Zz6lvt',
      'https://drive.google.com/uc?export=view&id=19ki285dFER2CdpI9JCu8XieEAlo4nLb6',
      'https://drive.google.com/uc?export=view&id=19o-Fe527w3U8MxGKUkOguIZ5nByldtdf'
    ],
    galleryItems: [
      { url: 'https://drive.google.com/uc?export=view&id=1dWgmVqgZk6bFD9Pn5Ndd6i1-tq2_tdLH', description: 'Stately Modern High-Rise Facade' },
      { url: 'https://drive.google.com/uc?export=view&id=1E2HNMVOOMFIwIjvZk5Q2ioDP8UOO1xFl', description: 'Scenic Aerial Isometric View of Oaka Residence' },
      { url: 'https://drive.google.com/uc?export=view&id=1c3VixuXCgTMugP364lsGKZP-QmDw_mDd', description: 'Exquisite Outdoor Facilities Deck & Zoning Plan' },
      { url: 'https://drive.google.com/uc?export=view&id=15YLvoM4TD60wqyhjSuTq-f7ji9MY3IVv', description: 'Spectacular Unblocked Overlooking Wide Golf Course View' },
      { url: 'https://drive.google.com/uc?export=view&id=1_ChxfigQJbBo3d2W46fMTEcALwmsuMZT', description: 'Magnificent Grand Entrance Reception Drop-off' },
      { url: 'https://drive.google.com/uc?export=view&id=1BIkgbA_kowJxp9hnyukUbM7gTwtjo_GH', description: 'Soothing Green Hammock Relaxation Lawn Garden' },
      { url: 'https://drive.google.com/uc?export=view&id=10lrMEZrEwTzLuHT-v8RwBLXbb1mJ3iWY', description: 'Pristine High-Rise Horizon Sky Infinity Pool' },
      { url: 'https://drive.google.com/uc?export=view&id=1ZycheMfeUQi2vb5-vSOLgY4ao1Zz6lvt', description: 'Chic Shaded Outdoor Social Lanai Lounge' },
      { url: 'https://drive.google.com/uc?export=view&id=19ki285dFER2CdpI9JCu8XieEAlo4nLb6', description: 'Leisure Poolside Shaded Pavilion Seating Area' },
      { url: 'https://drive.google.com/uc?export=view&id=19o-Fe527w3U8MxGKUkOguIZ5nByldtdf', description: 'Romantic Sky Viewing Gazebo and Terrace' }
    ],
    layouts: [
      {
        id: 'oaka-a',
        name: 'Type A',
        size: '850 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms',
        description: 'Perfect for young families or professionals. Maximized living spaces, spacious bedrooms & designer bath fittings.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=16atrFqdpi6PamaX6mFEBMICe5_SZXRCB',
        price: 'From RM 650,000'
      },
      {
        id: 'oaka-b1',
        name: 'Type B1',
        size: '1,001 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms',
        description: 'Vibrant format featuring functional yard space, custom balcony orientations and a highly versatile open kitchen path.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1v0ovKfYP2bUtV7IXPSLVRq2qvW_NDBUd',
        price: 'From RM 760,000'
      },
      {
        id: 'oaka-b3',
        name: 'Type B3',
        size: '1,055 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms',
        description: 'Expanded open suite layout with additional lanai style balcony and premium corner unit privacy.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=152kHQVHQ-VWATAfCkKkN76p2U9XAdpq_',
        price: 'From RM 800,000'
      },
      {
        id: 'oaka-c',
        name: 'Type C',
        size: '1,377 sqft',
        rooms: '4 Bedrooms, 3 Bathrooms',
        description: 'Premium massive bungalow-in-the-sky layout with generous double living space, separate powder and laundry facilities.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1H2LyD0r-FiIAcFt66LiVGcVGpXmetgKh',
        price: 'From RM 990,000'
      }
    ]
  },
  {
    id: '9',
    slug: 'ren-residence',
    name: 'Ren Residence',
    developer: 'Juta Asia Corporation Sdn Bhd',
    location: 'Bukit Jalil, Kuala Lumpur',
    state: 'WP Kuala Lumpur',
    area: 'Bukit Jalil',
    minPrice: 500000,
    priceRange: 'From RM 500,000+',
    thumbnail: 'https://drive.google.com/uc?export=view&id=1fSumf0GCSl1O5q-Hr4ir-5kNZkRS9LIf',
    mapImageUrl: 'https://drive.google.com/uc?export=view&id=1gcJZqOzRBp0O2fNIY2Q1kHI4W4Zbn3JO',
    salesKitUrl: 'https://drive.google.com/drive/folders/1g4fbhRFDIlzHELmy_ai_1gK7ru3dixO6?usp=drive_link',
    brochureUrl: 'https://drive.google.com/file/d/1w9yMjFE_TPAtoCf81uswcupfsuTtFt8R/view?usp=sharing',
    summaryUrl: 'https://drive.google.com/file/d/17AjeelCDeJJGRJlUjzoq_jO5wWaI5l6K/view?usp=sharing',
    virtualTourUrl: 'https://drive.google.com/file/d/192CnoJZS6sgO-gAWFVWYABGNTp0UCOKR/view?usp=sharing',
    status: 'Selling Fast',
    tenure: 'Freehold',
    propertyType: 'Condo',
    tagline: 'Where Convenience Meets Comfort',
    completionDate: 'Q4 2026',
    completionYear: 2026,
    totalUnits: 350,
    sizeSqft: '920 - 1,680 sqft',
    rooms: '3 - 4+1 Bedrooms',
    landSize: 'Approx. 2.3 acres',
    towerCount: 'Single Tower',
    floorCount: '34 floors',
    maintenanceFee: 'Approx. RM0.35 psf',
    commercialTitle: false,
    overview: 'Ren Residence is a premium, fully residential-titled sanctuary nested in Bukit Jalil, meticulously crafted by Juta Asia Corporation. Seamlessly blending absolute convenience with luxurious, family-centered space, it is located just a 3-minute drive to the blockbuster Pavilion Bukit Jalil and a short, walkable path to the Alam Sutera LRT station.',
    keyFeatures: [
      'Fully residential title for lower utility rates and extra peace of mind',
      'Walkable distance to Alam Sutera LRT station for seamless city commuting',
      'Extremely close (3-minute drive) to Pavilion Bukit Jalil shopping metropolis',
      'Complimentary minimum 2 to 3 side-by-side carpark slots per unit'
    ],
    locationAdvantage: [
      'Prime golden triangle position within mature, rapidly developing Bukit Jalil city',
      'Virtually walking distance to Alam Sutera LRT station and transit nodes',
      'Perfect access to major expressways (KESAS, MEX, LDP, and Bukit Jalil Highway)'
    ],
    investmentHighlights: [
      'High growth node driven by continuous corporate and retail expansions of Pavilion BJ',
      'Strong dual-use rental potential catering to professionals, students, and family renters',
      'Strategic early entry price starting from dynamic low RM500k range'
    ],
    nearbyAmenities: [
      { name: 'Pavilion Bukit Jalil', distance: '1.2km' },
      { name: 'Alam Sutera LRT Station', distance: '500m' },
      { name: 'Tzu Chi International School', distance: '1.5km' },
      { name: 'Bukit Jalil Golf & Country Resort', distance: '2.0km' }
    ],
    gallery: [
      'https://drive.google.com/uc?export=view&id=1fSumf0GCSl1O5q-Hr4ir-5kNZkRS9LIf',
      'https://drive.google.com/uc?export=view&id=1jqqa1XW2TzmJ7SkDLu0hk9pztsHEI8_Z',
      'https://drive.google.com/uc?export=view&id=1Huee00SGcdQanRYYcem2G24pLfWzoeqw',
      'https://drive.google.com/uc?export=view&id=1Npm2gQihBNXyU4gBKk-2IYEbdcJZclpS',
      'https://drive.google.com/uc?export=view&id=1gbgnUtiqGKmAundceegMNWhmgpvBgnf3',
      'https://drive.google.com/uc?export=view&id=1EWDXRBvIkXTAGeNbAZY1uDy5BnvaaXbY',
      'https://drive.google.com/uc?export=view&id=1pl5dxR-gz99U8HqUOGpfVR8_Rmp8cds_'
    ],
    galleryItems: [
      { url: 'https://drive.google.com/uc?export=view&id=1fSumf0GCSl1O5q-Hr4ir-5kNZkRS9LIf', description: 'Ren Residence Luxury Facade Rendering' },
      { url: 'https://drive.google.com/uc?export=view&id=1jqqa1XW2TzmJ7SkDLu0hk9pztsHEI8_Z', description: 'Swimming Pool' },
      { url: 'https://drive.google.com/uc?export=view&id=1Huee00SGcdQanRYYcem2G24pLfWzoeqw', description: 'Ground Floor Lobby' },
      { url: 'https://drive.google.com/uc?export=view&id=1Npm2gQihBNXyU4gBKk-2IYEbdcJZclpS', description: 'Landscape Garden View' },
      { url: 'https://drive.google.com/uc?export=view&id=1gbgnUtiqGKmAundceegMNWhmgpvBgnf3', description: 'Gym Room View 1' },
      { url: 'https://drive.google.com/uc?export=view&id=1EWDXRBvIkXTAGeNbAZY1uDy5BnvaaXbY', description: 'Coworking Room View 1' },
      { url: 'https://drive.google.com/uc?export=view&id=1pl5dxR-gz99U8HqUOGpfVR8_Rmp8cds_', description: 'Family Room' }
    ],
    layouts: [
      {
        id: 'ren-type-a',
        name: 'Type A',
        size: '920 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms',
        description: 'Thoughtfully structured space with generous family dining hall, a separate dry-wet kitchen structure, and 2 designated side-by-side carparks.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1kdW1WY630IJw86jE8ZgHkdGy9Jjyf8gv',
        price: 'From RM 500,000'
      },
      {
        id: 'ren-type-b1',
        name: 'Type B1',
        size: '1,050 sqft',
        rooms: '3+1 Bedrooms, 2 Bathrooms',
        description: 'Slightly larger layout featuring a dedicated utility yard/foyer room and wide open balcony options for views towards Bukit Jalil.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1VltICmwQ5dnaf41m4jUmvYFptJU1q4NL',
        price: 'From RM 580,000'
      },
      {
        id: 'ren-type-b2',
        name: 'Type B2',
        size: '1,110 sqft',
        rooms: '3+1 Bedrooms, 2 Bathrooms',
        description: 'Corner layout with a gorgeous panoramic view scope, cross-ventilated laundry room, and extra bright dining space.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1nXVSLL-aYduYekxDdVrU2MSGqtBxsI2O',
        price: 'From RM 610,000'
      },
      {
        id: 'ren-type-b3',
        name: 'Type B3',
        size: '1,120 sqft',
        rooms: '3+1 Bedrooms, 2 Bathrooms',
        description: 'Corner unit presenting an extended balcony and a private vestibule entry for added premium living exclusivity.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1wIfGgOsyhphAne2BqxIR6_mBwlyZlQRu',
        price: 'From RM 620,000'
      },
      {
        id: 'ren-type-c',
        name: 'Type C',
        size: '1,270 sqft',
        rooms: '4+1 Bedrooms, 3 Bathrooms',
        description: 'Large family layout offering spacious bedrooms, dry kitchen island setups, and 3 complimentary side-by-side carpark slots.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1JY0C0IpfXW7dz8WvfSd2k_dBwK_Lc-dX',
        price: 'From RM 700,000'
      },
      {
        id: 'ren-type-d',
        name: 'Type D',
        size: '1,680 sqft',
        rooms: '4+1 Bedrooms, 3 Bathrooms',
        description: 'Extravagant signature layout built for multi-generational living, with huge living zones, multi-aspect lighting, and 3 carparks.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1ByfTCeH35zDIqdZqjTxE9NgYGqo44cPe',
        price: 'From RM 920,000'
      }
    ]
  },
  {
    id: '10',
    slug: 'ayanna-resort-residences',
    name: 'Ayanna Resort Residences',
    developer: 'Chin Hin Group',
    location: 'Bukit Jalil, Kuala Lumpur',
    state: 'WP Kuala Lumpur',
    area: 'Bukit Jalil',
    minPrice: 680000,
    priceRange: 'From RM 680,000+',
    thumbnail: 'https://drive.google.com/uc?export=view&id=1EdnmVYVGe4UQ_mAWSYppkiLkQClwbmT1',
    status: 'New Launch',
    tenure: 'Freehold',
    propertyType: 'Serviced Residence',
    tagline: 'Paradise in the City',
    completionDate: '2028',
    completionYear: 2028,
    totalUnits: 580,
    sizeSqft: '1,155 - 2,316 sqft',
    rooms: '3 - 5 Bedrooms',
    landSize: 'Approx. 3.5 acres',
    towerCount: '2 towers',
    floorCount: '40 floors',
    maintenanceFee: 'Approx. RM0.35 psf',
    commercialTitle: false,
    overview: 'Ayanna Resort Residences represents Bukit Jalil\'s premier luxury resort residential sanctuary. Conceived as a peaceful, nature-immersive haven, it brings lush, multi-tiered botanical parks, glass-fronted sky gyms, co-working facilities, and exceptionally spacious family-centric layouts to WP Kuala Lumpur\'s most sought-after address.',
    keyFeatures: ['Freehold tenure in highly sought-after Bukit Jalil precinct', 'Multi-tier resort lifestyle facilities and enchanted botanical paths', 'Generously sized bungalow-in-the-sky and dual-key design configurations', 'Elegantly furnished with premium bathroom and smart living selections'],
    locationAdvantage: [
      'Strategically set within the highly affluent, rapidly growing Bukit Jalil precinct',
      'Only 2.5km (5 Mins drive) to the massive Pavillion Bukit Jalil shopping metropolis',
      'Flawless connectivity to major highways including KESAS, MEX, and LDP routes'
    ],
    investmentHighlights: [
      'Strong long-term freehold capital resilience with excellent value preservation',
      'Exceptional high rental demand from young families, medical staff, and tech professionals',
      'A true resort-living configuration that commands premium leasing yields'
    ],
    nearbyAmenities: [
      { name: 'Pavilion Bukit Jalil', distance: '2.5km' },
      { name: 'International Medical University (IMU)', distance: '3.0km' },
      { name: 'Bukit Jalil LRT Station', distance: '2.8km' },
      { name: 'SJK(C) Lai Meng', distance: '1.5km' }
    ],
    mapImageUrl: 'https://drive.google.com/uc?export=view&id=1c3nsY5obvUorNbTUHbeCtd02K9rPPhsj',
    gallery: [
      'https://drive.google.com/uc?export=view&id=1EdnmVYVGe4UQ_mAWSYppkiLkQClwbmT1',
      'https://drive.google.com/uc?export=view&id=1kzn2N4wrno6EbaWg62MiytX1TcOOxZcH',
      'https://drive.google.com/uc?export=view&id=1InYZGv1Sc3d-LD5QxBfrdSau7C2t-ffg',
      'https://drive.google.com/uc?export=view&id=1EYZaHK19uhuohAhBwaKAvkSTm8RT7mti',
      'https://drive.google.com/uc?export=view&id=1n1joGQYC4gnR2SKl12eXpW9419KhmnKe',
      'https://drive.google.com/uc?export=view&id=1oy-VcBu9ThIRRkmplRxc83PYQDUJvksz',
      'https://drive.google.com/uc?export=view&id=1u01gUDzb5b2wJVQZKufBBCHCDCmxaSFf',
      'https://drive.google.com/uc?export=view&id=1VYiP6sEVoh6VixDNhSZ4lkeRuZO88b3T',
      'https://drive.google.com/uc?export=view&id=1qwfvpzCzsqhi1ecJMLd_eDSZRRsT-Bmx',
      'https://drive.google.com/uc?export=view&id=12HRNX__s4tPizpK6-MvaaBvKiCBeJi4w'
    ],
    galleryItems: [
      { url: 'https://drive.google.com/uc?export=view&id=1EdnmVYVGe4UQ_mAWSYppkiLkQClwbmT1', description: 'Aerial Isometric View of Ayanna Resort Residences' },
      { url: 'https://drive.google.com/uc?export=view&id=1kzn2N4wrno6EbaWg62MiytX1TcOOxZcH', description: 'Expansive Balcony with Unparalleled Views' },
      { url: 'https://drive.google.com/uc?export=view&id=1InYZGv1Sc3d-LD5QxBfrdSau7C2t-ffg', description: 'Exquisite Outdoor Facilities Floor Plan' },
      { url: 'https://drive.google.com/uc?export=view&id=1EYZaHK19uhuohAhBwaKAvkSTm8RT7mti', description: 'Spacious Multi-Generational Family Lounge' },
      { url: 'https://drive.google.com/uc?export=view&id=1n1joGQYC4gnR2SKl12eXpW9419KhmnKe', description: 'Fully Equipped Glass-Walled Sky Gym' },
      { url: 'https://drive.google.com/uc?export=view&id=1oy-VcBu9ThIRRkmplRxc83PYQDUJvksz', description: 'Luminous and Elegant Living Room Orientation' },
      { url: 'https://drive.google.com/uc?export=view&id=1u01gUDzb5b2wJVQZKufBBCHCDCmxaSFf', description: 'Magnificent Grand Reception Lobby Entrance' },
      { url: 'https://drive.google.com/uc?export=view&id=1VYiP6sEVoh6VixDNhSZ4lkeRuZO88b3T', description: 'Enchanted Multi-Tier Botanical Park Trail' },
      { url: 'https://drive.google.com/uc?export=view&id=1qwfvpzCzsqhi1ecJMLd_eDSZRRsT-Bmx', description: 'Vibrant Resort Infinity Pool Zone' },
      { url: 'https://drive.google.com/uc?export=view&id=12HRNX__s4tPizpK6-MvaaBvKiCBeJi4w', description: 'Dedicated Co-Working Workspace and Study Zone' }
    ],
    layouts: [
      {
        id: 'ayanna-e1',
        name: 'Type E1',
        size: '1,155 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms',
        description: 'Charming open flow layout offering high-contrast spatial design, dedicated utility yard & bright, naturally lit rooms.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1p-5Wci2kHHeseDIzElbXYfC1iOtQaQm0',
        price: 'From RM 680,000'
      },
      {
        id: 'ayanna-e2',
        name: 'Type E2',
        size: '1,178 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms',
        description: 'Slightly expanded format of our premier 3-bedroom, introducing wide living hall access and large utility foyer room.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1duOwOm_ri8ebl1IB-pegQGzwMCir_z1d',
        price: 'From RM 700,000'
      },
      {
        id: 'ayanna-a3',
        name: 'Type A3',
        size: '1,388 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms',
        description: 'Elite corner format of Type A series, with scenic wrap-around glazing and beautiful unblocked master suite views.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1MHQwmqOSy1gDsGQJ0SuqMu4HfdD30MxA',
        price: 'From RM 820,000'
      },
      {
        id: 'ayanna-b',
        name: 'Type B',
        size: '1,678 sqft',
        rooms: '4 Bedrooms, 2 Bathrooms',
        description: 'Stunning larger family layout with an additional versatile study/bedroom, deep terrace balcony & luxury dry-wet kitchen spaces.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1xvQrwcHkMQev0t8T5I6Tn3RMO9a7n9vq',
        price: 'From RM 1,020,000'
      },
      {
        id: 'ayanna-c',
        name: 'Type C',
        size: '1,859 sqft',
        rooms: '4 Bedrooms, 3 Bathrooms',
        description: 'Expansive premium high-floor semi-detached plan, emphasizing separate private foyer, grand master suite & dual balconies.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1ADtXfpUokwDiH0_D2XLxJ4-imB4C5CCn',
        price: 'From RM 1,180,000'
      },
      {
        id: 'ayanna-d',
        name: 'Type D (Dual-Key)',
        size: '2,316 sqft',
        rooms: '4 Bedrooms, 3 Bathrooms (Dual-Key)',
        description: 'Ultra-luxurious Dual-Key variant featuring a completely independent, attached self-fittings studio suite for parents or yield.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1bjL6XJ9OILJJaAwX_3KaBMMHLQN2ofrz',
        price: 'From RM 1,550,000'
      }
    ]
  },
  {
    id: '11',
    slug: 'aras-residence',
    name: 'Aras Residence',
    developer: 'WCT Land',
    location: 'WCity OUG, Taman OUG, Kuala Lumpur',
    state: 'WP Kuala Lumpur',
    area: 'OUG',
    minPrice: 554000,
    priceRange: 'From RM 554,000+',
    thumbnail: 'https://drive.google.com/uc?export=view&id=11v4hMuriTu5hk0IML0z6FH2BUaueE9UY',
    status: 'New Launch',
    tenure: 'Freehold',
    propertyType: 'Serviced Residence',
    tagline: 'Zen-Inspired Oasis in WCity OUG',
    completionDate: '2029',
    completionYear: 2029,
    totalUnits: 1272,
    sizeSqft: '850 - 1,062 sqft',
    rooms: '2 - 3 Bedrooms',
    landSize: 'Approx. 3.35 acres',
    towerCount: 'TBA',
    floorCount: 'TBA',
    maintenanceFee: 'Approx. RM0.35 psf',
    commercialTitle: true,
    overview: 'Aras Residence is the latest freehold residential phase within the 63-acre W City OUG integrated master plan. Designed for families and modern professionals, it offers a serene, zen-inspired sanctuary with low-density layout (only 14 units per floor), multi-tier security, and partially furnished premium design.',
    keyFeatures: ['Freehold tenure in mature OUG neighborhood', 'Low density with only 14 units per floor', 'Seamless multi-tier security systems', 'Partially furnished with modern premium fittings'],
    locationAdvantage: [
      'Strategically positioned within the 63-acre WCity OUG integrated development',
      'Near Awan Besar and Muhibbah LRT Stations with robust connectivity',
      'Only 1.6km drive to Pavilion Bukit Jalil mega shopping mall',
      'Easy access to KESAS, MEX, and Old Klang Road expressways'
    ],
    investmentHighlights: [
      'Strong appreciation potential as part of the massive WCity OUG township development',
      'Reputable developer (WCT Land) with a stellar track record of quality delivery',
      'Freehold ownership holds value better in prime Kuala Lumpur boundaries'
    ],
    nearbyAmenities: [
      { name: 'Pavilion Bukit Jalil', distance: '1.6km (5 Mins Drive)' },
      { name: 'Muhibbah LRT Station', distance: '1.2km' },
      { name: 'SJK(C) Lai Meng', distance: '2.0km' },
      { name: 'International Medical University (IMU)', distance: '3.5km' },
      { name: 'Awan Besar LRT Station', distance: '1.8km' }
    ],
    mapImageUrl: 'https://drive.google.com/uc?export=view&id=12nUG60uiwqbsBYqSvFCmvDzEgRHG1de-',
    gallery: [
      'https://drive.google.com/uc?export=view&id=11v4hMuriTu5hk0IML0z6FH2BUaueE9UY',
      'https://drive.google.com/uc?export=view&id=1zhBUejv3Qlg9Ork4fTC2TvPK6q477tiw',
      'https://drive.google.com/uc?export=view&id=1Q0Lqq8sDOIx_6AYoQp-8_NWk1VxmQdQN',
      'https://drive.google.com/uc?export=view&id=1xfJZi5lcNu_wUtW1PI2SHW0Y03qyq0nk',
      'https://drive.google.com/uc?export=view&id=1lLNl9SXC5mKY3DO5_VLgJauvihvBkpR3',
      'https://drive.google.com/uc?export=view&id=1FsF7UD_J9iGSZLRMSRP5J-S0QPU6Dzmu',
      'https://drive.google.com/uc?export=view&id=1t3FujDyh9VJfhEUwx8gQQVYql1ombInx'
    ],
    galleryItems: [
      { url: 'https://drive.google.com/uc?export=view&id=11v4hMuriTu5hk0IML0z6FH2BUaueE9UY', description: 'Modern Zen-Inspired Architectural Facade' },
      { url: 'https://drive.google.com/uc?export=view&id=1zhBUejv3Qlg9Ork4fTC2TvPK6q477tiw', description: 'Premium Resort Style Facilities' },
      { url: 'https://drive.google.com/uc?export=view&id=1Q0Lqq8sDOIx_6AYoQp-8_NWk1VxmQdQN', description: 'Lush Serene Landscape Garden' },
      { url: 'https://drive.google.com/uc?export=view&id=1xfJZi5lcNu_wUtW1PI2SHW0Y03qyq0nk', description: 'Gourmet Kitchen Concept' },
      { url: 'https://drive.google.com/uc?export=view&id=1lLNl9SXC5mKY3DO5_VLgJauvihvBkpR3', description: 'Zen-themed Onsen Hot Spring Pool Zone' },
      { url: 'https://drive.google.com/uc?export=view&id=1FsF7UD_J9iGSZLRMSRP5J-S0QPU6Dzmu', description: 'Sky Rooftop Area and Observatory Deck' },
      { url: 'https://drive.google.com/uc?export=view&id=1t3FujDyh9VJfhEUwx8gQQVYql1ombInx', description: 'WCity Master Plan Layout Layout' }
    ],
    layouts: [
      {
        id: 'aras-a',
        name: 'Type A',
        size: '850 sqft',
        rooms: '2 Bedrooms',
        description: 'Meticulously crafted layout with 2 bedrooms, maximizing natural light and offering elegant, spacious living.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1dy9H_U4ZGcBtPyDcX3ro4E3aPztJaZ60',
        price: 'From RM 554,000'
      },
      {
        id: 'aras-b',
        name: 'Type B',
        size: '1,062 sqft',
        rooms: '3 Bedrooms',
        description: 'Spacious larger format with 3 bedrooms and 2 bathrooms, featuring high-quality fittings and a dedicated yard area.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1jOpTxm_0LywGO2zOXWcpdC1L3Q4y-A5z',
        price: 'From RM 690,000'
      }
    ]
  },
  {
    id: '12',
    slug: 'the-maple-residence',
    name: 'The Maple Residence',
    developer: 'WCT Land',
    location: 'OUG, Kuala Lumpur',
    state: 'WP Kuala Lumpur',
    area: 'Kuala Lumpur',
    minPrice: 580000,
    priceRange: 'From RM 580,000+',
    thumbnail: 'https://drive.google.com/uc?export=view&id=10Y9l_ZCmg7ZzmmVQVzLs0ueMEtli-B3a',
    status: 'Completed',
    tenure: 'Freehold',
    propertyType: 'Condominium',
    tagline: 'Premium Freehold Living in W City OUG',
    completionDate: '2025',
    completionYear: 2025,
    totalUnits: 940,
    sizeSqft: '808 - 1,378 sqft',
    rooms: '3 - 4 Bedrooms',
    landSize: 'Approx. 4.9 acres',
    towerCount: '3 Towers (Tower A, B & C)',
    floorCount: 'Up to 32 floors',
    maintenanceFee: 'Approx. RM0.35 psf',
    commercialTitle: false,
    overview: 'The Maple Residence is an exclusive freehold residential development within the 63-acre W City OUG integrated master plan. Designed as a serene sanctuary, it raises the bar for luxurious active-living with exquisite landscaping and curated facilities.',
    keyFeatures: ['Freehold title in Bukit Jalil / OUG vicinity', 'Part of 63-acre W City OUG master plan', 'Outstanding facilities including an Olympic-sized pool and 3-tier garden system', 'Low-density layout with 3 towers across 4.9 acres'],
    locationAdvantage: ['Direct access to KESAS, MEX and Sungai Besi highways', 'Minutes drive to Pavilion Bukit Jalil shopping hub', 'Surrounded by mature education hubs and healthcare centers'],
    investmentHighlights: ['Highly resilient freehold property in a strategic hotbed', 'Integrated township development guarantees long-term appreciation', 'High rental demand from professionals and young families'],
    nearbyAmenities: [
      { name: 'W City Retail Walk', distance: '100m' },
      { name: 'LRT Sri Petaling Station', distance: '1.2km' },
      { name: 'LRT Awan Besar Station', distance: '1.5km' },
      { name: 'Pavilion Bukit Jalil', distance: '3.0km' },
      { name: 'Tsun Jin High School (OUG)', distance: '1.0km' },
      { name: 'IMU University', distance: '3.5km' }
    ],
    mapImageUrl: 'https://drive.google.com/uc?export=view&id=1Z5Se9nK_52yjy827pC1TDH_ugKzZcTQx',
    gallery: [
      'https://drive.google.com/uc?export=view&id=10Y9l_ZCmg7ZzmmVQVzLs0ueMEtli-B3a',
      'https://drive.google.com/uc?export=view&id=1zXIHtxSCIRzs6I560FxG-b7p6xkAxJbT',
      'https://drive.google.com/uc?export=view&id=1_uGRA4bHvEWL7_5Hc9KnFJsy6cBW5rdV',
      'https://drive.google.com/uc?export=view&id=1c6RooJW3hNpDXokQZlVfO781NRnDui_2',
      'https://drive.google.com/uc?export=view&id=1mmEtQAoVol7FBne0TRx03v4sAkItyP9o',
      'https://drive.google.com/uc?export=view&id=1sHlnlpauxIPAI5_wZ2o4JqR1B5xzeWiM',
      'https://drive.google.com/uc?export=view&id=1hgSnl_mlZ7VJJ702MHca9eSMgC2lhtXH',
      'https://drive.google.com/uc?export=view&id=1jV2HYixPhDBS0TuvVVA_7iAoKdBAqpoe',
      'https://drive.google.com/uc?export=view&id=1m1P8nvIk6B2V5ldXSKAw7xD1XY3-Bz10',
      'https://drive.google.com/uc?export=view&id=1XxJOHIUc2YqOxuw0issdd2jSsk1EYYXk',
      'https://drive.google.com/uc?export=view&id=1iMRfH55hR6GxHyEnvW6wOYydlpcDD0TM',
      'https://drive.google.com/uc?export=view&id=1ODc_GvjnNaM6cAkvx8zLTg3xapA-O9hS',
      'https://drive.google.com/uc?export=view&id=1u65pCxezEUdjb0cHBAFUOILoWovb9Fcv'
    ],
    galleryItems: [
      { url: 'https://drive.google.com/uc?export=view&id=10Y9l_ZCmg7ZzmmVQVzLs0ueMEtli-B3a', description: 'Modern Freehold Tower Facade at W City OUG' },
      { url: 'https://drive.google.com/uc?export=view&id=1zXIHtxSCIRzs6I560FxG-b7p6xkAxJbT', description: 'Stunning 50m Olympic-Sized Infinity Lap Pool' },
      { url: 'https://drive.google.com/uc?export=view&id=1_uGRA4bHvEWL7_5Hc9KnFJsy6cBW5rdV', description: 'Grand Drop Off with Water Feature' },
      { url: 'https://drive.google.com/uc?export=view&id=1c6RooJW3hNpDXokQZlVfO781NRnDui_2', description: 'Exclusive Lobby Lounge Drop Off Area' },
      { url: 'https://drive.google.com/uc?export=view&id=1mmEtQAoVol7FBne0TRx03v4sAkItyP9o', description: 'Premium Tower Block Architectural Presence' },
      { url: 'https://drive.google.com/uc?export=view&id=1sHlnlpauxIPAI5_wZ2o4JqR1B5xzeWiM', description: 'Lush Multi-tier Green Lawn and Forest Garden' },
      { url: 'https://drive.google.com/uc?export=view&id=1hgSnl_mlZ7VJJ702MHca9eSMgC2lhtXH', description: 'Fun Kid\'s Pool and Play Zone' },
      { url: 'https://drive.google.com/uc?export=view&id=1jV2HYixPhDBS0TuvVVA_7iAoKdBAqpoe', description: 'Spacious Living Hall with High Ceilings' },
      { url: 'https://drive.google.com/uc?export=view&id=1m1P8nvIk6B2V5ldXSKAw7xD1XY3-Bz10', description: 'Modern Well-Equipped Modular Kitchen' },
      { url: 'https://drive.google.com/uc?export=view&id=1XxJOHIUc2YqOxuw0issdd2jSsk1EYYXk', description: 'Sunlit Co-Living Master Bedroom Profile' },
      { url: 'https://drive.google.com/uc?export=view&id=1iMRfH55hR6GxHyEnvW6wOYydlpcDD0TM', description: 'Cosy Bedroom finished with solid timber flooring' },
      { url: 'https://drive.google.com/uc?export=view&id=1ODc_GvjnNaM6cAkvx8zLTg3xapA-O9hS', description: 'Soothing Whirlpool and Outdoor Jacuzzi Deck' },
      { url: 'https://drive.google.com/uc?export=view&id=1u65pCxezEUdjb0cHBAFUOILoWovb9Fcv', description: 'Vibrant W City OUG Master Integrated Development' }
    ],
    layouts: [
      {
        id: 'maple-a',
        name: 'Type A',
        size: '808 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms',
        description: 'Cozy and highly efficient layout designed to maximize workspace and living spaces with zero wasted corridors.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1asNWKwkH7x2ofLJeuQpIUyvqxGT_CsWR',
        price: 'From RM 580,000'
      },
      {
        id: 'maple-b',
        name: 'Type B',
        size: '958 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms (Yard & Balcony)',
        description: 'An elegant layout ideal for medium families, featuring high-rise views, custom balcony and functional yard area.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1ixJzNbZpcxUzHv1K6ciDCWhNIxXy_Dq_',
        price: 'From RM 690,000'
      },
      {
        id: 'maple-c',
        name: 'Type C',
        size: '1,163 sqft',
        rooms: '3 Bedrooms, 3 Bathrooms (Spacious Balcony)',
        description: 'Expansive family residence with dual-view master bedroom and three separate bathrooms.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1jlcYel4RJpGg10JmOKesc68D4zUgkssn',
        price: 'From RM 830,000'
      },
      {
        id: 'maple-d',
        name: 'Type D (Dual Key)',
        size: '1,378 sqft',
        rooms: '4 Bedrooms, 3 Bathrooms (Dual-Key)',
        description: 'Large lifestyle layout with full dual-key functionality, featuring an attached studio with private utility/entrance.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1XxXjUUdXtf-Rty2ItHMdKaXdnlo2BnHp',
        price: 'From RM 980,000'
      }
    ]
  },
  {
    id: '13',
    slug: 'm-aspira',
    name: 'M Aspira',
    developer: 'Mah Sing Group',
    location: 'Taman Desa, Kuala Lumpur',
    state: 'WP Kuala Lumpur',
    area: 'Kuala Lumpur',
    minPrice: 390000,
    priceRange: 'From RM 390,000+',
    thumbnail: 'https://drive.google.com/uc?export=view&id=1OD3PJ3yV2IXB9Yqce5ubmZar9VtJdXQZ',
    status: 'New Launch',
    tenure: 'Leasehold',
    propertyType: 'Serviced Residence',
    tagline: 'Seamless Living, Smart Address',
    completionDate: '2030',
    completionYear: 2030,
    totalUnits: 840,
    sizeSqft: '706 - 1,060 sqft',
    rooms: '2 - 4 Bedrooms',
    landSize: 'Approx. 2.1 acres',
    towerCount: '2 Towers',
    floorCount: '42 floors',
    maintenanceFee: 'Approx. RM0.35 psf',
    commercialTitle: true,
    overview: 'M Aspira by Mah Sing is a landmark high-rise serviced residence in prime Taman Desa, Kuala Lumpur. Centered on affordable luxury and high-capacity wellness, it introduces innovative \'Hackable Wall\' layouts allowing custom enlargement of principal living spaces. Accented by a 1.21-acre facilities suite, of course it features GreenRE gold standard certifications, automated waste management, smart delivery lockers, and ready-to-run EV charging stations.',
    keyFeatures: [
      'Extremely affordable entry starting from RM390,000 in central KL boundaries',
      'Innovative \'Hackable Wall\' configurations ensuring customizable interior layouts',
      'Environmentally future-proof with Gold GreenRE certifications and eco designs',
      'Cutting-edge amenities including automated waste corridors and parcel terminals'
    ],
    locationAdvantage: [
      'Superbly nested within mature, highly coveted, prestigious Taman Desa',
      'Direct highway access to KL-Seremban Expressway and Federal Highway',
      'Only 3km (6 mins drive) to Mid Valley Megamall, Bangsar, and KL Eco City'
    ],
    investmentHighlights: [
      'Incomparably competitive entry pricing point within WP Kuala Lumpur bounds',
      'Mah Sing Group\'s stellar market repute for functional, highly successful lifestyle concepts',
      'Outstanding rental demand potential driven by the massive surrounding job markets'
    ],
    nearbyAmenities: [
      { name: 'Mid Valley Megamall', distance: '3.0km (6 Mins Drive)' },
      { name: 'Taman Desa Medical Centre', distance: '1.2km' },
      { name: 'SJK(C) Choong Wen', distance: '2.5km' },
      { name: 'Old Klang Road Commercial Hub', distance: '2.0km' }
    ],
    mapImageUrl: 'https://drive.google.com/uc?export=view&id=1CUoE_UZ3nd0KPhisTgnVQgD7X3vH4LoZ',
    gallery: [
      'https://drive.google.com/uc?export=view&id=1uWBXM3oSSXCk0vA4WcYpfYvPp8q-Pb_f',
      'https://drive.google.com/uc?export=view&id=1OD3PJ3yV2IXB9Yqce5ubmZar9VtJdXQZ',
      'https://drive.google.com/uc?export=view&id=1zUl7JADt4y8vdtsWoukGHINRJ9j8hcSx',
      'https://drive.google.com/uc?export=view&id=1npreUzdEnYyUmVfAIuSr5KI0IwEJcugc',
      'https://drive.google.com/uc?export=view&id=1j6a71CqNS7yr0kImWSpM6WibAVbSWZte',
      'https://drive.google.com/uc?export=view&id=114h8MbEbHeYC-KW4FmIvghVL57QxCBXf',
      'https://drive.google.com/uc?export=view&id=1yYjFnLCtWNdN1RQZC8SGgr9xsacXGdgo',
      'https://drive.google.com/uc?export=view&id=1OGd5uac4roVPUau18IgJRzOJByABBo86',
      'https://drive.google.com/uc?export=view&id=1my4h8DoX3bdWvOzTST1btcjQrXe_z2Qq',
      'https://drive.google.com/uc?export=view&id=1FC30BTFcNm15OmCMfG4RDTxt5PnObbF_'
    ],
    galleryItems: [
      { url: 'https://drive.google.com/uc?export=view&id=1uWBXM3oSSXCk0vA4WcYpfYvPp8q-Pb_f', description: 'Scenic Aerial Isometric View of M Aspira' },
      { url: 'https://drive.google.com/uc?export=view&id=1OD3PJ3yV2IXB9Yqce5ubmZar9VtJdXQZ', description: 'Impressive Modern Living Facade and Architecture' },
      { url: 'https://drive.google.com/uc?export=view&id=1zUl7JADt4y8vdtsWoukGHINRJ9j8hcSx', description: 'Curated Amenities Deck & Facilities Podium' },
      { url: 'https://drive.google.com/uc?export=view&id=1npreUzdEnYyUmVfAIuSr5KI0IwEJcugc', description: 'Active Recreation and Sports Facilities' },
      { url: 'https://drive.google.com/uc?export=view&id=1j6a71CqNS7yr0kImWSpM6WibAVbSWZte', description: 'Master Site and Facilities Floor Plan Layout' },
      { url: 'https://drive.google.com/uc?export=view&id=114h8MbEbHeYC-KW4FmIvghVL57QxCBXf', description: 'Charming Green Glamping Relaxation Zone' },
      { url: 'https://drive.google.com/uc?export=view&id=1yYjFnLCtWNdN1RQZC8SGgr9xsacXGdgo', description: 'Stately Main Entrance Drop-off Area' },
      { url: 'https://drive.google.com/uc?export=view&id=1OGd5uac4roVPUau18IgJRzOJByABBo86', description: 'Highly Secure Entrance Guardhouse' },
      { url: 'https://drive.google.com/uc?export=view&id=1my4h8DoX3bdWvOzTST1btcjQrXe_z2Qq', description: 'Stunning Heated Olympics Lap Pool Area' },
      { url: 'https://drive.google.com/uc?export=view&id=1FC30BTFcNm15OmCMfG4RDTxt5PnObbF_', description: 'Magnificent Urban Skyline Observatory View' }
    ],
    layouts: [
      {
        id: 'aspira-a',
        name: 'Type A',
        size: '706 sqft',
        rooms: '2 Bedrooms, 2 Bathrooms',
        description: 'Charming entry format optimized for space savings. Includes dedicated laundry nook and dual-bathroom layouts.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1HYN3pqVBttIP_BnF8nBYgvX6fSVro9sl',
        price: 'From RM 390,000'
      },
      {
        id: 'aspira-b',
        name: 'Type B',
        size: '855 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms',
        description: 'Features a modular hackable wall dry alignment, customizable living rooms and beautiful balcony placements.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1ssXfoiIXFoItkLbAZzHaWqV0orb1H2yT',
        price: 'From RM 490,000'
      },
      {
        id: 'aspira-c',
        name: 'Type C',
        size: '1,060 sqft',
        rooms: '4 Bedrooms, 2 Bathrooms',
        description: 'Elite family sized layout emphasizing four separate bedrooms, integrated modular kitchen flow and dual scenic views.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1toCZb8xGDPpupXbK9t45TZEMgWoQ4UnF',
        price: 'From RM 590,000'
      }
    ]
  },
  {
    id: '14',
    slug: 'dwi-aurora',
    name: 'Dwi Aurora',
    developer: 'Asian Pac Holdings Berhad',
    location: 'PJ South, Petaling Jaya, Selangor',
    state: 'Selangor',
    area: 'Selangor',
    minPrice: 530000,
    priceRange: 'From RM 530,000+',
    thumbnail: 'https://drive.google.com/uc?export=view&id=1GWwIwn_ZzmTZew8oxN4flwdtp5dVfDZo',
    status: 'New Launch',
    tenure: 'Leasehold',
    propertyType: 'Condominium',
    tagline: 'Inspired Living, All Around',
    completionDate: '2029',
    completionYear: 2029,
    totalUnits: 620,
    sizeSqft: '970 - 1,378 sqft',
    rooms: '3 - 4 Bedrooms',
    landSize: 'Approx. 3.5 acres',
    towerCount: '2 Towers',
    floorCount: '38 floors',
    maintenanceFee: 'Approx. RM0.35 psf',
    commercialTitle: false,
    overview: 'Dwi Aurora is a pure residential condominium set inside the robust, integrated 74-acre master township in PJ South. Accented by high-density GreenRE ecological designs, Dwi Aurora introduces unique Semi-D and Bungalow-in-the-sky layout formats to ensure maximum privacy and cross-ventilation. Residents enjoy an extensive suite of 36 resort-style indoor and outdoor amenities.',
    keyFeatures: [
      'Pure residential title for ultimate peace-of-mind and lower utility rates',
      'Exclusive Semi-D and Bungalow layout concepts ensuring superior privacy',
      'Nestled inside a premier, self-contained 74-acre conceptual master township',
      'Remarkable 36 standard resort facilities including a pet-friendly park'
    ],
    locationAdvantage: [
      'Unsurpassed centrality in the heart of Petaling Jaya South corridor',
      'Outstanding road adjacency to NPE, KESAS, LDP, and Federal Highway',
      'Only 10 minutes to Sunway Pyramid Shopping Mall and Pavilion Bukit Jalil'
    ],
    investmentHighlights: [
      'First residential block launch in a highly massive master township locking initial early-bird indices',
      'Impeccable project aesthetics crafted under Asian Pac\'s signature luxury standards',
      'Exceptional rental demand driven by surrounding PJ white-collar workspaces'
    ],
    nearbyAmenities: [
      { name: 'Sunway Pyramid Shopping Mall', distance: '4.5km (10 Mins Drive)' },
      { name: 'Pavilion Bukit Jalil', distance: '5.0km' },
      { name: 'Sunway Medical Centre', distance: '4.8km' },
      { name: 'Kampung Dato Harun KTM Station', distance: '2.0km' }
    ],
    mapImageUrl: 'https://drive.google.com/uc?export=view&id=1uyLb5bDafyNZev1p96y-Z0CYp5QBctIc',
    gallery: [
      'https://drive.google.com/uc?export=view&id=1mfPH75mUWdP8ZGSm93oTfYYP4R05I8Rh',
      'https://drive.google.com/uc?export=view&id=1ienkT8E-WYlQC_C1jx0KjGLH-rK_E3ai',
      'https://drive.google.com/uc?export=view&id=1iB6DjItHDYLo_rwjwkZXV39QgoFiwI_7',
      'https://drive.google.com/uc?export=view&id=1EDkvFnRQEYMO3tOPxVyNhB2JFXw40pNO',
      'https://drive.google.com/uc?export=view&id=1H5-OCajLqdytnFrabvQUe2FoaOzQKR4l',
      'https://drive.google.com/uc?export=view&id=1GWwIwn_ZzmTZew8oxN4flwdtp5dVfDZo',
      'https://drive.google.com/uc?export=view&id=1DwScpXxOl7biOjTlssnVZ9ahBGfnO-H',
      'https://drive.google.com/uc?export=view&id=1zvAhVpGoXMAFT_ZRtKF8DwWBOBTJsvXg',
      'https://drive.google.com/uc?export=view&id=1EViSxNS7PzWy2hWW7gIsbDER7gz9wXEK',
      'https://drive.google.com/uc?export=view&id=1g2xl1kyoCvUju0PlKpMS8Hdn1DqbSeDo',
      'https://drive.google.com/uc?export=view&id=1zX7ysFYjkaj_UfGlKJLxIgG7G7QbXpxX',
      'https://drive.google.com/uc?export=view&id=1SjgFkrHFIuiGjCdJqEyAOGSuXejaGftJ',
      'https://drive.google.com/uc?export=view&id=1Nbh0HzCBNEd9sYFq1ibbOHyLErK4SaYo',
      'https://drive.google.com/uc?export=view&id=1lT29WF8TcD9XcRoZWCCaHD3C-AJIlWUQ',
      'https://drive.google.com/uc?export=view&id=1j_fLsedsChm8BONvNs2Uaj_fDRBDvmDb',
      'https://drive.google.com/uc?export=view&id=15WZmwmrGR0qE0isj0dUg4QnukoS0v9p9',
      'https://drive.google.com/uc?export=view&id=13NjAhJxBtE2vZGx5RmL6OX5wTfeTuR2-',
      'https://drive.google.com/uc?export=view&id=1I_sARRApAz9TsfEqwgWMAHbJWo_gD9yC'
    ],
    galleryItems: [
      { url: 'https://drive.google.com/uc?export=view&id=1mfPH75mUWdP8ZGSm93oTfYYP4R05I8Rh', description: 'Scenic Aerial View of Dwi Aurora Residences' },
      { url: 'https://drive.google.com/uc?export=view&id=1ienkT8E-WYlQC_C1jx0KjGLH-rK_E3ai', description: 'Beautiful Cinematic Sundown View' },
      { url: 'https://drive.google.com/uc?export=view&id=1iB6DjItHDYLo_rwjwkZXV39QgoFiwI_7', description: 'Interactive Co-Working and Study Arena' },
      { url: 'https://drive.google.com/uc?export=view&id=1EDkvFnRQEYMO3tOPxVyNhB2JFXw40pNO', description: 'Integrated Urban Commercial Retail Hub' },
      { url: 'https://drive.google.com/uc?export=view&id=1H5-OCajLqdytnFrabvQUe2FoaOzQKR4l', description: 'Granite Lobby Grand Entrance Drop-off' },
      { url: 'https://drive.google.com/uc?export=view&id=1GWwIwn_ZzmTZew8oxN4flwdtp5dVfDZo', description: 'Stately High-Rise Tower block Facade' },
      { url: 'https://drive.google.com/uc?export=view&id=1DwScpXxOl7biOjTlsxsnVZ9ahBGfnO-H', description: 'Exquisite Outdoors Multi-Tier Facilities Garden' },
      { url: 'https://drive.google.com/uc?export=view&id=1zvAhVpGoXMAFT_ZRtKF8DwWBOBTJsvXg', description: 'Designer Furnished Family Room Concept' },
      { url: 'https://drive.google.com/uc?export=view&id=1EViSxNS7PzWy2hWW7gIsbDER7gz9wXEK', description: 'Master Site and Facilities Floor Plan' },
      { url: 'https://drive.google.com/uc?export=view&id=1g2xl1kyoCvUju0PlKpMS8Hdn1DqbSeDo', description: 'Glass-Walled Horizon Fitness Gym Centre' },
      { url: 'https://drive.google.com/uc?export=view&id=1zX7ysFYjkaj_UfGlKJLxIgG7G7QbXpxX', description: 'Safe Outdoor Kids Playground Nook' },
      { url: 'https://drive.google.com/uc?export=view&id=1SjgFkrHFIuiGjCdJqEyAOGSuXejaGftJ', description: 'Curated Indoor Kids Playroom Area' },
      { url: 'https://drive.google.com/uc?export=view&id=1Nbh0HzCBNEd9sYFq1ibbOHyLErK4SaYo', description: 'Chic Double-Height Grand Reception Lobby' },
      { url: 'https://drive.google.com/uc?export=view&id=1lT29WF8TcD9XcRoZWCCaHD3C-AJIlWUQ', description: 'Dedicated On-Site Pet Friendly Landscaped Park' },
      { url: 'https://drive.google.com/uc?export=view&id=1j_fLsedsChm8BONvNs2Uaj_fDRBDvmDb', description: 'Invigorating High-Rise Horizon Swimming Pool' },
      { url: 'https://drive.google.com/uc?export=view&id=15WZmwmrGR0qE0isj0dUg4QnukoS0v9p9', description: 'Leisure Teepee Village Relaxation Glamping Ground' },
      { url: 'https://drive.google.com/uc?export=view&id=13NjAhJxBtE2vZGx5RmL6OX5wTfeTuR2-', description: 'Exclusive Low-Density Township Townhouse Enclave' },
      { url: 'https://drive.google.com/uc?export=view&id=1I_sARRApAz9TsfEqwgWMAHbJWo_gD9yC', description: 'Vast Fully Self-Sufficient Integrated Township Concept' }
    ],
    layouts: [
      {
        id: 'aurora-a',
        name: 'Type A',
        size: '970 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms',
        description: 'Cozy, highly efficient format. Large living dining spaces leading onto high-scenic glass balconies.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1ZdXIZUaplJGE8FdqIDFxBmF1b_aCw6y2',
        price: 'From RM 530,000'
      },
      {
        id: 'aurora-b',
        name: 'Type B',
        size: '1,162 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms (Yard & Balcony)',
        description: 'Elegantly proportioned format with corner views, dedicated laundry yard, and wrap-around kitchen flow.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1PQJ2MwhagdU7FWWn62f-m3P-4EP7u_US',
        price: 'From RM 630,000'
      },
      {
        id: 'aurora-b1',
        name: 'Type B1',
        size: '1,162 sqft',
        rooms: '3 Bedrooms, 2 Bathrooms (Spacious Balcony)',
        description: 'Spacious 1,162 sqft format designed specifically to maximize ventilation and wide layout connections.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1_WM6J_rbKYYU2rQLFrUK9Le2lr4Alm0X',
        price: 'From RM 640,000'
      },
      {
        id: 'aurora-c',
        name: 'Type C',
        size: '1,238 sqft',
        rooms: '4 Bedrooms, 3 Bathrooms',
        description: 'Elite family sized plan featuring four bedrooms, premium double height lounge space, and private backyard yard.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1cetlEBxGXAgVdmZR113wIYVCt7xEzZBb',
        price: 'From RM 720,000'
      },
      {
        id: 'aurora-d',
        name: 'Type D (Dual-Key)',
        size: '1,378 sqft',
        rooms: '4 Bedrooms, 3 Bathrooms (Dual-Key)',
        description: 'Premium functional dual-key layout, boasting attached secondary self-contained studio with private entry utility nooks.',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1CpgqsCm-1yXSEsj0BuM2nMBdUuxw6kTL',
        price: 'From RM 810,000'
      }
    ]
  }
];

export const AREAS: Area[] = [
  {
    id: '1',
    slug: 'bukit-jalil-property-investment',
    name: 'Bukit Jalil',
    description: 'Bukit Jalil is one of the fastest-growing residential and commercial hubs in Kuala Lumpur. Known for its world-class sports facilities and the massive Pavilion Bukit Jalil mall, it has become a magnet for property investors.',
    whyInvest: [
      'Massive transformation into a regional shopping and tech hub',
      'Excellent connectivity with 3 LRT stations and major highways',
      'High concentration of universities and international schools',
      'Large green lungs with an 80-acre park'
    ],
    priceTrend: 'Steady capital growth of 4-6% annually over the last 5 years.',
    rentalDemand: 'Strong demand from expatriates, IMU students, and young professionals working in the nearby Technology Park Malaysia (TPM).',
    recommendedProjectIds: ['1', '4', '5', '6', '10']
  },
  {
    id: '4',
    slug: 'bangsar-property-investment',
    name: 'Bangsar',
    description: 'Bangsar is one of Kuala Lumpur\'s most prestigious residential areas, known for its vibrant upscale atmosphere, elite community, and strategic positioning between KL and PJ.',
    whyInvest: [
      'Highly affluent and established neighborhood',
      'Unmatched connectivity with major transit hubs',
      'High rental yield from expatriates and professionals',
      'Limited new supply maintain high value'
    ],
    priceTrend: 'Exceptional capital resilience with strong historical growth.',
    rentalDemand: 'Consistently high demand from the international community and corporate top management.',
    recommendedProjectIds: ['3']
  },
  {
    id: '2',
    slug: 'kl-city-property',
    name: 'Kuala Lumpur',
    description: 'The Golden Triangle and surrounding areas offer the most prestigious addresses in Malaysia, with luxury developments and unmatched convenience.',
    whyInvest: [
      'Global recognition and prestige',
      'High density of multinational corporations',
      'Vibrant nightlife and shopping',
      'Limited land supply in the city centre'
    ],
    priceTrend: 'Premium prices with strong historical resilience.',
    rentalDemand: 'Favored by high-net-worth individuals and corporate expatriates.',
    recommendedProjectIds: ['8', '11', '12', '13']
  },
  {
    id: '5',
    slug: 'central-park-damansara-property',
    name: 'Central Park Damansara',
    description: 'Central Park Damansara is a massive 65-acre integrated township in Damansara Perdana. It combines residential, colonial-inspired retail, and corporate spaces centered around a lush central park.',
    whyInvest: [
      'Master-planned 65-acre integrated development',
      'Strategic location between Damansara Perdana and PJ Trade Centre',
      'Direct connectivity to LDP and DASH Highway',
      'Affordable luxury entry point in a high-demand PJ North corridor'
    ],
    priceTrend: 'Strong entry-level demand with potential for high rental yield from PJ office crowds.',
    rentalDemand: 'High demand from white-collar professionals working in nearby corporate towers.',
    recommendedProjectIds: ['2']
  },
  {
    id: '3',
    slug: 'selangor-property',
    name: 'Selangor',
    description: 'Selangor offers matured townships with excellent amenities, providing a balance of urban convenience and suburban comfort.',
    whyInvest: [
      'Established affluent communities',
      'Excellent infrastructure and highways',
      'Highly family-oriented developments'
    ],
    priceTrend: 'Consistent demand and capital appreciation.',
    rentalDemand: 'High demand from families and working professionals.',
    recommendedProjectIds: ['9', '14']
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'best-property-investment-bukit-jalil-2026',
    title: 'Best Property Investment in Bukit Jalil 2026',
    excerpt: 'Explore why Bukit Jalil remains the top choice for property investors heading into 2026, featuring new launches like Veladaz and Kingswoodz.',
    content: `Bukit Jalil has undergone a massive transformation. With the opening of Pavilion Bukit Jalil, the area has shifted from a sports-centric hub to a premier lifestyle destination. In 2026, we see a trend towards \"Wellness Living\" and \"Smart Home Integration\". EXSIM projects like Veladaz are leading the way by offering facilities that cater to the mental and physical well-being of residents. 

To fully understand why Bukit Jalil commands such high demand in the contemporary Malaysian real estate landscape, one must analyze its infrastructural development over the past two decades. What was once primarily a green space earmarked for sports complexes during the 1998 Commonwealth Games has matured into a sophisticated, self-sustaining master-planned metropolis. The core driver of this modern phase is undoubtedly the multi-phase development of Bukit Jalil City, anchored by the iconic Pavilion Bukit Jalil Shopping Mall. This major commercial magnet has organically shifted the retail gravity of Kuala Lumpur South, attracting hundreds of international brands, corporate offices, and high-income expatriate families to the area, creating an evergreen stream of rental demand for surrounding residences.

In 2026, the property investment market in Bukit Jalil is displaying a profound preference for holistic developments that transcend standard vertical living. Projects like Veladaz are receiving intense market attention with their dual-key layout provisions and customized indoor-outdoor facilities. Modern residents are no longer satisfied with standard concrete boxes; instead, there is a substantial premium placed on spaces that guarantee psychological comfort, clean air filtration, natural daylighting, and direct integration with transit lines.

As a high-density, multi-generational hub, Bukit Jalil enjoys a level of connectivity that few places in Selangor or Kuala Lumpur can duplicate. The neighborhood is serviced by three separate LRT stations—Sri Petaling, Bukit Jalil, and Awan Besar—which connect commuters directly to the central banking and commercial zones of Kuala Lumpur City Centre without the daily stress of gridlocked road traffic. For drivers, the area serves as an intersection for several key expressways, including the Shah Alam Expressway (KESAS), the Maju Expressway (MEX) which provides a direct 20-minute route to Kuala Lumpur International Airport (KLIA), the Bukit Jalil Highway, and the Kuala Lumpur-Seremban Expressway. This massive highway convergence ensures that residents can easily commute to any key employment area within the Klang Valley, making properties here highly appealing to professionals working in neighboring Technology Park Malaysia (TPM), Cyberjaya, and mid-town areas.

Furthermore, educational infrastructure remains a primary pillar of Bukit Jalil's high rental yields. It is the proud home of the International Medical University (IMU) and Asia Pacific University of Technology & Innovation (APU), drawing thousands of international and domestic students who seek secure, semi-furnished local apartments. This steady rotation of student demographics provides individual landlords with high rental returns, particularly when properties are partitioned into dual-key suites or multi-room models. When combined with the high capital appreciation spurred by limited new land parcels, investing in Bukit Jalil in 2026 is mathematically and strategically one of the safest decisions for both seasoned wealth-builders and first-time buyers looking for long-term equity growth.`,
    date: 'April 15, 2026',
    author: 'Shyan Yee',
    category: 'Market Trends'
  },
  {
    id: '2',
    slug: 'exsim-projects-guide-2026',
    title: 'Ultimate Guide to EXSIM Projects in 2026',
    excerpt: 'Why EXSIM is becoming the developer of choice for modern urbanites in Malaysia.',
    content: `EXSIM has built a reputation for high-quality, concept-driven developments. From the industrial-chic aesthetics of their previous projects to the wellness-focused designs of Veladaz and Aldenz @ Central Park Damansara, they consistently deliver value and lifestyle upgrades. 

In the highly competitive arena of Malaysian real estate development, EXSIM has carved out a unique and powerful brand presence that resonates deeply with modern, forward-thinking homebuyers and savvy investors. Historically known for pioneering the sleek \"industrial-loft\" architectural aesthetic in Kuala Lumpur, EXSIM has evolved its developmental philosophy to champion a harmonious synthesis of modern luxury, functional urban design, and extensive ecological sustainability. This comprehensive developer guide breaks down why purchasing an EXSIM residence in 2026 represents a premium lifestyle choice and a highly robust wealth-accumulation decision.

The first major differentiator is EXSIM's uncompromising commitment to concept-driven lifestyle experiences. Unlike traditional developers who replicate generic high-rise residential towers across different regions, EXSIM designs each of its developments with a distinct, deeply researched identity and a customized selection of amenities. For example, their wellness-centric developments like Veladaz emphasize multi-tier holistic facilities, featuring dedicated meditation spaces, physical therapy rooms, air-purified communal lounges, and organic farming gardens. These are tailored specifically to meet the post-pandemic requirements of urban professionals who prioritize mental wellness and active lifestyle loops directly within their residential compounds.

Secondly, EXSIM properties have become synonymous with high material specifications and superb construction quality. The developer integrates advanced green technologies and high-grade insulated materials into building facades, drastically reducing solar heat gain and lowering individual utility costs for residents. Inside the units, attention to detail is evident through premium timber floor finishes, custom-engineered luxury kitchen cabinetry, and high-end bathroom fittings. This premium base configuration reduces post-purchase renovation headaches for buyers, ensuring that the property is immediately rentable or move-in ready upon completion.

For smart real estate investors, EXSIM projects represent low default rates and outstanding secondary market trading liquidity. The developer's project layouts are meticulously optimized to maximize efficient internal living space, with dual-key layouts frequently integrated to enable owners to maximize rental yields by renting out separate fully private micro-suites or studio components within a single property. By utilizing innovative architectural lines and providing highly demand-elastic multi-functional floor plans, EXSIM homes continue to command superior capital appreciation when traded on the sub-sale market, making them highly coveted assets in any balanced real estate investment portfolio.`,
    date: 'April 20, 2026',
    author: 'Shyan Yee',
    category: 'Developer Focus'
  },
  {
    id: '3',
    slug: 'central-park-damansara-investment-guide',
    title: 'Why Central Park Damansara is the Next Big Hub in PJ North',
    excerpt: 'Deep dive into the 65-acre masterplan of Central Park Damansara and why new launches like The Aldenz are selling fast.',
    content: `Central Park Damansara is redefining urban living in Petaling Jaya. As a 65-acre integrated township, it offers a unique blend of residential, retail, and corporate spaces. The highlight of the township is the 5-acre Central Park, providing a green lung for residents. New launches like The Aldenz are particularly attractive due to their strategic location near the DASH, LDP, and Sprint highways, offering unparalleled connectivity. With prices starting from RM 625k, it represents a significant opportunity for both own-stay and investment.

The northern corridor of Petaling Jaya, historically referred to as PJ North, is undergoing a profound structural renaissance, with the crown jewel of this transformation being the massive 65-acre integrated master-planned township of Central Park Damansara. This ambitious development has captured the undivided attention of property analysts and smart homebuyers alike, presenting a compelling vision of contemporary urbanism centered around modern conveniences, active commercial retail enclaves, and lush green lungs.

At the core of Central Park Damansara’s massive appeal is its thoughtful spatial distribution. In a high-density city like Petaling Jaya, access to vast open green spaces is highly limited. By dedicating 5 entire acres of prime land in the center of the township to a beautifully designed, family-friendly Central Park, the master developer has injected a powerful lifestyle USP. This sprawling park features beautifully paved jogging tracks, custom-designed children’s play structures, and peaceful public seating enclaves, offering urbanites a serene escape from the concrete jungle. This active integration of nature into modern vertical living is proven to drive property values upward over time, as lifestyle-focused buyers increasingly choose homes based on the immediate availability of outdoor spaces.

In terms of connectivity, Central Park Damansara occupies an exceptionally strategic position. It is highly accessible via major arterial roads and highway networks, including the Damansara-Shah Alam Elevated Expressway (DASH), the Damansara-Puchong Highway (LDP), the SPRINT Highway, and the Penchala Link. This multi-lane highway connectivity allows residents to easily commute to high-employment districts, such as Mutiara Damansara, One Utama, Mount Kiara, Bandar Utama, and the Kuala Lumpur financial center. For the high-income corporate crowd, young professional couples, and smart property investors, developments like The Aldenz @ Central Park Damansara offer a premium entry point into one of the most stable, bulletproof residential locations in Selangor, guaranteeing high rental occupancy rates and exceptional capital appreciation prospects for years to come.`,
    date: 'May 05, 2026',
    author: 'Shyan Yee',
    category: 'Area Guide'
  },
  {
    id: '4',
    slug: 'first-time-homebuyer-financing-guide-2026',
    title: 'First-Time Homebuyer\'s Guide to Property Financing in Malaysia 2026',
    excerpt: 'Master the mortgage application process with our detailed breakdown of DSR, stamp duty exemptions, and down payment strategies.',
    content: `Entering the property market for the very first time can feel like embarking on a complex navigational trek, especially when dealing with the intricacies of real estate financing in Malaysia. Moving into 2026, the local mortgage landscape has evolved with refined lending criteria from Bank Negara Malaysia (BNM). Understanding how bank loans are structured, what financial formulas determine your qualification, and how to utilize government stamp duty incentives are critical steps to turning your homeownership dream into a reality.

The first and most critical financial calculation that every homebuyer must master is the Debt Service Ratio (DSR). This is the standard mathematical formula that banks in Malaysia utilize to gauge your repayment capability and decide whether to approve your loan request. Your DSR is calculated by dividing your total monthly commitments (including credit card debts, student loans like PTPTN, car loans, and personal loans) plus your estimated new bank installment, by your net monthly income (after EPF, SOCSO, and PCB tax deductions). Most principal retail banks set a maximum DSR ceiling of 60% for middle-income applicants, or up to 85% for high-net-worth individuals. Keeping your DSR well below these limits by paying down high-interest credit card debt before submitting applications is the single most effective way to secure competitive borrowing interest rates.

To support homeownership, the Malaysian government continues to implement a highly generous stamp duty waiver policy under modern incentives. First-time buyers purchasing properties valued up to RM 500,000 are eligible for a complete 100% stamp duty exemption on both the Memorandum of Transfer (MOT) and the Loan Agreement docs. For properties priced between RM 500,001 and RM 1,000,000, buyers can enjoy a partial 75% stamp duty waiver. This incentive effectively saves buyers up to tens of thousands of ringgit in upfront administrative cash requirements, enabling them to divert these funds toward mortgage down payments or structural renovations.

Furthermore, buyers must prepare for secondary miscellaneous costs that are frequently overlooked during deep budgeting sessions. These include legal fees for both the developer's Sale and Purchase Agreement (SPA) and the housing loan agreement, property valuation fees by licensed residential surveyors, and mortgage insurance coverage. You will need to decide between Mortgage Reducing Term Assurance (MRTA)—an insurance plan whose coverage limits decrease proportionally over the tenure of your loan—or Mortgage Level Term Assurance (MLTA), which offers fixed, highly transferable cash-value protections. By carefully reviewing these detailed financing categories and seeking personalized advice from a certified, licensed agent, first-time homebuyers can secure favorable, stable terms that make their property journeys stress-free.`,
    date: 'May 10, 2026',
    author: 'Shyan Yee',
    category: 'Finance Guide'
  },
  {
    id: '5',
    slug: 'understanding-freehold-vs-leasehold-kl',
    title: 'Understanding Freehold vs. Leasehold Properties in Kuala Lumpur',
    excerpt: 'An objective structural comparison analyze to guide your long-term real estate investments in Malaysia.',
    content: `When searching for high-potential properties in Kuala Lumpur and Selangor, one of the primary legal classifications that buyers must evaluate is the land status: Freehold or Leasehold. While both classifications can serve as excellent, highly lucrative residential homes or high-yield investment properties, they carry different implications regarding long-term market appreciation, state authority bureaucracy, financing calculations, and transfer regulations designed by LPPEH professional standards.

Freehold properties represent land titles where ownership is granted to the buyer in perpetuity. The state government cannot easily reclaim the land unless it is required for highly specific public infrastructure projects (such as rail expansions or massive federal road alignments), in which case the owner is fairly compensated according to the Land Acquisition Act 1960. One of the main benefits of Freehold land in KL/Selangor is its ease of transfer. Because ownership resides with you, selling or transferring a Freehold property to another person is typically faster and does not require obtaining written consent from the State Authority. Furthermore, Freehold properties usually enjoy higher long-term value retention and persistent price growth, particularly in mature central commercial zones where further residential land development is strictly impossible.

Leasehold properties,. on the other hand, represent land that is leased from the state government for a specific tenure, typically 99 years in Malaysia. Once the lease expires, the property legally reverts to the state authority unless a direct application for a lease extension is submitted and approved, which requires paying a premium calculated by the local land registry. A common concern with Leasehold properties is secondary financing resistance. When a Leasehold development has less than 40 or 30 years remaining on its clock, commercial banks are highly reluctant to approve mortgage applications for new buyers, or will restrict the loan-to-value (LTV) margin limit to 70% or less. 

Additionally, transferring a Leasehold property requires written State Authority Consent, which adds 3 to 6 months of administrative delays to sub-sale processes. However, Leasehold properties should not be dismissed outright. In prime urban zones like Petaling Jaya or central Kuala Lumpur, Leasehold properties are often priced 15% to 20% lower than comparable Freehold developments. This lower purchase threshold allows investors to secure superior gross rental yields because the monthly rental demand remains equally high regardless of the underlying land title. By assessing your personal investment horizon and evaluating these factors logically, you can choose the land title that matches your long-term family security goals.`,
    date: 'May 14, 2026',
    author: 'Shyan Yee',
    category: 'Market Trends'
  },
  {
    id: '6',
    slug: 'smart-investment-rental-yield-capital-appreciation',
    title: 'Smart Real Estate Investments: Rental Yield vs. Capital Appreciation',
    excerpt: 'Learn the core mathematical principles to measure your property returns and optimize your passive income portfolio.',
    content: `Every successful investment in residential or commercial real estate is driven by a clear financial strategy tailored to specific economic outcomes. In Malaysia’s property sector, most smart investors categorize their target returns into two main pathways: monthly passive income generated via Rental Yield, or long-term wealth accumulated via Capital Appreciation. Navigating these two mechanics and understanding which properties suit which goals is essential to operating a highly profitable property portfolio.

To understand Rental Yield, you must master its mathematical calculation. Gross Rental Yield is calculated by taking the total annual rental income of an apartment and dividing it by the initial purchase price of the property, expressed as a percentage. For example, if you purchase a dual-key EXSIM condominium suite in Bukit Jalil for RM 600,000 and collect RM 2,500 in monthly rent, your gross annual rent is RM 30,000, yielding a 5.0% Gross Return. 

However, to gauge true profitability, you must calculate Net Rental Yield. This is done by subtracting all monthly and annual operational outgoings—such as management maintenance fees, property taxes, quit rent, fire insurance premiums, and minor repair provisions—from your annual gross income before dividing it by the acquisition price. Rental yield strategies are highly favored by retired individuals or investors who prioritize immediate, predictable monthly cash flows to offset their outstanding bank installments or fund their daily living costs.

Capital Appreciation strategies, conversely, focus on the long-term increase in the market trading value of the property over time. This approach requires identifying properties situated within rapid development corridors, under-construction zones, or master-planned townships (like Central Park Damansara) before values spike due to complete infrastructure arrival. Capital growth is driven by rising land scarcity, incoming transit links (such as new MRT stations), and modern lifestyle developments that attract a wealthier population to the suburb. 

While capital appreciation investments do not always generate immediate high monthly rental overflows, they are incredibly powerful for multiplying wealth and building generational equity. The most resilient real estate portfolios often strike a balance between the two, combining cash-generating dual-key units with highly appreciating transit-oriented developments in mature, bulletproof suburbs of Kuala Lumpur.`,
    date: 'May 18, 2026',
    author: 'Shyan Yee',
    category: 'Education'
  },
  {
    id: '7',
    slug: 'rise-of-transit-oriented-developments-tod',
    title: 'The Rise of Transit-Oriented Developments (TOD) near MRT & LRT Stations',
    excerpt: 'How integrated public transport access boosts property value, rental occupancy, and tenant demand in city hubs.',
    content: `Urban congestion and rising fuel costs have accelerated a dramatic shift in the lifestyle patterns of city dwellers across the Klang Valley. Modern professionals, young families, and high-income tenants are increasingly prioritizing convenience and walking accessibility, leading to the rapid rise of Transit-Oriented Developments (TOD) near MRT and LRT stations. These projects represent a highly robust and lucrative real estate sub-category that consistently commands premium prices and superior rental demand compared to isolated high-rise developments.

By definition, a true Transit-Oriented Development is an integrated, pedestrian-first masterplan designed to maximize access to public transport networks, typically situated within 400 meters of a commuter railway station. Many of these projects feature direct, covered, and highly secure pedestrian walkways that shield walkers from tropical weather conditions. This allows residents to walk straight from their elevator lobby to the train gates in under 5 minutes, providing direct access to key employment clusters like KL Sentral, TRX, and the technology corridors of Cyberjaya.

For property investors, the value of the \"Transit Premium\" is highly visible in market data. Condominiums connected to high-frequency rails command 10% to 15% higher rental rates than comparable properties located just a few kilometers away. This premium exists because tenants are highly willing to pay more for a lifestyle that completely eliminates the need for expensive daily car commuting, vehicle maintenance, and parking costs in expensive corporate areas. 

During typical economic downturns, TOD properties display incredible resilience, with tenant occupancy levels remaining stable. As city planning departments in Kuala Lumpur and Selangor continue to restrict parking requirements for newer TOD launches to reduce carbon emissions, owning a transit-adjacent apartment is one of the smartest ways to safeguard your investments against long-term societal changes and ensure steady capital growth.`,
    date: 'May 22, 2026',
    author: 'Shyan Yee',
    category: 'Market Trends'
  },
  {
    id: '8',
    slug: 'pet-friendly-condominiums-pj-damansara',
    title: 'Why Pet-Friendly Modern Condominiums Are Dominating PJ & Damansara',
    excerpt: 'Inside the growing premium segment catering to pet lovers and the specific community facilities that drive its demand.',
    content: `A quiet demographic revolution is reshaping the design priorities of premium housing developers across Petaling Jaya and Damansara. With the rise of single-person households, DINK (Double Income, No Kids) couples, and the general normalization of companion animal parenting in modern urban centers, pet-friendly high-rise properties have shifted from a minor luxury to a highly sought-after, premium-earning real estate asset. For pet owners, finding a rental apartment that legally and warmly accommodates their beloved pets is historically a major challenge, creating a massive, highly underserved market that smart developers like EXSIM are proactively addressing.

Traditionally, the Joint Management Bodies (JMB) of most high-rise condominiums in Malaysia enforce strict \"no-pets\" bylaws under standard strata management acts, forcing pet parents to either live in expensive landed properties or face potential conflicts with building associations. Newer, forward-thinking developments are completely rewriting this narrative by embedding pet wellness facilities directly into their initial masterplan. These include custom pet agility course parks, dedicated off-leash exercise zones, indoor pet boutique grooming salons, and sound-insulated waste disposal systems designed to maintain maximum neighborhood harmony.

For property investors, acquiring units in pet-permitted luxury complexes is a highly effective way to differentiate your asset on the crowded rental market. Pet owners are notoriously loyal and display incredibly low turnover rates, frequently opting to renew their tenancies year after year because the logistical complexity of moving to another pet-receptive building is so high. 

Furthermore, pet-friendly units command a significant premium, with tenants expressing absolute willingness to pay above-market rental yields to guarantee safe, certified housing for their companion animals. This growing premium segment is quickly becoming a primary choice for high-income urbanites in Petaling Jaya, making it an excellent niche to consider for forward-thinking property portfolios in 2026.`,
    date: 'May 24, 2026',
    author: 'Shyan Yee',
    category: 'Lifestyle'
  },
  {
    id: '9',
    slug: 'checklist-buying-under-construction-hda-properties',
    title: 'Complete Checklist for Buying Under-Construction (HDA) Properties in Malaysia',
    excerpt: 'Protect your property investments by understanding progressive billing, Defect Liability Periods, and Schedule H agreements.',
    content: `Purchasing a brand-new property directly from a housing developer—often referred to as buying under-construction or \"off-plan\"—is one of the most popular avenues for Malaysian homebuyers. It offers the double benefit of early-bird pricing discounts and brand-new facilities. However, to navigate this process safely, buyers must be protected under Malaysia's Housing Development (Control and Licensing) Act 1966 (HDA). This structured checklist guides you through the crucial legal milestones and practical steps involved to guarantee a secure, rewarding purchase.

The first protective pillar you must verify is whether the property sale is governed by a standard Schedule G or Schedule H Statutory Sale and Purchase Agreement (SPA). Schedule G is standard for landed residential properties, while Schedule H is mandated for high-rise stratified residential developments. These statutory contracts are non-negotiable and pre-drafted by national housing ministry attorneys, designed specifically to protect individual consumers. They specify that the developer must complete the high-rise building within 36 months of the SPA signing date, or face heavy late delivery penalties (known as Liquidated Ascertained Damages or LAD) computed at 10% per annum on the purchase price.

The second critical component of buying under-construction is understanding the Progressive Billing Structure. Unlike buying a completed sub-sale property where the bank releases the full 90% loan amount immediately, a progressive loan is released in specific stages tied to the actual physical completion of different structural phases of the building (such as foundation work, concrete framing, plumbing, and aesthetic finishes). Your monthly loan repayments start very small during construction and increase incrementally as the building approaches complete occupancy.

Finally, when you finally take key keys delivery, you enter the Defect Liability Period (DLP), which is equivalent to a 24-month manufacturer warranty for your home. During this 24-month window, the developer is legally bound to repair any structural cracks, plumbing leaks, architectural misalignments, or low-quality woodwork finishes at zero cost to the buyer. By systematically utilizing this checklists and inspecting the project parameters alongside a certified real estate advisor, you can confidently secure a pristine property while bypassing standard industry pitfalls.`,
    date: 'May 26, 2026',
    author: 'Shyan Yee',
    category: 'Education'
  },
  {
    id: '10',
    slug: 'epf-account-2-withdrawal-home-loan-malaysia',
    title: 'How EPF Account 2 Withdrawal Can Help Finance Your First Home Loan',
    excerpt: 'Discover the latest Employees Provident Fund withdrawal policies to support your down payment and monthly mortgage costs.',
    content: `Accumulating the necessary cash reserves for an initial property purchase remains one of the primary hurdles for young Malaysian professionals looking to break into the ownership market. Fortunately, the Employees Provident Fund (KWSP) offers a robust financial support mechanism that enables its members to withdraw funds from their Account 2 (previously also known as Account Sejahtera) to assist with several critical homeownership costs. Knowing how to draw on these savings can significantly lower your upfront capital requirements and ease your ongoing mortgage repayment commitments.

There are two primary ways you can utilize your EPF Account 2 of KWSP to finance a residential property. The first option is the 'Acquisition of Home' withdrawal scheme, which is designed to help you collect the initial 10% down payment required to secure a bank loan. Under this policy, members can withdraw their entire available Account 2 savings to cover the down payment amount, up to the difference between the property price and the approved bank loan amount (usually 90%). This allows buyers who are cash-pinched but have stable monthly employment EPF contributions to easily bypass the standard down payment constraint and purchase high-quality units.

The second highly effective option is the 'Monthly Repayment Support' scheme. This allow members to schedule automatic monthly transfers directly from their EPF Account 2 to their mortgaged bank accounts to offset their outstanding housing loan repayments. Under this framework, you can deduct a substantial portion or the entirety of your monthly mortgage burdens directly from your monthly employment EPF increments, boosting your liquid monthly pocket cash flow and ensuring that you never default on your bank loans during unexpected life changes.

To qualify for these withdrawals, applicants must provide standard supporting documents, including an active signed Sale and Purchase Agreement (SPA), an official housing loan approval letter from an approved commercial bank, their individual EPF statements, and proof of structural identity. All applications are easily submitted online via the modern i-Akaun portal with minimal physical processing time. Utilizing EPF Account 2 is an incredibly smart, highly secure, and state-sanctioned way to boost your home buying leverage and begin building real wealth through real estate equity early.`,
    date: 'May 28, 2026',
    author: 'Shyan Yee',
    category: 'Finance Guide'
  }
];
