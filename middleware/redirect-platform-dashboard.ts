import { userService } from "~/services/user/UserService";

export default defineNuxtRouteMiddleware(async (_, __) => {
  const localePath = useLocalePath();

  const response = await userService.getAuthenticatedUser();
  userService._handleAuthenticatedUserResponse(response.data.value);

  return navigateTo({
    path: localePath("/platform/dashboard"),
  });
});
