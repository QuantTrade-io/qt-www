import makeAutoObservable from "mobx-store-inheritance";
import { BaseModel } from "../base/BaseModel";
import { IUniqueSellingPoint } from "./IUniqueSellingPoint";
import { DataUniqueSellingPoint } from "./DataUniqueSellingPoint";

export class UniqueSellingPoint
  // eslint-disable-next-line no-use-before-define
  extends BaseModel<UniqueSellingPoint>
  implements IUniqueSellingPoint
{
  /**
   * Class that acts like an object, which contains all the information regarding a Unique Selling Point (USP).
   *
   * @remarks
   * This class is a so-called 'model', which purpose is to represent the data for a Unique Selling Point.
   * A USP is related to a Product, containing information regarding the USPs for a Product.
   * The UniqueSellingPoint extends the BaseModel and implements an interface called IUniqueSellingPoint.
   *
   * @param DataUniqueSellingPoint - That contains the following: id & description
   * @returns The implemented model of a UniqueSellingPoint which can be used throughout the codebase in order to represent Products USPs.
   *
   */
  description: string;

  constructor(data: DataUniqueSellingPoint) {
    super(data);
    makeAutoObservable(this);
    const mappedData = this.mapResponseKeys(data);
    this.description = mappedData.description || "";
  }
}
