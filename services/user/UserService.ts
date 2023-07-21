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
  ParamsPatchAuthenticatedUserApi,
  ParamsRequestPasswordResetApi,
  ParamsDeleteAuthenticatedUserApi,
  ParamsPatchAuthenticatedUserSettingsApi,
  ParamsVerifyPasswordResetApi,
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
  static USER_REQUEST_PASSWORD_RESET = `/v1/auth/reset/password/`;
  static USER_VERIFY_PASSWORD_RESET = `/v1/auth/verify/reset-password/`;

  static AUTHENTICATED_USER_URL = `/v1/auth/user/`;
  static AUTHENTICATED_USER_SETTINGS_URL = `/v1/auth/user/settings/`;

  loggedInUserAccessToken: string | null = null;
  loggedInUserRefreshToken: string | null = null;
  loggedInUserAccountStatus: string | null = null;
  loggedInUserSubscribed = false;

  authenticatedUserEmail: string | null = null;
  authenticatedUserFirstName: string | null = null;
  authenticatedUserLastName: string | null = null;
  authenticatedUserImage: string | null = null;
  authenticatedUserDevices: any = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    makePersistable(this, {
      name: "UserService",
      properties: [
        "loggedInUserAccessToken",
        "loggedInUserRefreshToken",
        "loggedInUserAccountStatus",
        "loggedInUserSubscribed",
        "authenticatedUserEmail",
        "authenticatedUserFirstName",
        "authenticatedUserLastName",
        "authenticatedUserImage",
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

  setLoggedInUserSubscribed(subscribed: boolean) {
    this.loggedInUserSubscribed = subscribed;
  }

  setAuthenticatedUserEmail(email: string) {
    this.authenticatedUserEmail = email;
  }

  setAuthenticatedUserFirstName(firstName: string) {
    this.authenticatedUserFirstName = firstName;
  }

  setAuthenticatedUserLastName(lastName: string) {
    this.authenticatedUserLastName = lastName;
  }

  setAuthenticatedUserImage(image: string) {
    this.authenticatedUserImage = image;
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

  getAuthenticatedUserFullName() {
    return `${this.authenticatedUserFirstName} ${this.authenticatedUserLastName}`;
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

  async userRequestPasswordReset(
    data: ParamsRequestPasswordResetApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.USER_REQUEST_PASSWORD_RESET,
      method: "POST",
      locale: data.locale,
      accessToken: false,
      refreshToken: false,
      body: data.body,
    });
  }

  async userVerifyPasswordReset(
    data: ParamsVerifyPasswordResetApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.USER_VERIFY_PASSWORD_RESET,
      method: "PUT",
      locale: data.locale,
      accessToken: false,
      refreshToken: false,
      body: data.body,
    });
  }

  async getAuthenticatedUser(): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.AUTHENTICATED_USER_URL,
      method: "GET",
      accessToken: true,
      refreshToken: true,
    });
  }

  async patchAuthenticatedUser(
    data: ParamsPatchAuthenticatedUserApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.AUTHENTICATED_USER_URL,
      method: "PATCH",
      locale: data.locale,
      accessToken: true,
      refreshToken: true,
      body: data.body,
    });
  }

  async deleteAuthenticatedUser(
    data: ParamsDeleteAuthenticatedUserApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.AUTHENTICATED_USER_URL,
      method: "DELETE",
      locale: data.locale,
      accessToken: true,
      refreshToken: true,
    });
  }

  async patchAuthenticatedUserSettings(
    data: ParamsPatchAuthenticatedUserSettingsApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.AUTHENTICATED_USER_SETTINGS_URL,
      method: "PATCH",
      locale: data.locale,
      accessToken: true,
      refreshToken: true,
      body: data.body,
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
    this.setLoggedInUserSubscribed(apiResponse.subscribed);
    this._redirectSuccessfullLogin(apiResponse.subscribed);
  }

  _handleSuccessfullAccessTokenLogin(
    apiResponse: any,
    redirect: boolean,
    message?: ReturnHandleResponse
  ) {
    if (message) {
      toastMessageService.addToast(
        new ToastMessage({
          id: Math.random(),
          title: message.title,
          message: message.message,
          status: message.status,
        })
      );
    }
    this.setLoggedInUserAccessToken(apiResponse.access_token);
    this.setLoggedInUserAccountStatus(apiResponse.account_status);
    this.setLoggedInUserSubscribed(apiResponse.subscribed);
    this.setAuthenticatedUserImage(apiResponse.image);

    if (redirect) {
      return this._redirectSuccessfullLogin(apiResponse.account_status);
    }
  }

  _redirectSuccessfullLogin(subscribed: boolean) {
    const localePath = useLocalePath();
    if (!subscribed) {
      return navigateTo({
        path: localePath("/platform/billing"),
      });
    }
    return navigateTo({
      path: localePath("/platform"),
    });
  }

  _handleAuthenticatedUserResponse(apiResponse: any) {
    this.setAuthenticatedUserEmail(apiResponse.email);
    this.setAuthenticatedUserFirstName(apiResponse.first_name);
    this.setAuthenticatedUserLastName(apiResponse.last_name);
    this.setAuthenticatedUserImage(apiResponse.image);
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
          to: "/auth/reset-email",
          themeId: 5,
          label: "Rerequest email verification",
        });
        return [buttons, "global.messages.registered"];
      case EAccountStatus.change_email:
        buttons.push({
          id: 1,
          to: "/auth/reset/email",
          themeId: 5,
          label: "Rerequest change email",
        });
        return [buttons, "global.messages.change_email_requested"];
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
