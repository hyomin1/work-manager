import React, { useState } from "react";
import axiosApi from "../axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IBusinesses,
  ICars,
  IDestinations,
  INames,
  IStates,
} from "../interfaces/interface";
import {
  formDate,
  getBusinesses,
  getCars,
  getDestinations,
  getNames,
  getStates,
} from "../api";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import Page from "../components/Page";
import AddData from "../components/AddData";

function Admin() {
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<string>("name");

  const [isName, setIsName] = useState(false);
  const [isDestination, setIsDestination] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [isWork, setIsWork] = useState(false);
  const [isCar, setIsCar] = useState(false);

  const { data: names } = useQuery<INames[]>({
    queryKey: ["names"],
    queryFn: getNames,
  });
  const { data: destinations } = useQuery<IDestinations[]>({
    queryKey: ["destinations"],
    queryFn: getDestinations,
  });

  const { data: businesses } = useQuery<IBusinesses[]>({
    queryKey: ["businesses"],
    queryFn: getBusinesses,
  });

  const { data: states } = useQuery<IStates[]>({
    queryKey: ["states"],
    queryFn: getStates,
  });

  const { data: cars } = useQuery<ICars[]>({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  const [page, setPage] = useState(1);

  const itemsPerPage = 10;

  const indexOfLastNameItem = page * itemsPerPage;
  const indexOfFirstNameItem = indexOfLastNameItem - itemsPerPage;
  const totalNamePages = names ? Math.ceil(names.length / itemsPerPage) : 0;

  const indexOfLastDestinationItem = page * itemsPerPage;
  const indexOfFirstDestinationItem = indexOfLastDestinationItem - itemsPerPage;
  const totalDestinationPages = destinations
    ? Math.ceil(destinations.length / itemsPerPage)
    : 0;

  const indexOfLastStateItem = page * itemsPerPage;
  const indexOfFirstStateItem = indexOfLastStateItem - itemsPerPage;
  const totalStatePages = states ? Math.ceil(states.length / itemsPerPage) : 0;

  const indexOfLastCarItem = page * itemsPerPage;
  const indexOfFirstCarItem = indexOfLastCarItem - itemsPerPage;
  const totalCarPages = cars ? Math.ceil(cars.length / itemsPerPage) : 0;

  const indexOfLastBusinessItem = page * itemsPerPage;
  const indexOfFirstBusinessItem = indexOfLastBusinessItem - itemsPerPage;
  const totalBusinessPages = businesses
    ? Math.ceil(businesses.length / itemsPerPage)
    : 0;

  const handlePage = (page: number) => {
    setPage(page);
  };

  const handleTabClick = (tab: string) => {
    setPage(1);
    setActiveTab(tab);
  };

  const addName = async () => {
    const username = await window.prompt("이름 입력: ");
    if (username) {
      const res = await axiosApi.post("/addName", { username });
      if (res.status === 200) {
        alert("성공적으로 등록하였습니다.");
        queryClient.invalidateQueries({ queryKey: ["names"] }); // 입력 시 정보 refetch
      }
    }
  };

  const removeName = async (id: string) => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      const res = await axiosApi.delete(`/removeName/${id}`);
      if (res.status === 200) {
        alert("성공적으로 삭제하였습니다.");
        queryClient.invalidateQueries({ queryKey: ["names"] }); // 삭제 시 정보 refetch
      }
    }
  };

  const addDestination = async () => {
    const destination = await window.prompt("방문지 입력: ");
    if (destination) {
      const res = await axiosApi.post("/addDestination", { destination });
      if (res.status === 200) {
        alert("성공적으로 등록하였습니다.");
        queryClient.invalidateQueries({ queryKey: ["destinations"] });
      }
    }
  };
  const removeDestination = async (id: string) => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      const res = await axiosApi.delete(`/removeDestination/${id}`);
      if (res.status === 200) {
        alert("성공적으로 삭제하였습니다.");
        queryClient.invalidateQueries({ queryKey: ["destinations"] });
      }
    }
  };

  const addBusiness = async () => {
    const business = await window.prompt("사업명 입력: ");
    if (business) {
      const res = await axiosApi.post("/addBusiness", { business });
      if (res.status === 200) {
        alert("성공적으로 등록하였습니다.");
        queryClient.invalidateQueries({ queryKey: ["businesses"] });
      }
    }
  };

  const removeBusiness = async (id: string) => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      const res = await axiosApi.delete(`/removeBusiness/${id}`);
      if (res.status === 200) {
        alert("성공적으로 삭제하였습니다.");
        queryClient.invalidateQueries({ queryKey: ["businesses"] });
      }
    }
  };

  const addState = async () => {
    const state = await window.prompt("상태 입력: ");
    if (state) {
      const res = await axiosApi.post("/addState", { state });
      if (res.status === 200) {
        alert("성공적으로 등록하였습니다.");
        queryClient.invalidateQueries({ queryKey: ["states"] });
      }
    }
  };
  const removeState = async (id: string) => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      const res = await axiosApi.delete(`/removeState/${id}`);
      if (res.status === 200) {
        alert("성공적으로 삭제하였습니다.");
        queryClient.invalidateQueries({ queryKey: ["states"] });
      }
    }
  };

  const addCar = async () => {
    const car = await window.prompt("상태 입력: ");
    if (car) {
      const res = await axiosApi.post("/addCar", { car });
      if (res.status === 200) {
        alert("성공적으로 등록하였습니다.");
        queryClient.invalidateQueries({ queryKey: ["cars"] });
      }
    }
  };
  const removeCar = async (id: string) => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      const res = await axiosApi.delete(`/removeCar/${id}`);
      if (res.status === 200) {
        alert("성공적으로 삭제하였습니다.");
        queryClient.invalidateQueries({ queryKey: ["cars"] });
      }
    }
  };
  console.log(activeTab);
  return (
    <div className="w-full h-screen flex flex-col justify-between items-center p-10">
      {activeTab === "name" && isName && (
        <AddData setIsName={setIsName} type={activeTab} />
      )}
      {activeTab === "destination" && isDestination && (
        <AddData setIsDestination={setIsDestination} type={activeTab} />
      )}
      {activeTab === "business" && isBusiness && (
        <AddData setIsBusiness={setIsBusiness} type={activeTab} />
      )}
      {activeTab === "status" && isWork && (
        <AddData setIsWork={setIsWork} type={activeTab} />
      )}
      {activeTab === "car" && isCar && (
        <AddData setIsCar={setIsCar} type={activeTab} />
      )}
      <div className="w-[80%] flex flex-col items-center h-screen">
        <div className="mt-4 mb-20 flex items-center justify-center w-[100%]">
          <span className="font-bold text-3xl">{formDate}</span>
        </div>

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
                방문지
              </th>
              <th
                className={`p-4 font-bold cursor-pointer hover:opacity-60 ${
                  activeTab === "business"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTabClick("business")}
              >
                사업명
              </th>

              <th
                className={`p-4 font-bold cursor-pointer hover:opacity-60 ${
                  activeTab === "status"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTabClick("status")}
              >
                업무
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
            {activeTab === "name" && (
              <>
                <tr>
                  <td className="bg-white p-4 border-b border-gray-200 font-bold text-xl">
                    목록
                  </td>
                  <td className="border-b border-gray-200" />
                  <td className="border-b border-gray-200" />
                  <td className="border-b border-gray-200" />
                  <td className="border-b border-gray-200">
                    <button
                      className="bg-[#00ab39] rounded-full text-white p-2 hover:opacity-60 font-bold"
                      onClick={() => setIsName(true)}
                    >
                      <FaPlus className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
                {names
                  ?.sort((a, b) => a.username.localeCompare(b.username))
                  .slice(indexOfFirstNameItem, indexOfLastNameItem)
                  .map((item, index) => (
                    <tr
                      key={index}
                      className={` ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-4 border-b border-gray-200">
                        {item.username}
                      </td>
                      <td className="border-b border-gray-200" />
                      <td className="border-b border-gray-200" />
                      <td className="border-b border-gray-200" />
                      <td className="border-b border-gray-200">
                        <button
                          className="bg-[#FF0000] rounded-full text-white p-2 hover:opacity-60 font-bold"
                          onClick={() => removeName(item._id)}
                        >
                          <IoClose className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </>
            )}

            {activeTab === "destination" && (
              <>
                <tr>
                  <td className="bg-white p-4 border-b border-gray-200 font-bold text-xl">
                    목록
                  </td>
                  <td className="border-b border-gray-200" />
                  <td className="border-b border-gray-200" />
                  <td className="border-b border-gray-200" />
                  <td className="border-b border-gray-200">
                    <button
                      onClick={() => setIsDestination(true)}
                      className="bg-[#00ab39] rounded-full text-white p-2 hover:opacity-60 font-bold"
                    >
                      <FaPlus className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
                {destinations
                  ?.sort((a, b) => a.destination.localeCompare(b.destination))
                  .slice(
                    indexOfFirstDestinationItem,
                    indexOfLastDestinationItem
                  )
                  .map((item, index) => (
                    <tr
                      key={index}
                      className={` ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-4 border-b border-gray-200">
                        {item.destination}
                      </td>
                      <td className="border-b border-gray-200" />
                      <td className="border-b border-gray-200" />
                      <td className="border-b border-gray-200" />
                      <td className="border-b border-gray-200">
                        <button
                          className="bg-[#FF0000] rounded-full text-white p-2 hover:opacity-60 font-bold"
                          onClick={() => removeDestination(item._id)}
                        >
                          <IoClose className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </>
            )}
            {activeTab === "business" && (
              <>
                <tr>
                  <td className="bg-white p-4 border-b border-gray-200 font-bold text-xl">
                    목록
                  </td>
                  <td className="border-b border-gray-200" />
                  <td className="border-b border-gray-200" />
                  <td className="border-b border-gray-200" />
                  <td className="border-b border-gray-200">
                    <button
                      onClick={() => setIsBusiness(true)}
                      className="bg-[#488f60] rounded-full text-white p-2 hover:opacity-60 font-bold"
                    >
                      <FaPlus className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
                {businesses
                  ?.sort((a, b) => a.business.localeCompare(b.business))
                  ?.slice(indexOfFirstBusinessItem, indexOfLastBusinessItem)
                  .map((item, index) => (
                    <tr
                      key={index}
                      className={` ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-4 border-b border-gray-200">
                        {item.business}
                      </td>
                      <td className=" border-b border-gray-200" />
                      <td className="border-b border-gray-200" />
                      <td className="border-b border-gray-200" />
                      <td className="border-b border-gray-200">
                        <button
                          className="bg-[#FF0000] rounded-full text-white p-2 hover:opacity-60 font-bold"
                          onClick={() => removeBusiness(item._id)}
                        >
                          <IoClose className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </>
            )}

            {activeTab === "status" && (
              <>
                <tr>
                  <td className="bg-white p-4 border-b border-gray-200 text-xl font-bold">
                    목록
                  </td>
                  <td className="border-b border-gray-200" />
                  <td className="border-b border-gray-200" />
                  <td className="border-b border-gray-200" />
                  <td className="border-b border-gray-200">
                    <button
                      onClick={() => setIsWork(true)}
                      className="bg-[#00ab39] rounded-full text-white p-2 hover:opacity-60 font-bold"
                    >
                      <FaPlus className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
                {states
                  ?.sort((a, b) => a.state.localeCompare(b.state))
                  .slice(indexOfFirstStateItem, indexOfLastStateItem)
                  .map((item, index) => (
                    <tr
                      key={index}
                      className={` ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-4 border-b border-gray-200">
                        {item.state}
                      </td>
                      <td className="border-b border-gray-200" />
                      <td className="border-b border-gray-200" />
                      <td className="border-b border-gray-200" />
                      <td className="border-b border-gray-200">
                        <button
                          className="bg-[#FF0000] rounded-full text-white p-2 hover:opacity-60 font-bold"
                          onClick={() => removeState(item._id)}
                        >
                          <IoClose className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </>
            )}
            {activeTab === "car" && (
              <>
                <tr>
                  <td className="bg-white p-4 border-b border-gray-200 font-bold text-xl">
                    목록
                  </td>
                  <td className="border-b border-gray-200" />
                  <td className="border-b border-gray-200" />
                  <td className="border-b border-gray-200" />
                  <td className="border-b border-gray-200">
                    <button
                      onClick={() => setIsCar(true)}
                      className="bg-[#488f60] rounded-full text-white p-2 hover:opacity-60 font-bold"
                    >
                      <FaPlus className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
                {cars
                  ?.slice(indexOfFirstCarItem, indexOfLastCarItem)
                  .map((item, index) => (
                    <tr
                      key={index}
                      className={` ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-4 border-b border-gray-200">
                        {item.car}
                      </td>
                      <td className=" border-b border-gray-200" />
                      <td className="border-b border-gray-200" />
                      <td className="border-b border-gray-200" />
                      <td className="border-b border-gray-200">
                        <button
                          className="bg-[#FF0000] rounded-full text-white p-2 hover:opacity-60 font-bold"
                          onClick={() => removeCar(item._id)}
                        >
                          <IoClose className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      {activeTab === "name" && (
        <Page
          totalPage={totalNamePages}
          page={page}
          onPageChange={handlePage}
        />
      )}
      {activeTab === "destination" && (
        <Page
          totalPage={totalDestinationPages}
          page={page}
          onPageChange={handlePage}
        />
      )}
      {activeTab === "business" && (
        <Page
          totalPage={totalBusinessPages}
          page={page}
          onPageChange={handlePage}
        />
      )}
      {activeTab === "status" && (
        <Page
          totalPage={totalStatePages}
          page={page}
          onPageChange={handlePage}
        />
      )}
      {activeTab === "car" && (
        <Page totalPage={totalCarPages} page={page} onPageChange={handlePage} />
      )}
    </div>
  );
}

export default Admin;
