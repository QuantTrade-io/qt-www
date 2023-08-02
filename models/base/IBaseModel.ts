export interface IBaseModel<T extends IBaseModel<T>> {
  id: number | string;

  patch(changes: Partial<T>): void;
}
