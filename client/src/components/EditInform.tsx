import React, { useEffect, useState } from "react";
import { useCustomQueries } from "../hooks/useCustomQuery";
import { IInform } from "../interfaces/interface";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBusiness } from "../api";
import axiosApi from "../axios";

interface IEditInformProps {
  item: IInform;
  setEditingItemId: React.Dispatch<React.SetStateAction<string>>;
}

interface Business {
  destinationId: string;
  business: string;
}

function EditInform({ item, setEditingItemId }: IEditInformProps) {
  const {
    names,
    namesLoading,
    destinationsData,
    destinationsLoading,
    businessesData,
    businessesLoading,
    workData,
    worksLoading,
    cars,
    carsLoading,
  } = useCustomQueries();

  const [username, setUserName] = useState(item.username);
  const [destination, setDestination] = useState(item.destination);
  const [business, setBusiness] = useState(item.business);
  const [work, setWork] = useState(item.work);
  const [car, setCar] = useState(item.car);

  const queryClient = useQueryClient();

  const { data: businessData, isLoading: businessLoading } = useQuery<Business>(
    {
      queryKey: ["business", business],
      queryFn: () => getBusiness(business),
      enabled: !!business,
    }
  );

  useEffect(() => {
    if (businessData) {
      const matchingDestination = destinationsData?.find(
        (dest) => dest._id === businessData.destinationId
      );
      if (matchingDestination) {
        setDestination(matchingDestination.destination);
      }
    }
  }, [businessData, destinationsData]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) {
      alert("이름을 선택해주세요");
      return;
    }
    if (!destination) {
      alert("방문지를 선택해주세요");
      return;
    }
    if (!business) {
      alert("사업명을 선택해주세요");
      return;
    }
    if (!work) {
      alert("업무를 선택해주세요");
      return;
    }

    const res = await axiosApi.put("/api/employee-inform/editInform", {
      _id: item._id,
      username,
      destination,
      business,
      work,
      car,
    });
    if (res.status === 200) {
      alert(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["employeeInform"] });
      setEditingItemId("");
    }
  };

  const handleCancel = () => {
    setEditingItemId("");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(e.target.value);
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDestination = e.target.value;
    setDestination(newDestination);

    setBusiness("");
  };

  const handleBusinessChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBusiness(e.target.value);
  };

  const handleWorkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWork(e.target.value);
  };

  const handleCarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCar(e.target.value);
  };

  if (
    namesLoading ||
    destinationsLoading ||
    businessesLoading ||
    worksLoading ||
    carsLoading ||
    businessLoading
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-65 top-0 px-4">
      <form
        className="flex flex-col p-6 bg-white rounded-lg shadow-lg"
        onSubmit={onSubmit}
      >
        <h2 className="text-center text-xl font-bold mb-4">정보 수정</h2>
        <div className="flex flex-col">
          <div className="mb-2">
            <div className="font-bold mb-1">이름</div>
            <select
              id="username"
              value={username}
              onChange={handleNameChange}
              className="w-full p-3 border rounded"
            >
              {names
                ?.sort((a, b) => a.username.localeCompare(b.username))
                .map((item, index) => (
                  <option key={index} value={item.username}>
                    {item.username}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-2">
            <div className="font-bold mb-1">방문지</div>
            <select
              onChange={handleDestinationChange}
              className="w-full p-3 border rounded"
              value={destination}
            >
              {destinationsData
                ?.sort((a, b) => a.destination.localeCompare(b.destination))
                .map((item, index) => (
                  <option key={index} value={item.destination}>
                    {item.destination}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-2">
            <div className="font-bold mb-1">사업명</div>
            <select
              value={business}
              onChange={handleBusinessChange}
              className="w-full p-3 border rounded"
            >
              <option value="" disabled>
                사업명 선택
              </option>
              {businessesData
                ?.filter((business) => {
                  const matchingDestination = destinationsData?.find(
                    (dest) => dest.destination === destination
                  );
                  return business.destinationId === matchingDestination?._id;
                })
                ?.sort((a, b) => a.business.localeCompare(b.business))
                .map((item, idx) => (
                  <option key={idx} value={item.business}>
                    {item.business}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-2">
            <div className="font-bold mb-1">업무</div>
            <select
              id="work"
              value={work}
              onChange={handleWorkChange}
              className="w-full p-3 border rounded"
            >
              {workData
                ?.sort((a, b) => a.work.localeCompare(b.work))
                .map((item, index) => (
                  <option key={index} value={item.work}>
                    {item.work}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-2">
            <div className="font-bold mb-1">차량</div>
            <select
              id="car"
              value={car}
              onChange={handleCarChange}
              className="w-full p-3 border rounded"
            >
              <option>선택 안함</option>
              {cars
                ?.sort((a, b) => a.car.localeCompare(b.car))
                .map((item, index) => (
                  <option key={index} value={item.car}>
                    {item.car}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between mt-2">
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

export default EditInform;
