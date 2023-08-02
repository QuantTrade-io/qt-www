import {
  DataHandleResponse,
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

  userRegister(params: ParamsUserRegisterApi): TypePromiseApiResponse;
  userVerifyEmail(params: ParamsUserVerifyEmailApi): TypePromiseApiResponse;
  userLogin(params: ParamsUserLoginApi): TypePromiseApiResponse;
  userLoginRefreshToken(): TypePromiseApiResponse;
  userLogout(params: ParamsUserLogoutApi): TypePromiseApiResponse;
  userRequestPasswordReset(
    params: ParamsRequestPasswordResetApi
  ): TypePromiseApiResponse;
  userVerifyPasswordReset(
    params: ParamsVerifyPasswordResetApi
  ): TypePromiseApiResponse;
  userRequestEmailReset(
    params: ParamsRequestEmailResetApi
  ): TypePromiseApiResponse;
  userVerifyEmailReset(
    params: ParamsVerifyEmailResetApi
  ): TypePromiseApiResponse;
  userRequestEmailVerify(
    params: ParamsRequestEmailVerifyApi
  ): TypePromiseApiResponse;
  getAuthenticatedUser(): TypePromiseApiResponse;
  patchAuthenticatedUser(
    params: ParamsPatchAuthenticatedUserApi
  ): TypePromiseApiResponse;
  deleteAuthenticatedUser(
    params: ParamsDeleteAuthenticatedUserApi
  ): TypePromiseApiResponse;
  patchAuthenticatedUserSettings(
    params: ParamsPatchAuthenticatedUserSettingsApi
  ): TypePromiseApiResponse;

  _handleSuccessfullLogin(
    apiResponse: ApiResponseSuccessfullLogin,
    message: DataHandleResponse
  ): void;
  _handleSuccessfullRefreshTokenLogin(
    apiResponse: ApiResponseSuccessfullRefreshTokenLogin,
    redirect: boolean,
    message?: DataHandleResponse
  ): RouteLocationRaw | Promise<void | NavigationFailure> | undefined;
  _redirectSuccessfullLogin(
    subscribed: boolean
  ): RouteLocationRaw | Promise<void | NavigationFailure>;
  _handleAuthenticatedUserResponse(
    apiResponse: ApiResponseAuthenticatedUser
  ): void;
  _handleUnsuccessfullLogin(responseMessage: DataHandleResponse): void;
  _errorResponseMessages(accountStatus: string): [DataButtonInfo[], string?];
}
