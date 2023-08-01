import { ParamsBaseApi } from "../base/TypesBaseService";

export interface ParamsGetDevices extends ParamsBaseApi {}

export interface ParamsDeleteSession extends ParamsBaseApi {
  sessionId: string | number;
}
