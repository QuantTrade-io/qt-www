import { ParamsBaseApi } from "../base/TypesBaseService";

// PARAMETER INPUT PART
export interface ParamsUserRegisterApi extends ParamsBaseApi {
  body: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    are_guidelines_accepted: boolean;
  };
}

export interface ParamsUserVerifyEmailApi extends ParamsBaseApi {
  body: {
    token: string;
  };
}

export interface ParamsUserLoginApi extends ParamsBaseApi {
  body: {
    email: string;
    password: string;
  };
}

export interface ParamsUserLogoutApi extends ParamsBaseApi {}

export interface ParamsRequestPasswordResetApi extends ParamsBaseApi {
  body: {
    email: string;
  };
}

export interface ParamsRequestEmailResetApi extends ParamsBaseApi {}

export interface ParamsRequestEmailVerifyApi extends ParamsBaseApi {
  body: {
    email: string;
  };
}

export interface ParamsVerifyEmailResetApi extends ParamsBaseApi {
  body: {
    token: string;
    email_old: string;
    email_new: string;
  };
}

export interface ParamsVerifyPasswordResetApi extends ParamsBaseApi {
  body: {
    token: string;
    password: string;
  };
}

export interface ParamsPatchAuthenticatedUserSettingsApi extends ParamsBaseApi {
  body: {
    password_old: string;
    password_new: string;
  };
}

export interface ParamsPatchAuthenticatedUserApi extends ParamsBaseApi {
  // Since this request could contain an image
  body: FormData;
}

export interface ParamsDeleteAuthenticatedUserApi extends ParamsBaseApi {}

// API RESPONSE PART
export interface UserTokens {
  access: string | null;
  refresh: string | null;
}

export interface ApiResponseSuccessfullLogin {
  token: UserTokens;
  account_status: string;
  subscribed: boolean;
}

export interface ApiResponseSuccessfullRefreshTokenLogin {
  access_token: string;
  account_status: string;
  subscribed: boolean;
  image: string;
}

export interface ApiResponseAuthenticatedUser {
  email: string;
  first_name: string;
  last_name: string;
  image: string;
}
