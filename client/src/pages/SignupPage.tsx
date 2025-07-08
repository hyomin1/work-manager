import { UserPlus } from 'lucide-react';
import AuthLayout from '../features/auth/components/AuthLayout';
import SignupForm from '../features/auth/components/SignupForm';

export default function SignupPage() {
  return (
    <AuthLayout
      title='회원가입'
      icon={<UserPlus className='h-8 w-8 text-white' />}
    >
      <SignupForm />
    </AuthLayout>
  );
}
