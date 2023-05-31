import { ParamsBaseApi } from "../base/TypesBaseService";

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
