import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api";
import { VALIDATION_MESSAGES } from "../../constants/message";
import { ROUTES } from "../../constants/constant";
import { UserPlus, KeyRound, User, Lock, Loader2 } from "lucide-react";

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

  const password = watch("password");

  const handleRegister = async (data: RegisterFormData) => {
    const res = await axiosReq.post("/auth/register", data);
    if (res.status !== 201) {
      return;
    }
    alert(res.data.message);
    reset();
    navigate(ROUTES.AUTH.LOGIN);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="animate-blob absolute -left-4 top-0 h-72 w-72 rounded-full bg-purple-300 opacity-20 mix-blend-multiply blur-xl filter" />
        <div className="animate-blob animation-delay-2000 absolute -right-4 top-0 h-72 w-72 rounded-full bg-blue-300 opacity-20 mix-blend-multiply blur-xl filter" />
        <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-pink-300 opacity-20 mix-blend-multiply blur-xl filter" />
      </div>

      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
            회원가입
          </h1>
        </div>

        {/* Register Form */}
        <div className="rounded-2xl bg-white/80 shadow-xl backdrop-blur-lg">
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="p-8"
            noValidate
          >
            {/* UserId Input */}
            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-medium text-gray-700"
                htmlFor="userId"
              >
                아이디
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="userId"
                  type="text"
                  {...register("userId", {
                    required: VALIDATION_MESSAGES.required.userId,
                  })}
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="아이디를 입력하세요"
                  autoFocus
                />
              </div>
              {errors.userId && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.userId.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                패스워드
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <KeyRound className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: VALIDATION_MESSAGES.required.password,
                  })}
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="패스워드를 입력하세요"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Password Confirm Input */}
            <div className="mb-8">
              <label
                className="mb-2 block text-sm font-medium text-gray-700"
                htmlFor="passwordConfirm"
              >
                패스워드 확인
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="passwordConfirm"
                  type="password"
                  {...register("passwordConfirm", {
                    required: VALIDATION_MESSAGES.required.passwordConfirm,
                    validate: (value) =>
                      value === password ||
                      VALIDATION_MESSAGES.validate.passwordMismatch,
                  })}
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="패스워드를 다시 입력하세요"
                />
              </div>
              {errors.passwordConfirm && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm font-medium text-white transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                ) : (
                  "회원가입"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(ROUTES.AUTH.LOGIN)}
                className="flex-1 rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
