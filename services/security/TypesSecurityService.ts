import { ParamsBaseApi } from "../base/TypesBaseService";

// DATA: object creation
export interface ParamsGetDevices extends ParamsBaseApi {}

export interface ParamsDeleteSession extends ParamsBaseApi {
  sessionId: number | string;
}
