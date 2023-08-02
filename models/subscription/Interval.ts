import { BaseModel } from "../base/BaseModel";
import { DataInterval } from "./DataInterval";
import { IInterval } from "./IInterval";

// eslint-disable-next-line no-use-before-define
export class Interval extends BaseModel<Interval> implements IInterval {
  /**
   * Class that acts like an object, which contains all the information regarding an Interval.
   *
   * @remarks
   * This class is a so-called 'model', which purpose is to represent the data for an Interval.
   * An interval represents the payment period, which is the interbal between payments.
   * The Interval extends the BaseModel and implements an interface called IInterval.
   *
   * @param DataInterval - That contains the following: id, value & label
   * @returns The implemented model of an Interval which can be used throughout the codebase in order to represent subscription Intervals.
   *
   */
  value: string;
  label: string;

  constructor(data: DataInterval) {
    super(data);
    const mappedData = this.mapResponseKeys(data);
    this.value = mappedData.value || "";
    this.label = `pricing.${mappedData.value}` || "";
  }
}
