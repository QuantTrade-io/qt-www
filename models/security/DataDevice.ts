import { DataBaseModel } from "../base/DataBaseModel";
import { DataSession } from "./DataSession";

export interface DataDevice extends DataBaseModel {
  name: string;
  image: string;
  info: string;
  sessions: DataSession[];
}
