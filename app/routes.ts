import { route } from '@react-router/dev/routes';

export default [
  route('/', './components/HomePage.tsx'),
  route('/register', './components/RegisterPage.tsx'),
  route('/passRecover', './components/PasswordRecoveryStage1.tsx'),
  route('/passRecover2', './components/PasswordRecoveryStage2.tsx'),
  route('/passRecover3', './components/PasswordRecoveryStage3.tsx'),
  route('/newPass', './components/NewPass.tsx'),
  route('/changePass', './components/ChangePass.tsx'),
  route('/login', './components/Login.tsx'),
  route('/emailChange1', './components/EmailChange1.tsx'),
  route('/emailChange2', './components/EmailChange2.tsx'),
  route('/settings', './components/Settings.tsx'),
  route('/contacts', './components/ContactsPage.tsx'),
  route('/myProfile/*', './components/MyProfile.tsx'),
  route('/onboarding', './components/Onboarding.tsx'),
  route('/creategroup/*', './components/CreateGroup.tsx'),
  route('/*', './components/404.tsx'),
];
