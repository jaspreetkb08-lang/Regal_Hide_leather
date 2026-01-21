
export type Category = 'Watches' | 'Belts' | 'Shoes' | 'Bags';
export type Collection = 'Maharaja' | 'Maharani';

export interface Product {
  id: string;
  name: string;
  category: Category;
  collection: Collection;
  price: number;
  description: string;
  image: string;
  colors: string[];
  material: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  orders: Order[];
  addresses: Address[];
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'In Transit' | 'Delivered';
  items: CartItem[];
}

export interface Address {
  id: string;
  type: 'Home' | 'Office';
  line1: string;
  city: string;
  pincode: string;
}
