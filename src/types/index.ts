export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  location: string;
  joinedDate: string;
}

export interface Ad {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  subcategory?: string;
  location: string;
  images: string[];
  postedAt: string;
  seller: User;
  featured?: boolean;
  condition?: string;
  negotiable?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories?: string[];
}

export interface Location {
  id: string;
  name: string;
  state: string;
}