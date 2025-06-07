import { Ad } from '../types';

export const mockAds: Ad[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro Max - 256GB - Like New',
    price: 450000,
    description: 'Selling my iPhone 13 Pro Max in perfect condition. Comes with original accessories and box. Battery health at 92%. No scratches or dents.',
    category: 'electronics',
    subcategory: 'Phones & Tablets',
    location: 'lagos',
    images: [
      'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg',
      'https://images.pexels.com/photos/5750002/pexels-photo-5750002.jpeg'
    ],
    postedAt: '2023-10-15T14:30:00Z',
    seller: {
      id: 'user1',
      name: 'John Okafor',
      email: 'john@example.com',
      phone: '+234 812 345 6789',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      location: 'lagos',
      joinedDate: '2022-05-10T00:00:00Z'
    },
    featured: true,
    condition: 'Used - Like New',
    negotiable: true
  },
  {
    id: '2',
    title: '2020 Toyota Camry - Excellent Condition',
    price: 15000000,
    description: 'Clean 2020 Toyota Camry with low mileage. First owner, all documents complete. Regular servicing at authorized center.',
    category: 'vehicles',
    subcategory: 'Cars',
    location: 'abuja',
    images: [
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg'
    ],
    postedAt: '2023-10-12T09:15:00Z',
    seller: {
      id: 'user2',
      name: 'Amina Ibrahim',
      email: 'amina@example.com',
      phone: '+234 803 456 7890',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      location: 'abuja',
      joinedDate: '2021-11-20T00:00:00Z'
    },
    featured: true,
    condition: 'Used - Excellent',
    negotiable: true
  },
  {
    id: '3',
    title: '3 Bedroom Apartment in Lekki Phase 1',
    price: 120000000,
    description: 'Luxury 3 bedroom apartment in Lekki Phase 1. All rooms ensuite, modern kitchen, swimming pool, 24/7 security and power.',
    category: 'property',
    subcategory: 'Houses & Apartments',
    location: 'lagos',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg'
    ],
    postedAt: '2023-10-10T16:45:00Z',
    seller: {
      id: 'user3',
      name: 'Emeka Properties',
      email: 'emeka@properties.com',
      phone: '+234 805 678 9012',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      location: 'lagos',
      joinedDate: '2020-06-15T00:00:00Z'
    },
    featured: true,
    negotiable: false
  },
  {
    id: '4',
    title: 'PlayStation 5 with Extra Controller',
    price: 650000,
    description: 'Brand new PlayStation 5 Disc Edition with an extra controller. Still sealed in box with 1 year warranty.',
    category: 'electronics',
    subcategory: 'Gaming',
    location: 'port-harcourt',
    images: [
      'https://images.pexels.com/photos/12719149/pexels-photo-12719149.jpeg'
    ],
    postedAt: '2023-10-09T11:20:00Z',
    seller: {
      id: 'user4',
      name: 'David Okonkwo',
      email: 'david@example.com',
      phone: '+234 809 123 4567',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      location: 'port-harcourt',
      joinedDate: '2022-02-28T00:00:00Z'
    },
    featured: false,
    condition: 'New',
    negotiable: true
  },
  {
    id: '5',
    title: 'Professional Graphic Designer Available',
    price: 50000,
    description: 'Professional graphic designer with 5+ years experience. Specializing in logo design, branding, and social media graphics. Portfolio available upon request.',
    category: 'services',
    subcategory: 'Design & Creative',
    location: 'ibadan',
    images: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg'
    ],
    postedAt: '2023-10-08T15:10:00Z',
    seller: {
      id: 'user5',
      name: 'Funmi Adebayo',
      email: 'funmi@design.com',
      phone: '+234 802 345 6789',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      location: 'ibadan',
      joinedDate: '2021-08-12T00:00:00Z'
    },
    featured: false,
    negotiable: true
  },
  {
    id: '6',
    title: 'MacBook Pro 16" M1 Pro - 32GB RAM',
    price: 1250000,
    description: 'Selling my MacBook Pro 16" with M1 Pro chip, 32GB RAM and 1TB SSD. In excellent condition with AppleCare+ until 2024.',
    category: 'electronics',
    subcategory: 'Computers',
    location: 'lagos',
    images: [
      'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg'
    ],
    postedAt: '2023-10-07T12:30:00Z',
    seller: {
      id: 'user6',
      name: 'Tunde Johnson',
      email: 'tunde@example.com',
      phone: '+234 813 456 7890',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      location: 'lagos',
      joinedDate: '2022-01-05T00:00:00Z'
    },
    featured: true,
    condition: 'Used - Excellent',
    negotiable: true
  },
  {
    id: '7',
    title: 'Administrative Assistant Needed',
    price: 120000,
    description: 'We are looking for an Administrative Assistant to join our team. Monthly salary of 120,000 Naira. Requirements: computer literacy, good communication skills, 2+ years experience.',
    category: 'jobs',
    subcategory: 'Full-time',
    location: 'abuja',
    images: [
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
    ],
    postedAt: '2023-10-06T09:45:00Z',
    seller: {
      id: 'user7',
      name: 'Global Solutions Ltd',
      email: 'hr@globalsolutions.com',
      phone: '+234 809 876 5432',
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
      location: 'abuja',
      joinedDate: '2020-11-30T00:00:00Z'
    },
    featured: false,
    negotiable: false
  },
  {
    id: '8',
    title: 'Samsung 55" QLED Smart TV',
    price: 550000,
    description: 'Samsung 55" QLED 4K Smart TV in excellent condition. Comes with original remote and wall mount bracket.',
    category: 'electronics',
    subcategory: 'TVs',
    location: 'kano',
    images: [
      'https://images.pexels.com/photos/6782570/pexels-photo-6782570.jpeg'
    ],
    postedAt: '2023-10-05T17:20:00Z',
    seller: {
      id: 'user8',
      name: 'Ibrahim Musa',
      email: 'ibrahim@example.com',
      phone: '+234 803 987 6543',
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
      location: 'kano',
      joinedDate: '2021-07-18T00:00:00Z'
    },
    featured: false,
    condition: 'Used - Good',
    negotiable: true
  }
];