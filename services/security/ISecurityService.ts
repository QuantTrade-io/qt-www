import { TypePromiseApiResponse } from "../response/TypesApiResponseHandler";
import { ParamsDeleteSession, ParamsGetDevices } from "./TypesSecurityService";
import { IDevice } from "~/models/security/IDevice";
import { DataDevice } from "~/models/security/DataDevice";

export interface ISecurityService {
  devices: IDevice[];

  setDevices(data: DataDevice[]): void;
  deleteSessionFromDevice(
    sessionId: number | string,
    deviceId: number | string
  ): void;

  getDevices(data: ParamsGetDevices): TypePromiseApiResponse;
  deleteSession(data: ParamsDeleteSession): TypePromiseApiResponse;
}
