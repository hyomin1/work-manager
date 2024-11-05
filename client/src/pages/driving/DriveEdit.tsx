import React, { useState } from 'react';
import { IDrivingInform } from '../../interfaces/interface';
import { useCustomQueries } from '../../hooks/useCustomQuery';

import { useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../api';

interface IEditInformProps {
  item: IDrivingInform;
  setEditingItemId: React.Dispatch<React.SetStateAction<string>>;
}

function EditDrivingInform({ item, setEditingItemId }: IEditInformProps) {
  const { names, namesLoading, etcNames, etcNamesLoading } = useCustomQueries();

  const [driveDay, setDriveDay] = useState(item.driveDay);
  const [drivingDestination, setDrivingDestination] = useState(
    item.drivingDestination
  );
  const [startKM, setStartKM] = useState(item.startKM);
  const [endKM, setEndKM] = useState(item.endKM);
  const [fuelCost, setFuelCost] = useState(item.fuelCost);
  const [toll, setToll] = useState(item.toll);
  const [etc, setEtc] = useState(item.etc);

  const queryClient = useQueryClient();
  const [drivers, setDrivers] = useState(item.username.split(', '));

  const handleDriveDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriveDay(new Date(e.target.value));
  };

  const handleNameChange =
    (index: number) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newDrivers = [...drivers];
      newDrivers[index] = e.target.value;
      setDrivers(newDrivers);
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
      alert('날짜를 선택해주세요');
      return;
    }
    if (!drivers) {
      alert('운전자를 선택해주세요');
      return;
    }

    if (!drivingDestination) {
      alert('행선지를 입력해주세요');
      return;
    }

    if (!startKM || !endKM) {
      alert('주행거리를 입력해주세요.');
      return;
    }
    if (etc.name && !etc.cost) {
      alert('비용을 입력해주세요.');
      return;
    }
    if (etc.cost && !etc.name) {
      alert('항목을 선택해주세요.');
      return;
    }
    const driverJoined = drivers.join(', ');
    const res = await axiosReq.put('/api/driving-inform/editInform', {
      _id: item._id,
      username: driverJoined,
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
      queryClient.invalidateQueries({ queryKey: ['drivingInform'] });
      setEditingItemId('');
    }
  };

  if (namesLoading || etcNamesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 top-0 z-10 flex items-center justify-center px-4 bg-black bg-opacity-65">
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="mb-6 text-xl font-bold text-center">정보 수정</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="form-group">
              <label className="block mb-2 font-bold text-left text-gray-700 ">
                날짜
              </label>
              <input
                value={new Date(driveDay).toISOString().split('T')[0]}
                onChange={handleDriveDayChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                type="date"
              />
            </div>

            <div className="form-group">
              <label className="block mb-2 font-bold text-left text-gray-700">
                이름
              </label>
              <div className="flex gap-2">
                {Array.from({ length: drivers.length }).map((_, index) => (
                  <select
                    key={index}
                    value={drivers[index]}
                    onChange={handleNameChange(index)}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  >
                    {names
                      ?.sort((a, b) => a.username.localeCompare(b.username))
                      .map((item, index) => (
                        <option key={index} value={item.username}>
                          {item.username}
                        </option>
                      ))}
                  </select>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="block mb-2 font-bold text-left text-gray-700">
                방문지
              </label>
              <input
                onChange={handleDrivingDestinationChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={drivingDestination}
              />
            </div>

            <div className="form-group">
              <label className="block mb-2 font-bold text-left text-gray-700">
                출발(Km)
              </label>
              <input
                type="number"
                onChange={handleStartKMChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={startKM}
              />
            </div>

            <div className="form-group">
              <label className="block mb-2 font-bold text-left text-gray-700">
                도착(Km)
              </label>
              <input
                type="number"
                onChange={handleEndKMChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={endKM}
              />
            </div>

            <div className="form-group">
              <label className="block mb-2 font-bold text-left text-gray-700">
                주유비(Km)
              </label>
              <input
                type="number"
                onChange={handleFuelCostChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={fuelCost}
              />
            </div>

            <div className="form-group">
              <label className="block mb-2 font-bold text-left text-gray-700">
                하이패스
              </label>
              <input
                type="number"
                onChange={handleTollChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={toll}
              />
            </div>

            <div className="form-group">
              <label className="block mb-2 font-bold text-left text-gray-700">
                기타
              </label>
              <div className="flex gap-2">
                <select
                  value={etc.name}
                  onChange={handleEtcNameChange}
                  className="w-1/2 p-3 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">항목 선택</option>
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
                  className="w-1/2 p-3 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            변경
          </button>
          <button
            type="button"
            onClick={() => setEditingItemId('')}
            className="px-6 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditDrivingInform;
