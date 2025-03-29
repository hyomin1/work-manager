import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { axiosReq } from "../../api";
import { VALIDATION_MESSAGES } from "../../constants/message";
import { ROUTES } from "../../constants/constant";
import { KeyRound, User, Loader2 } from "lucide-react";
import AuthLayout from "./AuthLayout";
import FormInput from "./components/FormInput";
import AuthButton from "./components/AuthButton";
import AuthCheckBox from "./components/AuthCheckBox";

interface LoginFormData {
  userId: string;
  password: string;
}

export default function LoginPage() {
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
    <AuthLayout
      title="로그인"
      icon={<KeyRound className="h-8 w-8 text-white" />}
    >
      <form onSubmit={handleSubmit(handleLogin)} className="p-8">
        <FormInput
          id="userId"
          label="아이디"
          placeholder="아이디를 입력해주세요"
          icon={<User className="h-5 w-5 text-gray-400" />}
          type="text"
          register={register("userId", {
            required: VALIDATION_MESSAGES.required.userId,
          })}
          error={errors.userId?.message}
          autoFocus
        />
        <FormInput
          id="password"
          label="패스워드"
          placeholder="패스워드를 입력해주세요"
          icon={<KeyRound className="h-5 w-5 text-gray-400" />}
          type="password"
          register={register("password", {
            required: VALIDATION_MESSAGES.required.password,
          })}
          error={errors.password?.message}
          autoFocus
        />
        <AuthCheckBox
          id="remember"
          label="아이디 저장"
          checked={isRemember}
          onChange={setIsRemember}
        />

        <div className="flex flex-col gap-4 sm:flex-row">
          <AuthButton type="submit" disabled={isSubmitting} variant="primary">
            {isSubmitting ? (
              <Loader2 className="mx-auto h-5 w-5 animate-spin" />
            ) : (
              "로그인"
            )}
          </AuthButton>
          <AuthButton
            type="button"
            onClick={() => navigate(ROUTES.AUTH.REGISTER)}
            disabled={isSubmitting}
            variant="secondary"
          >
            회원가입
          </AuthButton>
        </div>
      </form>
    </AuthLayout>
  );
}
