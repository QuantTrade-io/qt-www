import { BaseModel } from "../base/BaseModel";
import { UniqueSellingPoint } from "./UniqueSellingPoint";
import { Price } from "./Price";
import { IProduct } from "./IProduct";
import { DataProduct } from "./DataProduct";

// eslint-disable-next-line no-use-before-define
export class Product extends BaseModel<Product> implements IProduct {
  /**
   * Class that acts like an object, which contains all the information regarding a Product.
   *
   * @remarks
   * This class is a so-called 'model', which purpose is to represent the data for a Product.
   * A product is related to a Stripe subscription plan, containing information regarding the Subscription plan.
   * The Product extends the BaseModel model and implements an interface called IProduct.
   *
   * @param DataProduct - That contains the following: id, name, @param DataUniqueSellingPoint, featured & @param DataPrice.
   * @returns The implemented model of a Product which can be used throughout the codebase in order to represent Product information.
   *
   */
  name: string;
  uniqueSellingPoints: UniqueSellingPoint[];
  featured: boolean;
  prices: Price[];

  constructor(data: DataProduct) {
    super(data);
    this.name = data.name;
    this.uniqueSellingPoints = data.uniqueSellingPoints;
    this.featured = data.featured;
    this.prices = data.prices;
  }

  getPriceForInterval(interval: string): number {
    const price = this.prices.find((price) => price.interval === interval);
    return price!.amount / 100;
  }

  getPriceIdForInterval(interval: string): number | string {
    const price = this.prices.find((price) => price.interval === interval);
    return price!.id;
  }
}
