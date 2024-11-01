import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { axiosReq } from '../../api';
import { VALIDATION_MESSAGES } from '../../constants/message';
import { ROUTES } from '../../constants/constant';

interface RegisterFormData {
  userId: string;
  password: string;
  passwordConfirm: string;
}

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const handleRegister = async (data: RegisterFormData) => {
    const res = await axiosReq.post('/auth/register', data);
    if (res.status !== 201) {
      return;
    }
    alert(res.data.message);
    reset();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-indigo-50 to-slate-100">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-custom-shadow"
        noValidate
      >
        <h1 className="mb-6 text-2xl font-bold">회원가입</h1>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="userId">
              아이디
            </label>
            <input
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="아이디"
              id="userId"
              {...register('userId', {
                required: VALIDATION_MESSAGES.required.userId,
              })}
              autoFocus
            />
            {errors.userId && (
              <p className="mt-1 text-sm font-bold text-red-500" role="alert">
                {errors.userId.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-medium"
              htmlFor="password"
            >
              패스워드
            </label>
            <input
              id="password"
              type="password"
              placeholder="패스워드"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('password', {
                required: VALIDATION_MESSAGES.required.password,
              })}
            />
            {errors.password && (
              <span
                className="mb-1 text-sm font-bold text-red-500"
                role="alert"
              >
                {errors.password.message}
              </span>
            )}
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium"
              htmlFor="passwordConfirm"
            >
              패스워드 확인
            </label>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="패스워드 확인"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('passwordConfirm', {
                required: VALIDATION_MESSAGES.required.passwordConfirm,
                validate: (value) =>
                  value === password ||
                  VALIDATION_MESSAGES.validate.passwordMismatch,
              })}
            />
            {errors.passwordConfirm && (
              <p className="mt-1 text-sm font-bold text-red-500" role="alert">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="flex-1 px-8 py-3 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '처리중...' : '회원가입'}
          </button>
          <button
            onClick={() => navigate(ROUTES.LOGIN)}
            type="button"
            className="flex-1 px-8 py-3 transition-colors bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
