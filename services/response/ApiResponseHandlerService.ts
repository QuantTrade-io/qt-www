import type { FetchError } from "ofetch";
import { IApiResponseHandlerService } from "./IApiResponseHandlerService";
import {
  ApiSuccessResponse,
  ReturnHandleResponse,
  TypeApiResponse,
} from "./TypesApiResponseHandler";
import { EApiResponseStatus } from "./EApiResponseHandler";

class ApiResponseHandlerService implements IApiResponseHandlerService {
  /**
   * Class that holds all logic regarding the API responses and handling messages towards the user.
   *
   * @remarks
   * This class is a so-called 'service', which (in this case), holds all the logic regarding handling API responses from the server.
   * The ApiResponseHandlingService implements the IApiResponseHandlingService
   *
   */
  handleResponse(data: TypeApiResponse): ReturnHandleResponse {
    if (data.error.value) {
      return this.handleError(data.error.value);
    }
    if (data.data.value) {
      return this.handleSuccess(data.data.value);
    }
    return this.handleUnhandled();
  }

  handleUnhandled() {
    return {
      title: "global.messages.unhandled_response",
      message: "global.messages.unhandled_error",
      status: EApiResponseStatus.info,
      isUnhandled: true,
      isSuccess: false,
    };
  }

  handleError(errorResponse: FetchError): ReturnHandleResponse {
    const title = "global.messages.something_went_wrong";
    let message;
    let isUnhandled = false;
    const isSuccess = false;

    if (errorResponse.data) {
      // Http response outside the 2xx range
      const responseBody = errorResponse.data;
      if (responseBody) {
        const responseBodyIsArray = responseBody.constructor === Array;
        if (responseBodyIsArray) {
          message = responseBody[0];
        } else if (
          typeof responseBody === "string" ||
          responseBody instanceof String
        ) {
          message = responseBody;
        } else {
          const responseBodyFirstKey = Object.keys(responseBody)[0];
          const responseBodyFirstKeyValue = responseBody[responseBodyFirstKey];
          const responseBodyFirstKeyValueIsArray =
            responseBodyFirstKeyValue.constructor === Array;

          if (responseBodyFirstKeyValueIsArray) {
            message = responseBodyFirstKeyValue[0];
          } else {
            message = responseBodyFirstKeyValue;
          }
        }
      }

      if (!message) {
        // Default to status codes
        const status = errorResponse.status;

        if (status === 400) {
          message = "global.messages.status_400";
        } else if (status === 403) {
          message = "global.messages.status_403";
        } else if (status === 404) {
          message = "global.messages.status_404";
        } else if (status === 420) {
          message = "global.messages.status_420";
        }
      }
    }

    if (!message) {
      isUnhandled = true;
      message = errorResponse.message;
    }

    if (!message) {
      message = "global.messages.unhandled_error";
    }

    return {
      title,
      message,
      status: EApiResponseStatus.error,
      isUnhandled,
      isSuccess,
    };
  }

  handleSuccess(successResponse: ApiSuccessResponse): ReturnHandleResponse {
    const title = "global.messages.success";
    let message;
    let isUnhandled = false;
    const isSuccess = true;

    if (successResponse.message) {
      message = successResponse.message;
    }

    if (!message) {
      // Default to status codes
      const status = successResponse.status;

      if (status === 200) {
        message = "global.messages.status_200";
      } else if (status === 201) {
        message = "global.messages.status_201";
      } else if (status === 202) {
        message = "global.messages.status_202";
      }
    }

    if (!message) {
      isUnhandled = true;
      message = "global.messages.unhandled_response";
    }

    return {
      title,
      message,
      status: EApiResponseStatus.success,
      isUnhandled,
      isSuccess,
    };
  }
}

export const apiResponseHandlerService = new ApiResponseHandlerService();
