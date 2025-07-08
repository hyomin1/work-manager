import { KeyRound } from 'lucide-react';
import AuthLayout from './components/AuthLayout';

import LoginForm from './components/LoginForm';
import useAuth from './hooks/useAuth';
import { useEffect } from 'react';

export default function LoginPage() {
  const { redirectIfAuthenticated } = useAuth();
  useEffect(() => {
    // 세션 확인 후 리다이렉트 (세션 유지 기간동안은 로그인 과정 x)
    redirectIfAuthenticated();
  }, [redirectIfAuthenticated]);
  return (
    <AuthLayout
      title='로그인'
      icon={<KeyRound className='h-8 w-8 text-white' />}
    >
      <LoginForm />
    </AuthLayout>
  );
}
