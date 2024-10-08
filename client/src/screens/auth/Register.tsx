import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axios";

interface IRegister {
  userId: string;
  password: string;
  passwordConfirm: string;
}

function Login() {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate("/");
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IRegister>();

  const password = watch("password");

  const onRegister = async (data: IRegister) => {
    const res = await axiosApi.post("/auth/register", data);
    if (res.status !== 201) {
      return;
    }
    alert(res.data.message);
    setValue("userId", "");
    setValue("password", "");
    setValue("passwordConfirm", "");
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-custom-gradient">
      <form
        onSubmit={handleSubmit(onRegister)}
        className="flex flex-col sm:w-[80%] w-[30%]  p-6 bg-white rounded-lg shadow-custom-shadow"
      >
        <span className="font-bold text-2xl mb-4">회원가입</span>
        <label className="mb-2 text-sm" htmlFor="userId">
          아이디
        </label>
        <input
          className="p-3 border rounded mb-4"
          placeholder="아이디"
          id="userId"
          {...register("userId", { required: true })}
          autoFocus
        />
        {errors.userId && (
          <span className="text-center text-[red] font-bold text-md">
            아이디를 입력해주세요
          </span>
        )}
        <label className="mb-2 text-sm" htmlFor="password">
          패스워드
        </label>
        <input
          id="password"
          type="password"
          placeholder="패스워드"
          className="p-3 border rounded mb-4"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-center text-[red] font-bold text-md">
            패스워드를 입력해주세요
          </span>
        )}
        <label className="mb-2 text-sm" htmlFor="passwordConfirm">
          패스워드 확인
        </label>
        <input
          id="passwordConfirm"
          type="password"
          placeholder="패스워드 확인"
          className=" p-3 border rounded mb-4"
          {...register("passwordConfirm", {
            required: true,
            validate: (value) => value === password,
          })}
        />
        {errors.passwordConfirm && (
          <span className="text-center text-[red] font-bold text-md">
            {errors.passwordConfirm.type === "required" &&
              "패스워드를 한번 더 입력해주세요"}
            {errors.passwordConfirm.type === "validate" &&
              "패스워드가 일치 하지 않습니다."}
          </span>
        )}

        <div className="flex justify-between mt-8 mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-8 py-3 rounded hover:opacity-80"
          >
            회원가입
          </button>
          <button
            onClick={onCancel}
            type="button"
            className="bg-gray-300 px-8 py-3 rounded hover:opacity-80"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
