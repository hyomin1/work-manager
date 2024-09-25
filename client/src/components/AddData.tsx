import React, { useState } from "react";
import axiosApi from "../axios";
import { useQueryClient } from "@tanstack/react-query";

interface IAddData {
  setIsName?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDestination?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBusiness?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWork?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCar?: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}

function AddData({
  setIsName,
  setIsDestination,
  setIsBusiness,
  setIsWork,
  setIsCar,
  type,
}: IAddData) {
  const handleCancel = () => {
    switch (type) {
      case "name":
        if (setIsName) setIsName(false);
        break;
      case "destination":
        if (setIsDestination) setIsDestination(false);
        break;
      case "business":
        if (setIsBusiness) setIsBusiness(false);
        break;
      case "work":
        if (setIsWork) setIsWork(false);
        break;
      case "car":
        if (setIsCar) setIsCar(false);
        break;
      default:
        break;
    }
  };

  const changeName = () => {
    switch (type) {
      case "name":
        return "이름";
      case "destination":
        return "방문지";
      case "business":
        return "사업명";
      case "status":
        return "업무";
      case "car":
        return "차량";
      default:
    }
  };
  const [username, setUsername] = useState("");
  const [destination, setDestination] = useState("");
  const [business, setBusiness] = useState("");
  const [work, setWork] = useState("");
  const [car, setCar] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "name") {
      setUsername(e.target.value);
    } else if (type === "destination") {
      setDestination(e.target.value);
    } else if (type === "business") {
      setBusiness(e.target.value);
    } else if (type === "status") {
      setWork(e.target.value);
    } else if (type === "car") {
      setCar(e.target.value);
    }
  };
  const queryClient = useQueryClient();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "name") {
      const res = await axiosApi.post("/addName", { username });

      if (res.status === 200) {
        alert("성공적으로 등록하였습니다.");

        if (setIsName) setIsName(false);
        queryClient.invalidateQueries({ queryKey: ["names"] }); // 입력 시 정보 refetch
      }
    } else if (type === "destination") {
      const res = await axiosApi.post("/addDestination", { destination });
      if (res.status === 200) {
        alert("성공적으로 등록하였습니다.");
        if (setIsDestination) setIsDestination(false);
        queryClient.invalidateQueries({ queryKey: ["destinations"] }); // 입력 시 정보 refetch
      }
    } else if (type === "business") {
      const res = await axiosApi.post("/addBusiness", { business });
      if (res.status === 200) {
        alert("성공적으로 등록하였습니다.");
        if (setIsBusiness) setIsBusiness(false);
        queryClient.invalidateQueries({ queryKey: ["businesses"] }); // 입력 시 정보 refetch
      }
    } else if (type === "status") {
      const res = await axiosApi.post("/addState", { state: work });
      if (res.status === 200) {
        alert("성공적으로 등록하였습니다.");
        if (setIsWork) setIsWork(false);
        queryClient.invalidateQueries({ queryKey: ["states"] }); // 입력 시 정보 refetch
      }
    } else if (type === "car") {
      const res = await axiosApi.post("/addCar", { car });
      if (res.status === 200) {
        alert("성공적으로 등록하였습니다.");
        if (setIsCar) setIsCar(false);
        queryClient.invalidateQueries({ queryKey: ["cars"] }); // 입력 시 정보 refetch
      }
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center absolute z-10  bg-black bg-opacity-65 top-0">
      <form
        className="flex flex-col w-96 h-80 p-6 bg-white rounded-lg shadow-lg"
        onSubmit={onSubmit}
      >
        <h2 className="text-center text-xl font-bold mb-4">
          {changeName()} 등록
        </h2>
        <input
          placeholder="입력"
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
