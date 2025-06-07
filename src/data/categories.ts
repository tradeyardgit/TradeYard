import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'smartphone',
    subcategories: ['Phones & Tablets', 'Computers', 'TVs', 'Audio', 'Accessories']
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: 'car',
    subcategories: ['Cars', 'Motorcycles', 'Trucks & Commercial', 'Parts & Accessories']
  },
  {
    id: 'property',
    name: 'Real Estate',
    icon: 'home',
    subcategories: ['Houses & Apartments', 'Land & Plots', 'Commercial Property', 'Short Lets']
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: 'shirt',
    subcategories: ['Clothing', 'Shoes', 'Bags', 'Jewelry', 'Watches']
  },
  {
    id: 'jobs',
    name: 'Jobs',
    icon: 'briefcase',
    subcategories: ['Full-time', 'Part-time', 'Temporary', 'Internship']
  },
  {
    id: 'services',
    name: 'Services',
    icon: 'wrench',
    subcategories: ['Repair', 'Cleaning', 'Private Lessons', 'Health & Beauty', 'Building']
  },
  {
    id: 'furniture',
    name: 'Home & Garden',
    icon: 'sofa',
    subcategories: ['Furniture', 'Home Appliances', 'Kitchen', 'Garden']
  },
  {
    id: 'babies',
    name: 'Babies & Kids',
    icon: 'baby',
    subcategories: ['Baby Clothes', 'Children Clothes', 'Toys', 'Baby Gear']
  }
];