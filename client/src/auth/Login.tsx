import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosApi from "../axios";

interface ILogin {
  userId: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ILogin>();

  const navigate = useNavigate();

  const onLogin = async (data: ILogin) => {
    const res = await axiosApi.post("/auth/login", data);
    if (res.status !== 201) {
      return;
    }
    navigate("/select");
    setValue("userId", "");
    setValue("password", "");
  };
  const onRegister = () => {
    navigate("/register");
  };

  const checkSession = async () => {
    const res = await axiosApi.get("/auth/checkSession");
    // 세션 존재 시 바로 메인 화면
    if (res.status === 200) {
      navigate("/select");
    }
  };
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(onLogin)}
        className="flex flex-col sm:w-[80%] w-[30%] p-6 bg-white rounded-lg shadow-lg"
      >
        <span className="font-bold text-2xl mb-4">로그인</span>
        <label className="mb-2" htmlFor="userId">
          아이디
        </label>
        <input
          id="userId"
          placeholder="아이디"
          className="mb-4 p-3 border rounded"
          {...register("userId", { required: true })}
          autoFocus
        />
        {errors.userId && (
          <span className="text-center text-[red] font-bold text-md">
            아이디를 입력해주세요
          </span>
        )}
        <label className="mb-2" htmlFor="password">
          패스워드
        </label>
        <input
          placeholder="비밀번호"
          type="password"
          className="mb-4 p-3 border rounded"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-center text-[red] font-bold text-md">
            패스워드를 입력해주세요
          </span>
        )}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-8 py-3 rounded hover:opacity-80"
          >
            로그인
          </button>
          <button
            onClick={onRegister}
            type="button"
            className="bg-gray-300 px-8 py-3 rounded hover:opacity-80"
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
