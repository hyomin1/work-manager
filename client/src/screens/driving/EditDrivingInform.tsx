import React, { useState } from "react";
import { IDrivingInform } from "../../interfaces/interface";
import { useCustomQueries } from "../../hooks/useCustomQuery";
import axiosApi from "../../axios";
import { useQueryClient } from "@tanstack/react-query";

interface IEditInformProps {
  item: IDrivingInform;
  setEditingItemId: React.Dispatch<React.SetStateAction<string>>;
}

function EditDrivingInform({ item, setEditingItemId }: IEditInformProps) {
  const { names, namesLoading, etcNames, etcNamesLoading } = useCustomQueries();

  const [driveDay, setDriveDay] = useState(item.driveDay);
  const [username, setUserName] = useState(item.username);
  const [drivingDestination, setDrivingDestination] = useState(
    item.drivingDestination
  );
  const [startKM, setStartKM] = useState(item.startKM);
  const [endKM, setEndKM] = useState(item.endKM);
  const [fuelCost, setFuelCost] = useState(item.fuelCost);
  const [toll, setToll] = useState(item.toll);
  const [etc, setEtc] = useState(item.etc);

  const queryClient = useQueryClient();

  const handleDriveDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriveDay(new Date(e.target.value));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(e.target.value);
  };

  const handleDrivingDestinationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDrivingDestination(e.target.value);
  };

  const handleStartKMChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartKM(parseInt(e.target.value));
  };
  const handleEndKMChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndKM(parseInt(e.target.value));
  };
  const handleFuelCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFuelCost(parseInt(e.target.value));
  };
  const handleTollChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToll(parseInt(e.target.value));
  };
  const handleEtcNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEtc({ name: event.target.value, cost: etc.cost }); // ���기값 설정
  };

  const handleEtcCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEtc({ name: etc.name, cost: parseInt(event.target.value) }); // ���기값 설정
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!driveDay) {
      alert("날짜를 선택해주세요");
      return;
    }
    if (!username) {
      alert("운전자를 선택해주세요");
      return;
    }

    if (!drivingDestination) {
      alert("행선지를 입력해주세요");
      return;
    }

    if (!startKM || !endKM) {
      alert("주행거리를 입력해주세요.");
      return;
    }
    if (etc.name && !etc.cost) {
      alert("비용을 입력해주세요.");
      return;
    }
    if (etc.cost && !etc.name) {
      alert("항목을 선택해주세요.");
      return;
    }

    const res = await axiosApi.put("/api/driving-inform/editInform", {
      _id: item._id,
      username,
      driveDay,
      drivingDestination,
      startKM,
      endKM,
      fuelCost,
      toll,
      etc,
    });
    if (res.status === 200) {
      alert(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["drivingInform"] });
      setEditingItemId("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-65 top-0 px-4">
      <form
        onSubmit={onSubmit}
        className="flex flex-col p-6 bg-white rounded-lg shadow-lg w-[40%]"
      >
        <h2 className="text-center text-xl font-bold mb-4">정보 수정</h2>

        <div className="flex flex-col">
          <div className="mb-2">
            <div className="font-bold mb-1">날짜</div>
            <input
              value={new Date(driveDay).toISOString().split("T")[0]}
              onChange={handleDriveDayChange}
              className="w-full p-3 border rounded"
              type="date"
            />
          </div>

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
        </div>

        <div className="mb-2">
          <div className="font-bold mb-1">방문지</div>
          <input
            onChange={handleDrivingDestinationChange}
            className="w-full p-3 border rounded"
            value={drivingDestination}
          />
        </div>

        <div className="mb-2">
          <div className="font-bold mb-1">출발(Km)</div>
          <input
            type="number"
            onChange={handleStartKMChange}
            className="w-full p-3 border rounded"
            value={startKM}
          />
        </div>

        <div className="mb-2">
          <div className="font-bold mb-1">도착(Km)</div>
          <input
            type="number"
            onChange={handleEndKMChange}
            className="w-full p-3 border rounded"
            value={endKM}
          />
        </div>

        <div className="mb-2">
          <div className="font-bold mb-1">주유비(Km)</div>
          <input
            type="number"
            onChange={handleFuelCostChange}
            className="w-full p-3 border rounded"
            value={fuelCost}
          />
        </div>

        <div className="mb-2">
          <div className="font-bold mb-1">하이패스</div>
          <input
            type="number"
            onChange={handleTollChange}
            className="w-full p-3 border rounded"
            value={toll}
          />
        </div>

        <div className="mb-2">
          <div className="font-bold mb-1">기타</div>
          <div className="flex w-full">
            <select
              defaultValue={etc.name}
              onChange={handleEtcNameChange}
              className="hover:opacity-60 border rounded-md p-2 sm:w-full sm:ml-0 md:mr-2 w-[50%]"
            >
              <option disabled value="">
                항목 선택
              </option>
              {etcNames
                ?.sort((a, b) => a.etcName.localeCompare(b.etcName))
                .map((item, index) => (
                  <option key={index} value={item.etcName}>
                    {item.etcName}
                  </option>
                ))}
            </select>
            <input
              type="number"
              value={etc.cost}
              onChange={handleEtcCostChange}
              className=" w-[50%] border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400  transition duration-150 ease-in-out hover:opacity-60"
            />
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
            onClick={() => setEditingItemId("")}
            className="bg-gray-300 py-2 px-4 rounded hover:opacity-80"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditDrivingInform;
