import type { FetchError } from "ofetch";
import { EApiResponseStatus } from "./EApiResponseHandler";

// DATA: object creation
export type DataApiResponse = _AsyncData<unknown, FetchError<any> | null>;

export interface DataHandleSuccess {
  message: string;
  status: number;
}

export interface DataHandleResponse {
  title: string;
  message: string;
  status: EApiResponseStatus;
  isUnhandled: boolean;
  isSuccess: boolean;
}

// TYPE: Return type
export type TypePromiseApiResponse = Promise<
  _AsyncData<unknown, FetchError<any> | null>
>;

export interface TypeHandleResponse {
  title: string;
  message: string;
  status: EApiResponseStatus;
  isUnhandled: boolean;
  isSuccess: boolean;
}
