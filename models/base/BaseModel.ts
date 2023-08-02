import camelcaseKeys from "camelcase-keys";

import { IBaseModel } from "./IBaseModel";
import { DataBaseModel, DataMapResponseKey } from "./DataBaseModel";

// eslint-disable-next-line no-use-before-define
export abstract class BaseModel<T extends BaseModel<T>>
  implements IBaseModel<T>
{
  /**
   * This is the BaseModel abstract class.
   *
   * @remarks
   * This class is a so-called 'abstract' class, Abstract classes are mainly for inheritance where other classes may derive from them.
   * The BaseModel class implements the IBaseModel interface.
   *
   * @param DataBaseModel - That contains an id -> number or string.
   *                        Data interfaces/types serve a different purpose, which mainly is providing type hinting/checking for props/input data in the constructor.
   *
   */
  public id!: number | string;

  constructor(data: DataBaseModel) {
    this.id = data.id;
  }

  // Method to map snake_case keys to camelCase
  protected mapResponseKeys(data: DataMapResponseKey): Partial<T> {
    return camelcaseKeys(data, { deep: true }) as Partial<T>;
  }

  // Method to update known attributes based on input
  public patch(changes: Partial<T>): void {
    const mappedChanges = this.mapResponseKeys(changes);
    Object.assign(this, mappedChanges);
  }
}
