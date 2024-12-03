import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api";
import { VALIDATION_MESSAGES } from "../../constants/message";
import { ROUTES } from "../../constants/constant";

interface RegisterFormData {
  userId: string;
  password: string;
  passwordConfirm: string;
}
// 회원가입 화면 및 로직
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
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="mx-4 flex w-full max-w-md flex-col rounded-lg bg-white p-6 shadow-custom-shadow"
        noValidate
      >
        <h1 className="mb-6 text-2xl font-bold">회원가입</h1>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="userId">
              아이디
            </label>
            <input
              className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="아이디"
              id="userId"
              {...register("userId", {
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
              className="mb-2 block text-sm font-medium"
              htmlFor="password"
            >
              패스워드
            </label>
            <input
              id="password"
              type="password"
              placeholder="패스워드"
              className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
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
              className="mb-2 block text-sm font-medium"
              htmlFor="passwordConfirm"
            >
              패스워드 확인
            </label>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="패스워드 확인"
              className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("passwordConfirm", {
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

        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            className="flex-1 rounded bg-blue-500 px-8 py-3 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "처리중..." : "회원가입"}
          </button>
          <button
            onClick={() => navigate(ROUTES.AUTH.LOGIN)}
            type="button"
            className="flex-1 rounded bg-gray-300 px-8 py-3 transition-colors hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
