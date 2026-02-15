export interface Product {
  id?: string;
  name: string;        // et non Name
  price: number;       // et non Price
  description: string;
  imageUrl: string;
  category?: string;
}