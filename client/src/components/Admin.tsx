import React, { useState } from "react";
import axiosApi from "../axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ICars, IDestinations, INames, IStates } from "../interfaces/interface";
import { getCars, getDestinations, getNames, getStates } from "../api";

function Admin() {
  const today = new Date();
  const formatDate = today.toLocaleDateString("ko-KR");

  const queryClient = useQueryClient();

  const [username, setName] = useState("");
  const [activeTab, setActiveTab] = useState<string>("name");

  const {
    data: names,
    isLoading: namesLoading,
    error: namesError,
  } = useQuery<INames[]>({
    queryKey: ["names"],
    queryFn: getNames,
  });
  const {
    data: destinations,
    isLoading: destinationsLoading,
    error: destinationsError,
  } = useQuery<IDestinations[]>({
    queryKey: ["destinations"],
    queryFn: getDestinations,
  });

  const {
    data: states,
    isLoading: statesLoading,
    error: statesError,
  } = useQuery<IStates[]>({ queryKey: ["states"], queryFn: getStates });

  const {
    data: cars,
    isLoading: carsLoading,
    error: carsError,
  } = useQuery<ICars[]>({ queryKey: ["cars"], queryFn: getCars });

  const onHandleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onSubmitName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await axiosApi.post("/addName", { username });
    //addName();
    setName("");
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const addUser = async () => {
    const username = await window.prompt("이름 입력: ");

    const res = await axiosApi.post("/addName", { username });
    if (res.status === 200) {
      alert("성공적으로 등록하였습니다.");
      queryClient.invalidateQueries({ queryKey: ["names"] });
    }
  };

  const deleteUser = async (id: string) => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      const res = await axiosApi.delete(`/removeName/${id}`);
      if (res.status === 200) {
        alert("성공적으로 삭제하였습니다.");
        queryClient.invalidateQueries({ queryKey: ["names"] });
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center p-10">
      <div className="w-[80%] flex flex-col items-center h-screen">
        <div className="mb-4 flex items-center justify-center w-[100%]">
          <span className="mb-4 font-bold text-3xl">{formatDate}</span>
        </div>
        {/* Table Layout */}
        <table className="w-[100%] table-auto">
          <thead>
            <tr className="text-left">
              <th
                className={`p-4 font-bold cursor-pointer rounded-tl-xl hover:opacity-60 ${
                  activeTab === "name"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTabClick("name")}
              >
                이름
              </th>

              <th
                className={`p-4 font-bold cursor-pointer hover:opacity-60 ${
                  activeTab === "destination"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTabClick("destination")}
              >
                행선지
              </th>

              <th
                className={`p-4 font-bold cursor-pointer hover:opacity-60 ${
                  activeTab === "status"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTabClick("status")}
              >
                상태
              </th>

              <th
                className={`p-4 font-bold cursor-pointer rounded-tr-xl hover:opacity-60 ${
                  activeTab === "car" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleTabClick("car")}
              >
                차량
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-white p-4">목록</td>
              <td></td>
              <td></td>
              <td>
                <button onClick={addUser}>추가</button>
              </td>
            </tr>
            {activeTab === "name" &&
              names?.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-4 border-b border-gray-200">
                    {item.username}
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <button onClick={() => deleteUser(item._id)}>삭제</button>
                  </td>
                </tr>
              ))}
            {activeTab === "destination" && (
              <tr>
                <td>행선지</td>
                <td></td>
                <td></td>
                <td>
                  <button>삭제</button>
                </td>
              </tr>
            )}
            {activeTab === "status" && (
              <tr>
                <td>상태</td>
                <td></td>
                <td></td>
                <td>
                  <button>삭제</button>
                </td>
              </tr>
            )}
            {activeTab === "car" && (
              <tr>
                <td>차량</td>
                <td></td>
                <td></td>
                <td>
                  <button>삭제</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
