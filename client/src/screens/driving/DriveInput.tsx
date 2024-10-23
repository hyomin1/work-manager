import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabInputHeader from '../../components/TabInputHeader';
import { drivingInputHeaders } from '../../constants/headers';
import { formDate, axiosReq } from '../../api';

import ArrowBack from '../../components/ArrowBack';
import { useCustomQueries } from '../../hooks/useCustomQuery';

function DriveInput() {
  const navigate = useNavigate();
  const [username, setName] = useState('');
  const [car, setCar] = useState('');
  const [drivingDestination, setDrivingDestination] = useState('');

  const [drivers, setDrivers] = useState(['', '']);
  const [startKM, setStartKM] = useState(0);
  const [endKM, setEndKM] = useState(0);

  const [fuelCost, setFuelCost] = useState(0);
  const [toll, setToll] = useState(0);

  const [totalKM, setTotalKM] = useState(0);

  const [driveDay, setDriveDay] = useState<Date>();

  const [etc, setEtc] = useState<{ name: string; cost: number }>({
    name: '', // 초기값 설정
    cost: 0,
  });

  const selectedDriver = drivers.filter(Boolean);

  const privateCarId = process.env.REACT_APP_PRIVATE_CAR;

  const { names, namesLoading, cars, carsLoading, etcNames, etcNamesLoading } =
    useCustomQueries();

  const handleDriveDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDriveDay(new Date(event.target.value));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setName(event.target.value);
  };
  const handleCarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCar(event.target.value);
  };
  const handleDrivingDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDrivingDestination(event.target.value);
  };

  const handleStartKMChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartKM(parseInt(event.target.value));
  };
  const handleEndKMChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndKM(parseInt(event.target.value));
  };
  const handleTotalKMChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalKM(parseInt(event.target.value));
  };
  const handleFuelCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFuelCost(parseInt(event.target.value));
  };
  const handleTollChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToll(parseInt(event.target.value));
  };
  const handleEtcNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEtc({ name: event.target.value, cost: etc.cost }); // ���기값 설정
  };

  const handleEtcCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEtc({ name: etc.name, cost: parseInt(event.target.value) }); // ���기값 설정
  };

  const handleDriverChange =
    (index: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newDrivers = [...drivers];
      newDrivers[index] = event.target.value;
      setDrivers(newDrivers);
    };

  const onClickComplete = async () => {
    const driverArr = selectedDriver
      .map((driver) => driver.trim())
      .filter((driver) => driver !== null && driver !== '')

      .filter(Boolean);

    if (!driveDay) {
      alert('날짜를 선택해주세요');
      return;
    }
    if (driverArr.length === 0) {
      alert('운전자를 선택해주세요');
      return;
    }
    if (!car) {
      alert('차량을 선택해주세요');
      return;
    }
    if (!drivingDestination) {
      alert('행선지를 입력해주세요');
      return;
    }

    if (car !== privateCarId && (!startKM || !endKM)) {
      alert('주행거리를 입력해주세요.');
      return;
    }
    if (car === privateCarId && !totalKM) {
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
    if (typeof fuelCost !== 'number') {
      setFuelCost(0);
    }
    if (typeof toll !== 'number') {
      setToll(0);
    }
    if (typeof etc.cost !== 'number') {
      setEtc({ name: etc.name, cost: 0 });
    }

    const driverJoined = driverArr.join(', ');
    const res = await axiosReq.post('/api/driving-inform/addInform', {
      driveDay,
      username: driverJoined,
      car,
      drivingDestination,
      startKM,
      endKM,
      totalKM: car === privateCarId ? totalKM : endKM - startKM,
      fuelCost,
      toll,
      etc,
    });
    if (res.status === 200) {
      alert(res.data.message);
      navigate('/driving-status');
    }
  };
  if (namesLoading || carsLoading || etcNamesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-screen p-10 bg-gray-50 sm:p-4">
      <div className="w-[95%] flex flex-col items-center rounded-lg sm:w-full bg-gray-50">
        <div className="flex items-center w-full mt-4 mb-20 md:justify-center sm:mb-10 sm:justify-between">
          <div className="flex items-center justify-between w-full">
            <ArrowBack type="not home" />
            <div className="flex items-center justify-center">
              <span className="text-3xl font-bold sm:text-lg">{formDate}</span>
            </div>
            <div className="w-[11%]" />
          </div>
        </div>

        <div className="w-full">
          <table className="w-full text-left sm:table-fixed ">
            <TabInputHeader headers={drivingInputHeaders} />

            <tbody>
              <tr className="w-full sm:flex sm:flex-col">
                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b md:w-[1%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden">날짜</div>
                  <input
                    type="date"
                    className="p-2 ml-3 border rounded-md sm:w-full sm:ml-0"
                    onChange={handleDriveDayChange}
                  />
                </td>
                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b w-[7%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden">차량</div>
                  <select
                    defaultValue=""
                    onChange={handleCarChange}
                    className="p-2 ml-3 border rounded-md hover:opacity-60 sm:w-full sm:ml-0"
                  >
                    <option disabled value="">
                      차량 선택
                    </option>
                    {cars
                      ?.sort((a, b) => a.car.localeCompare(b.car))
                      .map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.car}
                        </option>
                      ))}
                  </select>
                </td>
                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b md:w-[3%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden">운전자</div>
                  {[0, 1].map((index) => (
                    <select
                      key={index}
                      value={drivers[index]}
                      onChange={handleDriverChange(index)}
                      className="p-2 ml-3 border rounded-md hover:opacity-60 sm:w-full sm:ml-0"
                    >
                      <option disabled value="">
                        운전자 선택
                      </option>
                      {names
                        ?.sort((a, b) => a.username.localeCompare(b.username))
                        .map((item, index) => (
                          <option key={index} value={item.username}>
                            {item.username}
                          </option>
                        ))}
                    </select>
                  ))}
                </td>
                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b w-[15%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden">행선지</div>
                  <input
                    type="text"
                    onChange={handleDrivingDestinationChange}
                    className="w-full p-2 transition duration-150 ease-in-out border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </td>

                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b md:w-[5%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden">출발(Km)</div>
                  <input
                    disabled={car === privateCarId}
                    type="number"
                    onChange={handleStartKMChange}
                    className="w-full p-2 transition duration-150 ease-in-out border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 hover:opacity-60"
                  />
                </td>
                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b md:w-[5%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden">도착(Km)</div>
                  <input
                    disabled={car === privateCarId}
                    type="number"
                    onChange={handleEndKMChange}
                    className="w-full p-2 transition duration-150 ease-in-out border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 hover:opacity-60"
                  />
                </td>
                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b md:w-[5%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden">
                    주행거리(Km)
                  </div>
                  <input
                    disabled={car !== privateCarId}
                    type="number"
                    value={car === privateCarId ? totalKM : endKM - startKM}
                    onChange={handleTotalKMChange}
                    className="w-full p-2 transition duration-150 ease-in-out border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 hover:opacity-60"
                  />
                </td>

                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b md:w-[5%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden">주유비</div>
                  <input
                    type="number"
                    onChange={handleFuelCostChange}
                    className="w-full p-2 transition duration-150 ease-in-out border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 hover:opacity-60"
                  />
                </td>
                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b md:w-[5%] whitespace-nowrap">
                  <div className="sm:font-bold sm:mb-2 md:hidden">하이패스</div>
                  <input
                    type="number"
                    onChange={handleTollChange}
                    className="w-full p-2 transition duration-150 ease-in-out border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 hover:opacity-60"
                  />
                </td>
                <td className="sm:mb-4 sm:w-full md:border-r border-gray-300 md:border-b md:w-[10%]">
                  <div className="sm:font-bold sm:mb-2 md:hidden">기타</div>
                  <div className="flex">
                    <select
                      defaultValue=""
                      onChange={handleEtcNameChange}
                      className="w-full p-2 ml-3 border rounded-md hover:opacity-60 sm:w-full sm:ml-0 md:mr-2"
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
                      onChange={handleEtcCostChange}
                      className="w-full p-2 transition duration-150 ease-in-out border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 hover:opacity-60"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center w-full mt-8">
          <button
            onClick={onClickComplete}
            className="bg-[#00ab39] rounded-lg text-white py-2 px-4 hover:opacity-60 w-[15%] h-12 font-bold text-xl sm:w-full my-2"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default DriveInput;
