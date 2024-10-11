import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api";

interface IAdminLoginProps {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdminLogin({ setIsShow }: IAdminLoginProps) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await axiosReq.post("/auth/adminLogin", {
      userId,
      password,
    });
    if (res.status === 200) {
      navigate("/admin");
    } else if (res.status === 403) {
      setIsShow(false);
    }
  };

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCancel = () => {
    setUserId("");
    setPassword("");
    setIsShow(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center absolute z-10  bg-black bg-opacity-65 top-0">
      <form
        className="flex flex-col w-96 h-80 p-6 bg-white rounded-lg shadow-lg"
        onSubmit={onAdminLogin}
      >
        <h2 className="text-center text-xl font-bold mb-4">관리자 로그인</h2>
        <input
          placeholder="아이디"
          onChange={handleId}
          value={userId}
          className="mb-4 p-2 border rounded"
          autoFocus
        />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={handlePw}
          value={password}
          className="mb-4 p-2 border rounded"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:opacity-80"
          >
            로그인
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 py-2 px-4 rounded hover:opacity-80"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
