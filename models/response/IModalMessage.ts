import {
  FunctionalComponent,
  HTMLAttributes,
  VNodeProps,
} from "nuxt/dist/app/compat/capi";
import { IBaseModel } from "../base/IBaseModel";
import { EModalStyling } from "./EModalMessage";
import { DataButtonInfo } from "./DataModalMessage";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";

export interface IModalMessage extends IBaseModel<IModalMessage> {
  title: string;
  message: string;
  icon: FunctionalComponent<HTMLAttributes & VNodeProps, {}>;
  styling: EModalStyling;
  buttons: DataButtonInfo[];

  setStyling(status: EApiResponseStatus): void;
}
