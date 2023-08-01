import type { FetchError } from "ofetch";
import { EApiResponseStatus } from "./EApiResponseHandler";

export type TypeApiResponse = _AsyncData<unknown, FetchError<any> | null>;

export type TypePromiseApiResponse = Promise<
  _AsyncData<unknown, FetchError<any> | null>
>;

export interface ReturnHandleResponse {
  title: string;
  message: string;
  status: EApiResponseStatus;
  isUnhandled: boolean;
  isSuccess: boolean;
}

export interface ApiSuccessResponse {
  message: string;
  status: number;
}
