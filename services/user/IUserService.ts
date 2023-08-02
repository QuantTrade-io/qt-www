import {
  ReturnHandleResponse,
  TypePromiseApiResponse,
} from "../response/TypesApiResponseHandler";
import {
  ApiResponseAuthenticatedUser,
  ApiResponseSuccessfullLogin,
  ApiResponseSuccessfullRefreshTokenLogin,
  ParamsDeleteAuthenticatedUserApi,
  ParamsPatchAuthenticatedUserApi,
  ParamsPatchAuthenticatedUserSettingsApi,
  ParamsRequestEmailResetApi,
  ParamsRequestEmailVerifyApi,
  ParamsRequestPasswordResetApi,
  ParamsUserLoginApi,
  ParamsUserLogoutApi,
  ParamsUserRegisterApi,
  ParamsUserVerifyEmailApi,
  ParamsVerifyEmailResetApi,
  ParamsVerifyPasswordResetApi,
  UserTokens,
} from "./TypesUserService";
import { DataButtonInfo } from "~/models/response/DataModalMessage";

export interface IUserService {
  loggedInUserAccessToken: string | null;
  loggedInUserRefreshToken: string | null;
  loggedInUserAccountStatus: string | null;
  loggedInUserSubscribed: boolean;

  authenticatedUserEmail: string | null;
  authenticatedUserFirstName: string | null;
  authenticatedUserLastName: string | null;
  authenticatedUserImage: string | null;

  isHydrated: boolean;

  setLoggedInUserTokens(token: UserTokens): void;
  setLoggedInUserAccessToken(accessToken: string): void;
  setLoggedInUserAccountStatus(accountStatus: string): void;
  setLoggedInUserSubscribed(subscribed: boolean): void;
  setAuthenticatedUserEmail(email: string): void;
  setAuthenticatedUserFirstName(firstName: string): void;
  setAuthenticatedUserLastName(lastName: string): void;
  setAuthenticatedUserImage(image: string): void;

  hasLoggedInUserRefreshToken(): boolean;
  hasLoggedInUserAccessToken(): boolean;
  hasLoggedInUserAccountStatus(): boolean;
  getAuthenticatedUserFullName(): string;

  userRegister(data: ParamsUserRegisterApi): TypePromiseApiResponse;
  userVerifyEmail(data: ParamsUserVerifyEmailApi): TypePromiseApiResponse;
  userLogin(data: ParamsUserLoginApi): TypePromiseApiResponse;
  userLoginRefreshToken(): TypePromiseApiResponse;
  userLogout(data: ParamsUserLogoutApi): TypePromiseApiResponse;
  userRequestPasswordReset(
    data: ParamsRequestPasswordResetApi
  ): TypePromiseApiResponse;
  userVerifyPasswordReset(
    data: ParamsVerifyPasswordResetApi
  ): TypePromiseApiResponse;
  userRequestEmailReset(
    data: ParamsRequestEmailResetApi
  ): TypePromiseApiResponse;
  userVerifyEmailReset(data: ParamsVerifyEmailResetApi): TypePromiseApiResponse;
  userRequestEmailVerify(
    data: ParamsRequestEmailVerifyApi
  ): TypePromiseApiResponse;
  getAuthenticatedUser(): TypePromiseApiResponse;
  patchAuthenticatedUser(
    data: ParamsPatchAuthenticatedUserApi
  ): TypePromiseApiResponse;
  deleteAuthenticatedUser(
    data: ParamsDeleteAuthenticatedUserApi
  ): TypePromiseApiResponse;
  patchAuthenticatedUserSettings(
    data: ParamsPatchAuthenticatedUserSettingsApi
  ): TypePromiseApiResponse;

  _handleSuccessfullLogin(
    apiResponse: ApiResponseSuccessfullLogin,
    message: ReturnHandleResponse
  ): void;
  _handleSuccessfullRefreshTokenLogin(
    apiResponse: ApiResponseSuccessfullRefreshTokenLogin,
    redirect: boolean,
    message?: ReturnHandleResponse
  ): RouteLocationRaw | Promise<void | NavigationFailure> | undefined;
  _redirectSuccessfullLogin(
    subscribed: boolean
  ): RouteLocationRaw | Promise<void | NavigationFailure>;
  _handleAuthenticatedUserResponse(
    apiResponse: ApiResponseAuthenticatedUser
  ): void;
  _handleUnsuccessfullLogin(responseMessage: ReturnHandleResponse): void;
  _errorResponseMessages(accountStatus: string): [DataButtonInfo[], string?];
}
