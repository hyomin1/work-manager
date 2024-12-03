import { QueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

import { axiosReq } from "../../api";
interface IEditData {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  queryClient: QueryClient;
  destination?: string;
  itemId: string;
  item: { [key: string]: string } | null;
}

// 관리 페이지 데이터 수정
function AdminEdit({
  setIsEditing,
  type,
  queryClient,
  destination,
  itemId,
  item,
}: IEditData) {
  const [inputValue, setInputValue] = useState(
    item && item[type] ? item[type] : "",
  );

  const handleCancel = () => {
    setIsEditing(false);
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
      case "username":
        url = "/api/employee-inform/editName";
        body = { username: inputValue, id: itemId };
        break;
      case "destination":
        url = "/api/employee-inform/editDestination";
        body = { destination: inputValue, id: itemId };
        break;
      case "business":
        url = "/api/employee-inform/editBusiness";
        body = {
          business: inputValue,
          destinationId: destination?.split(",")[0],
          id: itemId,
        };
        break;
      case "work":
        url = "/api/employee-inform/editWork";
        body = { work: inputValue, id: itemId };
        break;
      case "car":
        url = "/api/employee-inform/editCar";
        body = { car: inputValue, id: itemId };
        break;
      case "etcName":
        url = "/api/employee-inform/editEtcName";
        body = { etcName: inputValue, id: itemId };
        break;
      default:
        return;
    }

    const res = await axiosReq.patch(url, body);
    if (res.status !== 200) {
      return;
    }
    alert("변경이 완료되었습니다");
    queryClient.invalidateQueries({ queryKey: [type] });
    setIsEditing(false);
  };
  return (
    <div className="fixed inset-0 top-0 z-10 flex items-center justify-center bg-black bg-opacity-65 px-4">
      <form
        className="flex h-80 w-96 flex-col rounded-lg bg-white p-6 shadow-lg"
        onSubmit={onSubmit}
      >
        <h2 className="mb-4 text-center text-xl font-bold">
          {changeName()} 수정
        </h2>
        <div className="flex flex-col">
          {type === "business" && destination && (
            <span className="mb-2 font-bold">{destination.split(",")[1]}</span>
          )}
          <input
            autoFocus
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
            변경
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

export default AdminEdit;
