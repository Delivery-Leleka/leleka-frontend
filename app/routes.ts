import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),

  route("pass-recover", "routes/pass-recover.tsx"),

  route("profile/*", "routes/profile.tsx"),
  route("settings", "routes/settings.tsx"),
  route("contacts", "routes/contacts.tsx"),
  route("create-group/*", "routes/create-group.tsx"),
  route("onboarding", "routes/onboarding.tsx"),

  route("*", "routes/404.tsx"),
] satisfies RouteConfig;