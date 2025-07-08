import { UserPlus } from 'lucide-react';
import AuthLayout from './components/AuthLayout';
import SignupForm from './components/SignupForm';

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
