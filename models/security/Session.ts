import makeAutoObservable from "mobx-store-inheritance";
import { BaseModel } from "../base/BaseModel";
import { DataSession } from "./DataSession";
import { ISession } from "./ISession";

export class Session
  // eslint-disable-next-line no-use-before-define
  extends BaseModel<Session>
  implements ISession
{
  /**
   * Class that acts like an object, which contains all the information regarding a Session.
   *
   * @remarks
   * This class is a so-called 'model', which purpose is to represent the data for a Session.
   * A Session basically has the following attributes; city, country, current, active, lastUsed & expiresAt
   * The Session extends the BaseModel model and implements an interface called ISession.
   *
   * @param Session - That contains the following: city, country, current, active, lastUsed & expiresAt @param DataSession
   * @returns The implemented model of a Session which can be used throughout the codebase in order to represent Session information.
   *
   */
  city: string;
  country: string;
  current: boolean;
  active: boolean;
  lastUsed: string;
  expiresAt: string;

  constructor(data: DataSession) {
    super(data);
    makeAutoObservable(this);
    const mappedData = this.mapResponseKeys(data);
    this.city = mappedData.city || "";
    this.country = mappedData.country || "";
    this.current = mappedData.current || false;
    this.active = mappedData.active || false;
    this.lastUsed = mappedData.lastUsed || "";
    this.expiresAt = mappedData.expiresAt || "";
  }
}
