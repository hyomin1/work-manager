import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";
import { axiosReq } from "../../api";

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

  const [cookies, setCookie, removeCookie] = useCookies(["rememberUserId"]);

  const [isRemember, setIsRemember] = useState(false);

  const navigate = useNavigate();

  const onRememberId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRemember(e.target.checked);
  };

  const onLogin = async (data: ILogin) => {
    const res = await axiosReq.post("/auth/login", data);
    if (res.status === 201) {
      if (isRemember) {
        setCookie("rememberUserId", data.userId, { path: "/" }); // 쿠키에 사용자 ID 저장
      } else {
        removeCookie("rememberUserId"); // 쿠키에서 사용자 ID 삭제
      }

      navigate("/home");
      setValue("userId", "");
      setValue("password", "");
    }
  };
  const onRegister = () => {
    navigate("/register");
  };

  const checkSession = async () => {
    const res = await axiosReq.get("/auth/checkSession");
    // 세션 존재 시 바로 메인 화면
    if (res.status === 200) {
      navigate("/home");
    }
  };
  useEffect(() => {
    checkSession();
    if (cookies.rememberUserId) {
      setValue("userId", cookies.rememberUserId); // 쿠키에서 ID 불러오기
      setIsRemember(true); // 체크박스 상태 업데이트
    }
  }, [cookies.rememberUserId]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-custom-gradient ">
      <form
        onSubmit={handleSubmit(onLogin)}
        className="flex flex-col sm:w-[90%] md:w-[30%] p-6 bg-white rounded-lg shadow-custom-shadow"
      >
        <span className="font-bold text-2xl mb-4">로그인</span>
        <label className="mb-2 text-sm" htmlFor="userId">
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
        <label className="mb-2 text-sm" htmlFor="password">
          패스워드
        </label>
        <input
          placeholder="패스워드"
          type="password"
          className="mb-4 p-3 border rounded"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-center text-[red] font-bold text-md">
            패스워드를 입력해주세요
          </span>
        )}
        <div className="flex items-center mb-2">
          <input
            id="remember"
            checked={isRemember}
            onChange={onRememberId}
            className="w-4 h-4"
            type="checkbox"
          />
          <label
            htmlFor="remember"
            className={`text-sm ml-1 ${
              isRemember ? "text-black" : "text-gray-400"
            }`}
          >
            아이디 저장
          </label>
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white whitespace-nowrap px-8 py-3 rounded hover:opacity-80"
          >
            로그인
          </button>
          <button
            onClick={onRegister}
            type="button"
            className="bg-gray-300 px-8 py-3 rounded whitespace-nowrap  hover:opacity-80"
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
