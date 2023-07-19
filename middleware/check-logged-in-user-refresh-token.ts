import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";
import { userService } from "~/services/user/UserService";

export default defineNuxtRouteMiddleware(async (_, __) => {
  if (userService.hasLoggedInUserRefreshToken()) {
    const response = await userService.userLoginRefreshToken();
    const message = apiResponseHandlerService.handleResponse(response);

    // Unable to login
    if (message.status !== EApiResponseStatus.success) {
      userService._handleUnsuccessfullLogin(message);
      return;
    }
    // Login successfully
    return userService._handleSuccessfullAccessTokenLogin(
      response.data.value,
      true,
      message,
    );
  }
});
