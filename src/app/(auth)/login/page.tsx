import type { Metadata } from 'next';
import LogInPageContent from './page-login';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login page',
};

const LoginPage = () => {
  return <LogInPageContent />;
};

export default LoginPage;
