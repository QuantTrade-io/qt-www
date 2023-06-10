import { makeAutoObservable } from "mobx";
import {
  clearPersistedStore,
  isHydrated,
  makePersistable,
} from "mobx-persist-store";
import {
  ReturnHandleResponse,
  TypePromiseApiResponse,
} from "../response/TypesApiResponseHandler";
import { EApiResponseStatus } from "../response/EApiResponseHandler";
import { modalMessageService } from "../response/ModalMessageService";
import { toastMessageService } from "../response/ToastMessageService";
import {
  ParamsUserLoginApi,
  ParamsUserRegisterApi,
  ParamsUserVerifyEmailApi,
} from "./TypesUserService";
import { EAccountStatus } from "./EUserService";
import { IUserService } from "./IUserService";
import { ModalMessage } from "~/models/response/ModalMessage";
import { ToastMessage } from "~/models/response/ToastMessage";
import { DataButtonInfo } from "~/models/response/DataModalMessage";

class UserService implements IUserService {
  /**
   * Class that holds all logic regarding the User (register, login, etc).
   *
   * @remarks
   * This class is a so-called 'service', which (in this case), provides logic for handling User related stuff.
   * The UserService implements the IUserService
   *
   */
  static USER_REGISTER_URL = `/v1/auth/user-register/`;
  static USER_LOGIN_URL = `/v1/auth/user-login/`;
  static USER_VERIFY_EMAIL_URL = `/v1/auth/user-register/verify-email/`;
  static USER_LOGIN_REFRESH_TOKEN_URL = `/v1/auth/refresh-token/`;

  loggedInUserAccessToken: string | null = null;
  loggedInUserRefreshToken: string | null = null;
  loggedInUserAccountStatus: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    makePersistable(this, {
      name: "UserService",
      properties: [
        "loggedInUserAccessToken",
        "loggedInUserRefreshToken",
        "loggedInUserAccountStatus",
      ],
      storage: window.localStorage,
    });
  }

  get isHydrated(): boolean {
    return isHydrated(this);
  }

  setLoggedInUserTokens(token: any) {
    this.loggedInUserAccessToken = token.access ?? null;
    this.loggedInUserRefreshToken = token.refresh ?? null;
  }

  setLoggedInUserAccessToken(accessToken: string) {
    this.loggedInUserAccessToken = accessToken;
  }

  setLoggedInUserAccountStatus(accountStatus: string) {
    this.loggedInUserAccountStatus = accountStatus;
  }

  hasLoggedInUserRefreshToken() {
    return this.loggedInUserRefreshToken !== null;
  }

  hasLoggedInUserAccessToken() {
    return this.loggedInUserRefreshToken !== null;
  }

  hasLoggedInUserAccountStatus() {
    return this.loggedInUserAccountStatus !== null;
  }

  async logout() {
    await this.clearStoredDate();
  }

  async userRegister(data: ParamsUserRegisterApi): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.USER_REGISTER_URL,
      method: "POST",
      locale: data.locale,
      body: data.body,
    });
  }

  async userVerifyEmail(
    data: ParamsUserVerifyEmailApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.USER_VERIFY_EMAIL_URL,
      method: "POST",
      locale: data.locale,
      body: data.body,
    });
  }

  async userLogin(data: ParamsUserLoginApi): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.USER_LOGIN_URL,
      method: "POST",
      locale: data.locale,
      body: data.body,
    });
  }

  async userLoginRefreshToken(): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.USER_LOGIN_REFRESH_TOKEN_URL,
      method: "POST",
      body: {
        refresh_token: this.loggedInUserRefreshToken,
      },
    });
  }

  _handleSuccessfullLogin(apiResponse: any, message: ReturnHandleResponse) {
    toastMessageService.addToast(
      new ToastMessage({
        id: Math.random(),
        title: message.title,
        message: message.message,
        status: message.status,
      })
    );
    this.setLoggedInUserTokens(apiResponse.token);
    this.setLoggedInUserAccountStatus(apiResponse.account_status);
    this._redirectSuccessfullLogin(apiResponse.account_status);
  }

  _handleSuccessfullAccessTokenLogin(
    apiResponse: any,
    message: ReturnHandleResponse
  ) {
    toastMessageService.addToast(
      new ToastMessage({
        id: Math.random(),
        title: message.title,
        message: message.message,
        status: message.status,
      })
    );
    this.setLoggedInUserAccessToken(apiResponse.access_token);
    this.setLoggedInUserAccountStatus(apiResponse.account_status);
    return this._redirectSuccessfullLogin(apiResponse.account_status);
  }

  _redirectSuccessfullLogin(accountStatus: string) {
    const localePath = useLocalePath();
    if (accountStatus === EAccountStatus.verified) {
      return navigateTo({
        path: localePath("/platform/billing"),
      });
    }
    return navigateTo({
      path: localePath("/platform/dashboard"),
    });
  }

  _handleUnsuccessfullLogin(responseMessage: ReturnHandleResponse) {
    this.logout();
    const [buttons, message] = this._errorResponseMessages(
      responseMessage.message
    );
    const modalMessage = new ModalMessage({
      id: Math.random(),
      title: responseMessage.title,
      message: message ?? responseMessage.message,
      status: EApiResponseStatus.error,
      buttons,
    });
    modalMessageService.addModal(modalMessage);
  }

  _errorResponseMessages(accountStatus: string): [DataButtonInfo[], string?] {
    const buttons = [];
    switch (accountStatus) {
      case EAccountStatus.registered:
        buttons.push({
          id: 1,
          to: "/auth/reset/email-verification",
          themeId: 5,
          label: "Rerequest email verification",
        });
        return [buttons, "global.messages.registered"];
      case EAccountStatus.reset_email:
        buttons.push({
          id: 1,
          to: "/auth/reset/email",
          themeId: 5,
          label: "Rerequest change email",
        });
        return [buttons, "global.messages.change_email_requested"];
      case EAccountStatus.reset_password:
        buttons.push({
          id: 1,
          to: "/auth/reset/password",
          themeId: 5,
          label: "Rerequest change password",
        });
        return [buttons, "global.messages.change_password_requested"];
      default:
        return [
          [
            {
              id: 1,
              to: "/home",
              themeId: 7,
              label: "Home",
            },
            {
              id: 2,
              to: "/auth/register",
              themeId: 5,
              label: "Register",
            },
          ],
        ];
    }
  }

  async clearStoredDate() {
    await clearPersistedStore(this);
  }
}

export const userService = new UserService();
