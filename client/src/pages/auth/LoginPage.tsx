import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { VALIDATION_MESSAGES } from '../../constants/message';
import { ROUTES } from '../../constants/constant';
import { KeyRound, User, Loader2 } from 'lucide-react';
import AuthLayout from './AuthLayout';
import FormInput from './components/AuthInput';
import AuthButton from './components/AuthButton';
import AuthCheckBox from './components/AuthCheckBox';
import useAuth from '../../hooks/useAuth';
import type { LoginFormData } from '../../types/auth';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>();

  const [cookies] = useCookies(['rememberUserId']);
  const [isRemember, setIsRemember] = useState(false);
  const navigate = useNavigate();

  const { loginMutation, redirectIfAuthenticated } = useAuth();

  const handleLogin = async (data: LoginFormData) => {
    const { userId, password } = data;
    loginMutation.mutate({ userId, password, isRemember });

    if (loginMutation.isSuccess) {
      reset();
    }
  };

  useEffect(() => {
    redirectIfAuthenticated();
    if (cookies.rememberUserId) {
      setValue('userId', cookies.rememberUserId);
      setIsRemember(true);
    }
  }, [redirectIfAuthenticated, cookies.rememberUserId, setValue]);

  return (
    <AuthLayout
      title='로그인'
      icon={<KeyRound className='h-8 w-8 text-white' />}
    >
      <form onSubmit={handleSubmit(handleLogin)} className='p-8'>
        <FormInput
          id='userId'
          label='아이디'
          placeholder='아이디를 입력해주세요'
          icon={<User className='h-5 w-5 text-gray-400' />}
          type='text'
          register={register('userId', {
            required: VALIDATION_MESSAGES.required.userId,
          })}
          error={errors.userId?.message}
          autoFocus
        />
        <FormInput
          id='password'
          label='패스워드'
          placeholder='패스워드를 입력해주세요'
          icon={<KeyRound className='h-5 w-5 text-gray-400' />}
          type='password'
          register={register('password', {
            required: VALIDATION_MESSAGES.required.password,
          })}
          error={errors.password?.message}
        />
        <AuthCheckBox
          id='remember'
          label='아이디 저장'
          checked={isRemember}
          onChange={setIsRemember}
        />

        <div className='flex flex-col gap-4 sm:flex-row'>
          <AuthButton
            type='submit'
            disabled={loginMutation.isPending}
            variant='primary'
          >
            {loginMutation.isPending ? (
              <Loader2 className='mx-auto h-5 w-5 animate-spin' />
            ) : (
              '로그인'
            )}
          </AuthButton>
          <AuthButton
            type='button'
            onClick={() => navigate(ROUTES.AUTH.REGISTER)}
            disabled={loginMutation.isPending}
            variant='secondary'
          >
            회원가입
          </AuthButton>
        </div>
      </form>
    </AuthLayout>
  );
}
