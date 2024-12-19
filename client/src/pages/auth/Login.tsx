import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { axiosReq } from "../../api";
import { VALIDATION_MESSAGES } from "../../constants/message";
import { ROUTES } from "../../constants/constant";
import { KeyRound, User, Loader2 } from "lucide-react";

interface LoginFormData {
  userId: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const [cookies, setCookie, removeCookie] = useCookies(["rememberUserId"]);
  const [isRemember, setIsRemember] = useState(false);
  const navigate = useNavigate();

  const clearInput = () => {
    setValue("userId", "");
    setValue("password", "");
  };

  const handleLogin = async (data: LoginFormData) => {
    const res = await axiosReq.post("/auth/login", data);
    if (res.status !== 200) return;

    if (isRemember) {
      setCookie("rememberUserId", data.userId, {
        path: "/",
        maxAge: 365 * 24 * 60 * 60,
      });
    } else {
      removeCookie("rememberUserId");
    }

    navigate(ROUTES.DASHBOARD);
    clearInput();
  };

  const checkSession = useCallback(async () => {
    const response = await axiosReq.get("/auth/checkSession");
    if (response.status === 200) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [navigate]);

  useEffect(() => {
    checkSession();
    if (cookies.rememberUserId) {
      setValue("userId", cookies.rememberUserId);
      setIsRemember(true);
    }
  }, [checkSession, cookies.rememberUserId, setValue]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="fixed inset-0 -z-10">
        <div className="animate-blob absolute -left-4 top-0 h-72 w-72 rounded-full bg-purple-300 opacity-20 mix-blend-multiply blur-xl filter" />
        <div className="animate-blob animation-delay-2000 absolute -right-4 top-0 h-72 w-72 rounded-full bg-blue-300 opacity-20 mix-blend-multiply blur-xl filter" />
        <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-pink-300 opacity-20 mix-blend-multiply blur-xl filter" />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500">
            <KeyRound className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
            로그인
          </h1>
        </div>

        <div className="rounded-2xl bg-white/80 shadow-xl backdrop-blur-lg">
          <form onSubmit={handleSubmit(handleLogin)} className="p-8">
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
                  autoComplete="username"
                  autoFocus
                />
              </div>
              {errors.userId && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.userId.message}
                </p>
              )}
            </div>

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

            <div className="mb-6 flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={isRemember}
                onChange={(e) => setIsRemember(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                아이디 저장
              </label>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm font-medium text-white transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                ) : (
                  "로그인"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(ROUTES.AUTH.REGISTER)}
                disabled={isSubmitting}
                className="flex-1 rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
