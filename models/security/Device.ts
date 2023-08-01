import makeAutoObservable from "mobx-store-inheritance";
import { BaseModel } from "../base/BaseModel";
import { DataDevice } from "./DataDevice";
import { IDevice } from "./IDevice";
import { Session } from "./Session";

export class Device
  // eslint-disable-next-line no-use-before-define
  extends BaseModel<Device>
  implements IDevice
{
  /**
   * Class that acts like an object, which contains all the information regarding a Device.
   *
   * @remarks
   * This class is a so-called 'model', which purpose is to represent the data for a Device.
   * A device basically holds information regarding; the name, image, info & Sessions.
   * The Device extends the BaseModel model and implements an interface called IDevice.
   *
   * @param Device - That contains the following: id, name, @param DataDevice
   * @returns The implemented model of a Device which can be used throughout the codebase in order to represent Device and/or Session information.
   *
   */
  name: string;
  image: string;
  info: string;
  sessions: Session[];

  constructor(data: DataDevice) {
    super(data);
    makeAutoObservable(this);
    const mappedData = this.mapResponseKeys(data);
    this.name = mappedData.name || "";
    this.image = mappedData.image || "";
    this.info = mappedData.info || "";
    this.sessions =
      mappedData.sessions?.map((sessionData) => new Session(sessionData)) || [];
  }
}
