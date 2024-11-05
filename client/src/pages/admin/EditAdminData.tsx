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

function EditAdminData({
  setIsEditing,
  type,
  queryClient,
  destination,
  itemId,
  item,
}: IEditData) {
  const [inputValue, setInputValue] = useState(
    item && item[type] ? item[type] : ""
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
    if (res.status === 200) {
      alert("변경이 완료되었습니다");
      queryClient.invalidateQueries({ queryKey: [type] });
      setIsEditing(false);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-65 top-0 px-4">
      <form
        className="flex flex-col w-96 h-80 p-6 bg-white rounded-lg shadow-lg"
        onSubmit={onSubmit}
      >
        <h2 className="text-center text-xl font-bold mb-4">
          {changeName()} 수정
        </h2>
        <div className="flex flex-col">
          {type === "business" && destination && (
            <span className="font-bold mb-2">{destination.split(",")[1]}</span>
          )}
          <input
            autoFocus
            value={inputValue}
            onChange={handleOnChange}
            className="mb-4 p-2 border rounded"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:opacity-80"
          >
            변경
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

export default EditAdminData;
