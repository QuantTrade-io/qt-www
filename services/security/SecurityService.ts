// import { makeAutoObservable } from "mobx";
import makeAutoObservable from "mobx-store-inheritance";
import { clearPersistedStore } from "mobx-persist-store";
import { TypePromiseApiResponse } from "../response/TypesApiResponseHandler";
import { BaseService } from "../base/BaseService";
import { ParamsGetDevices, ParamsDeleteSession } from "./TypesSecurityService";
import { ISecurityService } from "./ISecurityService";
import { userService } from "~/services/user/UserService";
import { DataDevice } from "~/models/security/DataDevice";
import { Device } from "~/models/security/Device";

class SecurityService extends BaseService implements ISecurityService {
  /**
   * Class that holds all logic regarding some Security stuff.
   *
   * @remarks
   * This class is a so-called 'service', which (in this case), provides logic for handling Security related stuff.
   * The SecurityService implements the ISecurityService
   *
   */
  static DEVICES_URL = `/v1/security/devices/`;
  static SESSION_ITEM_URL = `/v1/security/sessions/{sessionId}/`;

  devices: Device[] = [];

  constructor() {
    super();
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setDevices(data: DataDevice[]) {
    this.devices = data.map((deviceData) => new Device(deviceData));
  }

  deleteSessionFromDevice(
    sessionId: number | string,
    deviceId: number | string
  ) {
    // Find the device with the given deviceId
    const device = this.devices.find((device) => device.id === deviceId);

    if (!device) {
      return;
    }

    // Find the session with the given sessionId in the list of sessions for the device
    const sessionIndex = device.sessions.findIndex(
      (session) => session.id === sessionId
    );

    if (sessionIndex === -1) {
      // Session with the given sessionId not found in the device's sessions
      return;
    }

    // Remove the session from the list of sessions for the device
    device.sessions.splice(sessionIndex, 1);

    // Check if there are still sessions left for the device
    if (device.sessions.length !== 0) {
      return;
    }

    // Remove the device from the list of devices for the device
    const index = this.devices.findIndex((device) => device.id === deviceId);
    if (index === -1) {
      return;
    }
    this.devices.splice(index, 1);
  }

  async getDevices(params: ParamsGetDevices): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: this.parseUrl({
        url: SecurityService.DEVICES_URL,
        queryParams: { refresh_token: userService.loggedInUserRefreshToken! },
      }),
      method: "GET",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
    });
  }

  async deleteSession(params: ParamsDeleteSession): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: this.parseUrl({
        url: SecurityService.SESSION_ITEM_URL,
        urlParams: { sessionId: params.sessionId },
      }),
      method: "DELETE",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
    });
  }

  async clearStoredData() {
    await clearPersistedStore(this);
  }
}

export const securityService = new SecurityService();
