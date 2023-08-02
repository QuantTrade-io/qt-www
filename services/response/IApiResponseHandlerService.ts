import type { FetchError } from "ofetch";
import {
  DataApiResponse,
  DataHandleSuccess,
  TypeHandleResponse,
} from "./TypesApiResponseHandler";

export interface IApiResponseHandlerService {
  handleResponse(data: DataApiResponse): TypeHandleResponse;
  handleUnhandled(): TypeHandleResponse;
  handleError(errorResponse: FetchError): TypeHandleResponse;
  handleSuccess(successResponse: DataHandleSuccess): TypeHandleResponse;
}
