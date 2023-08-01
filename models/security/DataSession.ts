import { DataBaseModel } from "../base/DataBaseModel";

export interface DataSession extends DataBaseModel {
  city: string;
  country: string;
  current: boolean;
  active: boolean;
  lastUsed: string;
  expiresAt: string;
}
