import React, { useEffect, useRef, useState } from "react";
import axiosApi from "../axios";
import { QueryClient } from "@tanstack/react-query";

interface IAddData {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  queryClient: QueryClient;
}

function AddData({ setIsAdding, type, queryClient }: IAddData) {
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCancel = () => {
    setIsAdding(false);
  };

  const changeName = () => {
    switch (type) {
      case "name":
        return "이름";
      case "destination":
        return "방문지";
      case "business":
        return "사업명";
      case "work":
        return "업무";
      case "car":
        return "차량";
      case "etcName":
        return "기타 비용";
      default:
        return "";
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let url = "";
    let body = {};

    switch (type) {
      case "name":
        url = "/api/employee-inform/addName";
        body = { username: inputValue };
        break;
      case "destination":
        url = "/api/employee-inform/addDestination";
        body = { destination: inputValue };
        break;
      case "business":
        url = "/api/employee-inform/addBusiness";
        body = { business: inputValue };
        break;
      case "work":
        url = "/api/employee-inform/addWork";
        body = { work: inputValue };
        break;
      case "car":
        url = "/api/employee-inform/addCar";
        body = { car: inputValue };
        break;
      case "etcName":
        url = "/api/employee-inform/addEtcName";
        body = { etcName: inputValue };
        break;
      default:
        return;
    }

    const res = await axiosApi.post(url, body);
    if (res.status === 200) {
      alert("성공적으로 등록하였습니다.");
      queryClient.invalidateQueries({ queryKey: [type] });
      setIsAdding(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-65 top-0 px-4">
      <form
        className="flex flex-col w-96 h-80 p-6 bg-white rounded-lg shadow-lg"
        onSubmit={onSubmit}
      >
        <h2 className="text-center text-xl font-bold mb-4">
          {changeName()} 등록
        </h2>
        <input
          ref={inputRef}
          placeholder="입력"
          value={inputValue}
          onChange={handleOnChange}
          className="mb-4 p-2 border rounded"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:opacity-80"
          >
            등록
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

export default AddData;
