import { IBaseModel } from "../base/IBaseModel";
import { ISession } from "./ISession";

export interface IDevice extends IBaseModel<IDevice> {
  name: string;
  image: string;
  info: string;
  sessions: ISession[];
}
