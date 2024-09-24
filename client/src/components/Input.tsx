import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  formDate,
  getBusinesses,
  getCars,
  getDestinations,
  getNames,
  getStates,
} from "../api";
import {
  IBusinesses,
  ICars,
  IDestinations,
  INames,
  IStates,
} from "../interfaces/interface";
import axiosApi from "../axios";
import { useNavigate } from "react-router-dom";

function Input() {
  const [username, setName] = useState("");
  const [destination1, setDestination1] = useState("");
  const [destination2, setDestination2] = useState("");
  const [destination3, setDestination3] = useState("");
  const [business, setBusiness] = useState("");
  const [state, setState] = useState("");
  const [car, setCar] = useState("");

  const navigate = useNavigate();

  const { data: names, isLoading: namesLoading } = useQuery<INames[]>({
    queryKey: ["names"],
    queryFn: getNames,
  });
  const { data: destinations, isLoading: destinationsLoading } = useQuery<
    IDestinations[]
  >({
    queryKey: ["destinations"],
    queryFn: getDestinations,
  });

  const { data: businesses, isLoading: businessesLoading } = useQuery<
    IBusinesses[]
  >({
    queryKey: ["businesses"],
    queryFn: getBusinesses,
  });

  const { data: states, isLoading: statesLoading } = useQuery<IStates[]>({
    queryKey: ["states"],
    queryFn: getStates,
  });

  const { data: cars, isLoading: carsLoading } = useQuery<ICars[]>({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setName(event.target.value);
  };

  const handleDestinationChange1 = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDestination1(event.target.value);
  };

  const handleDestinationChange2 = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDestination2(event.target.value);
  };

  const handleDestinationChange3 = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDestination3(event.target.value);
  };

  const handleBusinessChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBusiness(event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
  };

  const handleCarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCar(event.target.value);
  };

  if (
    namesLoading ||
    destinationsLoading ||
    businessesLoading ||
    statesLoading ||
    carsLoading
  ) {
    return <div>Loading...</div>;
  }

  const onClickComplete = async () => {
    if (!username) {
      alert("이름을 선택해주세요");
      return;
    }

    const selectedDestinations = [
      destination1,
      destination2,
      destination3,
    ].filter(Boolean);

    if (selectedDestinations.length === 0) {
      alert("행선지를 선택해주세요");
      return;
    }

    if (!state) {
      alert("상태를 선택해주세요");
      return;
    }

    if (!car) {
      alert("차량을 선택해주세요");
      return;
    }

    try {
      const requests = selectedDestinations.map((destination) =>
        axiosApi.post("/addInform", {
          username,
          destination,
          business,
          state,
          car,
        })
      );

      const responses = await Promise.all(requests);

      if (responses.every((res) => res.status === 200)) {
        alert("성공적으로 입력하였습니다");
        navigate("/");
      }
    } catch (error) {
      alert("정보 입력 중 오류가 발생하였습니다.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center p-10">
      <div className="w-[80%] flex flex-col items-center">
        <div className="mb-4 flex items-center justify-center w-[100%]">
          <span className="mb-4 font-bold text-3xl">{formDate}</span>
        </div>

        <table className="w-[100%] rounded-2xl shadow-lg text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 border-b border-gray-300">이름</th>
              <th className="p-4 border-b border-gray-300">방문지</th>
              <th className="p-4 border-b border-gray-300">사업명</th>
              <th className="p-4 border-b border-gray-300">업무</th>
              <th className="p-4 border-b border-gray-300">차량</th>
              <th className="p-4 border-b border-gray-300"></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              {/* 이름 */}
              <td>
                <select defaultValue="" onChange={handleNameChange}>
                  <option disabled value="">
                    이름 선택
                  </option>
                  {names
                    ?.sort((a, b) => a.username.localeCompare(b.username))
                    .map((item, index) => (
                      <option key={index} value={item.username}>
                        {item.username}
                      </option>
                    ))}
                </select>
              </td>

              {/* 방문지 */}
              <td className="flex flex-col">
                <select defaultValue="" onChange={handleDestinationChange1}>
                  <option disabled value="">
                    방문지 선택
                  </option>
                  {destinations
                    ?.sort((a, b) => a.destination.localeCompare(b.destination))
                    .map((item, index) => (
                      <option key={index} value={item.destination}>
                        {item.destination}
                      </option>
                    ))}
                </select>

                <select defaultValue="" onChange={handleDestinationChange2}>
                  <option disabled value="">
                    방문지 선택
                  </option>
                  {destinations
                    ?.sort((a, b) => a.destination.localeCompare(b.destination))
                    .map((item, index) => (
                      <option key={index} value={item.destination}>
                        {item.destination}
                      </option>
                    ))}
                </select>

                <select defaultValue="" onChange={handleDestinationChange3}>
                  <option disabled value="">
                    방문지 선택
                  </option>
                  {destinations
                    ?.sort((a, b) => a.destination.localeCompare(b.destination))
                    .map((item, index) => (
                      <option key={index} value={item.destination}>
                        {item.destination}
                      </option>
                    ))}
                </select>
              </td>

              {/* 사업명 */}
              <td>
                <select defaultValue="" onChange={handleBusinessChange}>
                  <option disabled value="">
                    선택
                  </option>
                  {businesses
                    ?.sort((a, b) => a.business.localeCompare(b.business))
                    .map((item, index) => (
                      <option key={index} value={item.business}>
                        {item.business}
                      </option>
                    ))}
                </select>
              </td>

              {/* 상태 */}
              <td>
                <select defaultValue="" onChange={handleStateChange}>
                  <option disabled value="">
                    선택
                  </option>
                  {states
                    ?.sort((a, b) => a.state.localeCompare(b.state))
                    .map((item, index) => (
                      <option key={index} value={item.state}>
                        {item.state}
                      </option>
                    ))}
                </select>
              </td>

              {/* 차량 */}
              <td>
                <select defaultValue="" onChange={handleCarChange}>
                  <option disabled value="">
                    차량 선택
                  </option>
                  {cars?.map((item, index) => (
                    <option key={index} value={item.car}>
                      {item.car}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <button
                  onClick={onClickComplete}
                  className="bg-[#00ab39] rounded-lg text-white py-2 px-4 hover:opacity-60"
                >
                  완료
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Input;
