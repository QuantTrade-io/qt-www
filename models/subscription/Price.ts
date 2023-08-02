import makeAutoObservable from "mobx-store-inheritance";
import { BaseModel } from "../base/BaseModel";
import { DataPrice } from "./DataPrice";
import { IPrice } from "./IPrice";

// eslint-disable-next-line no-use-before-define
export class Price extends BaseModel<Price> implements IPrice {
  /**
   * Class that acts like an object, which contains all the information regarding a Price.
   *
   * @remarks
   * This class is a so-called 'model', which purpose is to represent the data for a Price.
   * A price is related to a Product, containing either the monlthy or annually price.
   * The Price extends the BaseModel and implements an interface called IPrice.
   *
   * @param DataPrice - That contains the following: id, amount & interval
   * @returns The implemented model of a Price which can be used throughout the codebase in order to represent Pricing information.
   *
   */
  amount: number;
  interval: string;

  constructor(data: DataPrice) {
    super(data);
    makeAutoObservable(this);
    this.amount = data.amount / 100;
    this.interval = data.interval;
  }
}
