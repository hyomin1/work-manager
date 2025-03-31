import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { VALIDATION_MESSAGES } from "../../constants/message";
import { ROUTES } from "../../constants/constant";
import { UserPlus, KeyRound, User, Loader2, Lock } from "lucide-react";
import AuthLayout from "./AuthLayout";
import FormInput from "./components/FormInput";
import AuthButton from "./components/AuthButton";
import { useAuth } from "../../hooks/useAuth";

interface RegisterFormData {
  userId: string;
  password: string;
  passwordConfirm: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const { registerMutation } = useAuth();

  const handleRegister = async (data: RegisterFormData) => {
    registerMutation.mutate(data);
    if (registerMutation.isSuccess) {
      reset();
    }
  };

  return (
    <AuthLayout
      title="회원가입"
      icon={<UserPlus className="h-8 w-8 text-white" />}
    >
      <form onSubmit={handleSubmit(handleRegister)} className="p-8" noValidate>
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
        />

        <FormInput
          id="passwordConfirm"
          label="패스워드 확인"
          placeholder="패스워드를 다시 입력해 주세요"
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          type="password"
          register={register("passwordConfirm", {
            required: VALIDATION_MESSAGES.required.passwordConfirm,
            validate: (value) =>
              value === password ||
              VALIDATION_MESSAGES.validate.passwordMismatch,
          })}
          error={errors.passwordConfirm?.message}
        />

        <div className="flex flex-col gap-4 sm:flex-row">
          <AuthButton type="submit" disabled={isSubmitting} variant="primary">
            {isSubmitting ? (
              <Loader2 className="mx-auto h-5 w-5 animate-spin" />
            ) : (
              "회원가입"
            )}
          </AuthButton>
          <AuthButton
            type="button"
            disabled={isSubmitting}
            variant="secondary"
            onClick={() => navigate(ROUTES.AUTH.LOGIN)}
          >
            취소
          </AuthButton>
        </div>
      </form>
    </AuthLayout>
  );
}
