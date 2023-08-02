import makeAutoObservable from "mobx-store-inheritance";
import {
  clearPersistedStore,
  isHydrated,
  makePersistable,
} from "mobx-persist-store";
import {
  DataHandleResponse,
  TypePromiseApiResponse,
} from "../response/TypesApiResponseHandler";
import { EApiResponseStatus } from "../response/EApiResponseHandler";
import { modalMessageService } from "../response/ModalMessageService";
import { toastMessageService } from "../response/ToastMessageService";
import { BaseService } from "../base/BaseService";
import {
  ParamsUserLoginApi,
  ParamsUserLogoutApi,
  ParamsUserRegisterApi,
  ParamsUserVerifyEmailApi,
  ParamsPatchAuthenticatedUserApi,
  ParamsRequestPasswordResetApi,
  ParamsRequestEmailResetApi,
  ParamsRequestEmailVerifyApi,
  ParamsDeleteAuthenticatedUserApi,
  ParamsPatchAuthenticatedUserSettingsApi,
  ParamsVerifyPasswordResetApi,
  ParamsVerifyEmailResetApi,
  UserTokens,
  ApiResponseSuccessfullLogin,
  ApiResponseSuccessfullRefreshTokenLogin,
  ApiResponseAuthenticatedUser,
} from "./TypesUserService";
import { EAccountStatus } from "./EUserService";
import { IUserService } from "./IUserService";
import { ModalMessage } from "~/models/response/ModalMessage";
import { ToastMessage } from "~/models/response/ToastMessage";
import { DataButtonInfo } from "~/models/response/DataModalMessage";

class UserService extends BaseService implements IUserService {
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
  static USER_LOGOUT_URL = `/v1/auth/user-logout/`;
  static USER_VERIFY_EMAIL_URL = `/v1/auth/user-register/verify-email/`;
  static USER_REQUEST_EMAIL_VERIFY = `/v1/auth/user-register/request-verify-email/`;
  static USER_LOGIN_REFRESH_TOKEN_URL = `/v1/auth/refresh-token/`;
  static USER_REQUEST_PASSWORD_RESET = `/v1/auth/reset/password/`;
  static USER_VERIFY_PASSWORD_RESET = `/v1/auth/verify/reset-password/`;
  static USER_REQUEST_EMAIL_RESET = `/v1/auth/reset/email/`;
  static USER_VERIFY_EMAIL_RESET = `/v1/auth/verify/reset-email/`;

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

  constructor() {
    super();
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

  setLoggedInUserTokens(token: UserTokens) {
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

  async userRegister(params: ParamsUserRegisterApi): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.USER_REGISTER_URL,
      method: "POST",
      locale: params.locale,
      body: params.body,
    });
  }

  async userVerifyEmail(
    params: ParamsUserVerifyEmailApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.USER_VERIFY_EMAIL_URL,
      method: "POST",
      locale: params.locale,
      body: params.body,
    });
  }

  async userLogin(params: ParamsUserLoginApi): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.USER_LOGIN_URL,
      method: "POST",
      locale: params.locale,
      body: params.body,
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

  async userLogout(params: ParamsUserLogoutApi): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    // logout server side
    const response = await fetch.request({
      url: UserService.USER_LOGOUT_URL,
      method: "POST",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
      body: {
        refresh_token: this.loggedInUserRefreshToken,
      },
    });

    // logout client side
    await this.clearStoredData();

    return response;
  }

  async userRequestPasswordReset(
    params: ParamsRequestPasswordResetApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.USER_REQUEST_PASSWORD_RESET,
      method: "POST",
      locale: params.locale,
      accessToken: false,
      refreshToken: false,
      body: params.body,
    });
  }

  async userVerifyPasswordReset(
    params: ParamsVerifyPasswordResetApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.USER_VERIFY_PASSWORD_RESET,
      method: "PUT",
      locale: params.locale,
      accessToken: false,
      refreshToken: false,
      body: params.body,
    });
  }

  async userRequestEmailReset(
    params: ParamsRequestEmailResetApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.USER_REQUEST_EMAIL_RESET,
      method: "POST",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
    });
  }

  async userVerifyEmailReset(
    params: ParamsVerifyEmailResetApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.USER_VERIFY_EMAIL_RESET,
      method: "PUT",
      locale: params.locale,
      accessToken: false,
      refreshToken: false,
      body: params.body,
    });
  }

  async userRequestEmailVerify(
    params: ParamsRequestEmailVerifyApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.USER_REQUEST_EMAIL_VERIFY,
      method: "POST",
      locale: params.locale,
      accessToken: false,
      refreshToken: false,
      body: params.body,
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
    params: ParamsPatchAuthenticatedUserApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.AUTHENTICATED_USER_URL,
      method: "PATCH",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
      body: params.body,
    });
  }

  async deleteAuthenticatedUser(
    params: ParamsDeleteAuthenticatedUserApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.AUTHENTICATED_USER_URL,
      method: "DELETE",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
    });
  }

  async patchAuthenticatedUserSettings(
    params: ParamsPatchAuthenticatedUserSettingsApi
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: UserService.AUTHENTICATED_USER_SETTINGS_URL,
      method: "PATCH",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
      body: params.body,
    });
  }

  _handleSuccessfullLogin(
    apiResponse: ApiResponseSuccessfullLogin,
    message: DataHandleResponse
  ) {
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

  _handleSuccessfullRefreshTokenLogin(
    apiResponse: ApiResponseSuccessfullRefreshTokenLogin,
    redirect: boolean,
    message?: DataHandleResponse
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
      return this._redirectSuccessfullLogin(apiResponse.subscribed);
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

  _handleAuthenticatedUserResponse(apiResponse: ApiResponseAuthenticatedUser) {
    this.setAuthenticatedUserEmail(apiResponse.email);
    this.setAuthenticatedUserFirstName(apiResponse.first_name);
    this.setAuthenticatedUserLastName(apiResponse.last_name);
    this.setAuthenticatedUserImage(apiResponse.image);
  }

  _handleUnsuccessfullLogin(responseMessage: DataHandleResponse) {
    this.clearStoredData();

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
              to: "/auth/login",
              themeId: 7,
              label: "Login",
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

  async clearStoredData() {
    await clearPersistedStore(this);
  }
}

export const userService = new UserService();
