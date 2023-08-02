import { IBaseModel } from "../base/IBaseModel";
import { Price } from "./Price";
import { UniqueSellingPoint } from "./UniqueSellingPoint";

export interface IProduct extends IBaseModel<IProduct> {
  name: string;
  uniqueSellingPoints: UniqueSellingPoint[];
  featured: boolean;
  prices: Price[];

  getPriceForInterval(interval: string): number;
  getPriceIdForInterval(interval: string): number | string;
}
