import { TypeUniqueSellingPoint } from "./TypeUniqueSellingPoint";
import { TypePrice } from "./TypePrice";

export interface TypeProduct {
  id: number | string;
  name: string;
  unique_selling_points: TypeUniqueSellingPoint[];
  featured: boolean;
  prices: TypePrice[];
}
