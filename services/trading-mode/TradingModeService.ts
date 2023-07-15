import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

import { ITradingModeService } from "./ITradingModeService";

export class TradingModeService implements ITradingModeService {
  /**
   * Class that holds all the logic for getting and setting the Trading mode.
   *
   * @remarks
   * This class is a so-called 'service', which (in this case), provides the current Trading mode.
   * The TradingModeService implements the ITradingModeService.
   *
   */
  tradingLive = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    makePersistable(this, {
      name: "TradingMode",
      properties: ["tradingLive"],
      storage: window.localStorage,
    });
  }

  toggleTradingMode() {
    this.tradingLive = !this.tradingLive;
  }
}

export const tradingModeService = new TradingModeService();
