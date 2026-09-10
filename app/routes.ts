import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('routes/layouts/home-guard.tsx', [index('routes/home.tsx')]),

  layout('routes/layouts/protected.tsx', [
    route('profile/*', 'routes/profile.tsx'),
    route('settings', 'routes/settings.tsx'),
    route('contacts', 'routes/contacts.tsx'),
    route('create-group/*', 'routes/create-group.tsx'),
    route('change-email', 'routes/change-email.tsx'),
    route('change-password', 'routes/change-pass.tsx'),
    route('onboarding', 'routes/onboarding.tsx'),
  ]),

  layout('routes/layouts/guest.tsx', [
    route('login', 'routes/login.tsx'),
    route('register', 'routes/register.tsx'),
  ]),

  route('pass-recover', 'routes/pass-recover.tsx'),
  route('*', 'routes/404.tsx'),
] satisfies RouteConfig;
