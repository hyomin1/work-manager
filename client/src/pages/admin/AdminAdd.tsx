import React, { useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { axiosReq } from "../../api";

interface IAddData {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  queryClient: QueryClient;
  destination?: string;
}
// 관리 페이지 데이터 추가
function AdminAdd({ setIsAdding, type, queryClient, destination }: IAddData) {
  const [inputValue, setInputValue] = useState("");

  const handleCancel = () => {
    setIsAdding(false);
  };

  const changeName = () => {
    switch (type) {
      case "username":
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
      case "department":
        return "파트";
      default:
        return "";
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let url = "/api/employee-inform/";
    let body = {};

    switch (type) {
      case "username":
        url += "addName";
        body = { username: inputValue };
        break;
      case "destination":
        url += "addDestination";
        body = { destination: inputValue };
        break;
      case "business":
        url += "addBusiness";
        body = {
          business: inputValue,
          destinationId: destination?.split(",")[0],
        };
        break;
      case "work":
        url += "addWork";
        body = { work: inputValue };
        break;
      case "car":
        url += "addCar";
        body = { car: inputValue };
        break;
      case "etcName":
        url += "addEtcName";
        body = { etcName: inputValue };
        break;
      case "department":
        url += "addDepartment";
        body = { department: inputValue };
        break;
      default:
        return;
    }

    const res = await axiosReq.post(url, body);
    if (res.status === 200) {
      alert("성공적으로 등록하였습니다.");
      queryClient.invalidateQueries({ queryKey: [type] });
      setIsAdding(false);
    }
  };

  return (
    <div className="fixed inset-0 top-0 z-10 flex items-center justify-center bg-black bg-opacity-65 px-4">
      <form
        className="flex h-80 w-96 flex-col rounded-lg bg-white p-6 shadow-lg"
        onSubmit={onSubmit}
      >
        <h2 className="mb-4 text-center text-xl font-bold">
          {changeName()} 등록
        </h2>
        <div className="flex flex-col">
          {type === "business" && destination && (
            <span className="mb-2 font-bold">{destination.split(",")[1]}</span>
          )}
          <input
            autoFocus
            placeholder="입력"
            value={inputValue}
            onChange={handleOnChange}
            className="mb-4 rounded border p-2"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:opacity-80"
          >
            등록
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded bg-gray-300 px-4 py-2 hover:opacity-80"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminAdd;
