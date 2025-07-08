import { FormProvider, useForm } from 'react-hook-form';
import type { SignupInput } from '../types/auth';
import AuthInput from './AuthInput';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Loader2, Lock, User } from 'lucide-react';
import { VALIDATION_MESSAGES } from '../constants/auth';
import AuthButton from './AuthButton';
import { ROUTES } from '../../../constants/constant';

export default function SignupForm() {
  const navigate = useNavigate();

  const methods = useForm<SignupInput>();
  const {
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm<SignupInput>();

  const password = watch('password');

  const { signup } = useAuth();
  const handleRegister = async (data: SignupInput) => {
    signup.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleRegister)} className='p-8' noValidate>
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
            required: VALIDATION_MESSAGES.required.password,
          })}
          error={errors.password?.message}
        />

        <AuthInput
          name='passwordConfirm'
          label='패스워드 확인'
          placeholder='패스워드를 다시 입력해 주세요'
          icon={<Lock className='h-5 w-5 text-gray-400' />}
          type='password'
          register={register('passwordConfirm', {
            required: VALIDATION_MESSAGES.required.passwordConfirm,
            validate: (value) =>
              value === password ||
              VALIDATION_MESSAGES.validate.passwordMismatch,
          })}
          error={errors.passwordConfirm?.message}
        />

        <div className='flex flex-col gap-4 sm:flex-row'>
          <AuthButton
            type='submit'
            disabled={signup.isPending}
            variant='primary'
          >
            {signup.isPending ? (
              <Loader2 className='mx-auto h-5 w-5 animate-spin' />
            ) : (
              '회원가입'
            )}
          </AuthButton>
          <AuthButton
            type='button'
            disabled={signup.isPending}
            variant='secondary'
            onClick={() => navigate(ROUTES.AUTH.LOGIN)}
          >
            취소
          </AuthButton>
        </div>
      </form>
    </FormProvider>
  );
}
