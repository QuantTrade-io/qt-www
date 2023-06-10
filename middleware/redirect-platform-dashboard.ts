export default defineNuxtRouteMiddleware((_, __) => {
  const localePath = useLocalePath();

  return navigateTo({
    path: localePath("/platform/dashboard"),
  });
});
