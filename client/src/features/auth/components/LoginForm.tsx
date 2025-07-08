import { KeyRound, Loader2, User } from 'lucide-react';
import AuthInput from './AuthInput';
import AuthCheckBox from './AuthCheckBox';
import AuthButton from './AuthButton';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../../../constants/constant';
import type { LoginInput } from '../types/auth';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { VALIDATION_MESSAGES } from '../constants/auth';
export default function LoginForm() {
  const [isRemember, setIsRemember] = useState(false);
  const [cookies] = useCookies(['rememberUserId']);

  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    handleSubmit,
    setValue,
    reset,
    register,
    formState: { errors },
  } = useForm<LoginInput>();

  const handleLogin = async (data: LoginInput) => {
    const { userId, password } = data;
    login.mutate(
      { userId, password, isRemember },
      {
        onSuccess: () => reset(),
      }
    );
  };

  useEffect(() => {
    if (cookies.rememberUserId) {
      setValue('userId', cookies.rememberUserId);
      setIsRemember(true);
    }
  }, [cookies.rememberUserId, setValue]);

  return (
    <form onSubmit={handleSubmit(handleLogin)} className='p-8'>
      <AuthInput
        name='userId'
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
      <AuthInput
        name='password'
        label='패스워드'
        placeholder='패스워드를 입력해주세요'
        icon={<KeyRound className='h-5 w-5 text-gray-400' />}
        type='password'
        register={register('password', {
          required: VALIDATION_MESSAGES.required.userId,
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
        <AuthButton type='submit' disabled={login.isPending} variant='primary'>
          {login.isPending ? (
            <Loader2 className='mx-auto h-5 w-5 animate-spin' />
          ) : (
            '로그인'
          )}
        </AuthButton>
        <AuthButton
          type='button'
          onClick={() => navigate(ROUTES.AUTH.SIGNUP)}
          disabled={login.isPending}
          variant='secondary'
        >
          회원가입
        </AuthButton>
      </div>
    </form>
  );
}
