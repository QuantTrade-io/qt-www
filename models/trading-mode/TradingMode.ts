import { BaseModel } from "../base/BaseModel";
import { ITradingMode } from "./ITradingMode";
import { DataTradingMode } from "./DataTradingMode";

export class TradingMode
  // eslint-disable-next-line no-use-before-define
  extends BaseModel<TradingMode>
  implements ITradingMode
{
  /**
   * Class that acts like an object, which contains all the information regarding a TradingMode.
   *
   * @remarks
   * This class is a so-called 'model', which purpose is to represent the data for a TradingMode.
   * A TradingMode can basically be; 'paper' or 'live', which means trading with fake money or real money.
   * The TradingMode extends the BaseModel model and implements an interface called ITradingMode.
   *
   * @param TradingMode - That contains the following: id, name, @param DataTradingMode
   * @returns The implemented model of a TradingMode which can be used throughout the codebase in order to represent TradingMode information.
   *
   */
  name: string;
  constructor(data: DataTradingMode) {
    super(data);
    this.name = data.name;
  }
}
