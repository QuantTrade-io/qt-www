import { makeAutoObservable } from "mobx";
import {
  makePersistable,
} from "mobx-persist-store";

import { ITradingModeService } from "./ITradingModeService";
import { getJSDocThisTag } from "typescript";
import { TradingMode } from "~/models/trading-mode/TradingMode";

export class TradingModeService implements ITradingModeService {
  /**
   * Class that holds all the logic for getting and setting the Trading mode.
   *
   * @remarks
   * This class is a so-called 'service', which (in this case), provides the current Trading mode.
   * The TradingModeService implements the ITradingModeService.
   *
   */
  tradingLive: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    makePersistable(this, {
      name: "TradingMode",
      properties: [
        "tradingLive",
      ],
      storage: window.localStorage,
    });
  }

  toggleTradingMode() {
    this.tradingLive = !this.tradingLive
  }
}

export const tradingModeService = new TradingModeService();
