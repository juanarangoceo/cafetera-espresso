export type ViewState = 'home' | 'checkout' | 'privacy' | 'terms';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}