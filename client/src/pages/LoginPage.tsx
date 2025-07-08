import { KeyRound } from 'lucide-react';
import AuthLayout from '../features/auth/components/AuthLayout';

import LoginForm from '../features/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout
      title='로그인'
      icon={<KeyRound className='h-8 w-8 text-white' />}
    >
      <LoginForm />
    </AuthLayout>
  );
}
