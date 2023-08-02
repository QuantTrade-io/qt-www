import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/outline";
import {
  FunctionalComponent,
  HTMLAttributes,
  VNodeProps,
} from "nuxt/dist/app/compat/capi";
import { BaseModel } from "../base/BaseModel";
import { IToastMessage } from "./IToastMessage";
import { EToastStyling } from "./EToastMessage";
import { DataToastMessage } from "./DataToastMessage";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";

export class ToastMessage
  // eslint-disable-next-line no-use-before-define
  extends BaseModel<ToastMessage>
  implements IToastMessage
{
  /**
   * Class that acts like an object, which contains information regarding a Toast.
   *
   * @remarks
   * This class is a so-called 'model', which purpose is to represent the toast styling and text withing the application.
   * The ToastMessage extends the BaseModel model and implements an interface called IToastMessage.
   *
   * @param DataToastMessage - That contains the following information: title, message, timeout, icon & styling
   * @returns The implemented model of a ToastMessage which can be used within the ToastMessageService for displaying information to the user.
   *
   */
  title: string;
  message: string;
  timeout: number;
  icon!: FunctionalComponent<HTMLAttributes & VNodeProps, {}>;
  styling!: EToastStyling;

  constructor(data: DataToastMessage) {
    super(data);
    this.title = data.title;
    this.message = data.message;
    this.setStyling(data.status);
    this.timeout = data.timeout || 5000;
  }

  private setStyling(status: EApiResponseStatus): void {
    switch (status) {
      case EApiResponseStatus.success:
        this.icon = CheckCircleIcon;
        this.styling = EToastStyling.success;
        break;
      case EApiResponseStatus.error:
        this.icon = XCircleIcon;
        this.styling = EToastStyling.error;
        break;
      case EApiResponseStatus.info:
        this.icon = InformationCircleIcon;
        this.styling = EToastStyling.info;
        break;
    }
  }
}
