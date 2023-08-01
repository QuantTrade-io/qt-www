import { IBaseModel } from "../base/IBaseModel";

export interface ISession extends IBaseModel<ISession> {
  city: string;
  country: string;
  current: boolean;
  active: boolean;
  lastUsed: string;
  expiresAt: string;
}
