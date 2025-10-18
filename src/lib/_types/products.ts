export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: category;
  images: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface category {
  id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  description: string | null;
}
