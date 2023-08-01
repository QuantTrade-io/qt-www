import type { FetchError } from "ofetch";
import {
  ApiSuccessResponse,
  ReturnHandleResponse,
} from "./TypesApiResponseHandler";

export interface IApiResponseHandlerService {
  handleResponse(
    data: _AsyncData<unknown, FetchError<any> | null>
  ): ReturnHandleResponse;
  handleError(errorResponse: FetchError): ReturnHandleResponse;
  handleSuccess(successResponse: ApiSuccessResponse): ReturnHandleResponse;
}
