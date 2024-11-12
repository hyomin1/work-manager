import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { axiosReq } from "../../api";
import { VALIDATION_MESSAGES } from "../../constants/message";
import { ROUTES } from "../../constants/constant";

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
    if (res.status !== 201) {
      return;
    }
    if (isRemember) {
      setCookie("rememberUserId", data.userId, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
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
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="mx-4 flex w-full max-w-md flex-col rounded-lg bg-white p-6 shadow-custom-shadow"
      >
        <h1 className="mb-6 text-2xl font-bold">로그인</h1>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="userId">
              아이디
            </label>
            <input
              id="userId"
              placeholder="아이디"
              className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("userId", {
                required: VALIDATION_MESSAGES.required.userId,
              })}
              autoComplete="username"
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
              className="mb-2 block text-sm font-medium"
              htmlFor="password"
            >
              패스워드
            </label>
            <input
              placeholder="패스워드"
              type="password"
              className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: VALIDATION_MESSAGES.required.password,
              })}
            />
            {errors.password && (
              <p className="mt-1 text-sm font-bold text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="my-2 flex items-center">
          <input
            id="remember"
            checked={isRemember}
            onChange={(e) => setIsRemember(e.target.checked)}
            className="h-4 w-4"
            type="checkbox"
          />
          <label
            htmlFor="remember"
            className={`ml-1 text-sm ${
              isRemember ? "text-black" : "text-gray-400"
            }`}
          >
            아이디 저장
          </label>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            className="flex-1 rounded bg-blue-500 px-8 py-3 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            로그인
          </button>
          <button
            onClick={() => navigate(ROUTES.AUTH.REGISTER)}
            type="button"
            className="flex-1 rounded bg-gray-300 px-8 py-3 transition-colors hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
