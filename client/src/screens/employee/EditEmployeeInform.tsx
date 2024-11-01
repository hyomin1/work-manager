import React, { useEffect, useState } from 'react';
import { useCustomQueries } from '../../hooks/useCustomQuery';
import { IInform } from '../../interfaces/interface';
import { useQueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../api';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import 'dayjs/locale/ko';
import { Autocomplete, TextField } from '@mui/material';
dayjs.locale('ko');

interface IEditInformProps {
  item: IInform;
  currentDate: Date;
  setEditingItemId: React.Dispatch<React.SetStateAction<string>>;
}

function EditInform({ item, setEditingItemId, currentDate }: IEditInformProps) {
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

  const [date, setDate] = useState(currentDate);
  const [username, setUserName] = useState(item.username);
  const [destination, setDestination] = useState(item.destination);
  const [business, setBusiness] = useState(item.business);
  const [work, setWork] = useState(item.work);
  const [car, setCar] = useState(item.car);
  const [startDate, setStartDate] = useState(item.startDate);
  const [endDate, setEndDate] = useState(item.endDate);
  const [remarks, setRemarks] = useState(item.remarks);

  const queryClient = useQueryClient();

  const carOptions = [
    '선택 안함',
    ...(cars
      ? cars.sort((a, b) => a.car.localeCompare(b.car)).map((item) => item.car)
      : []),
  ];

  useEffect(() => {
    if (business && businessesData && destinationsData) {
      const selectedBusiness = businessesData.find(
        (b) => b.business === business
      );
      if (selectedBusiness) {
        const matchingDestination = destinationsData.find(
          (dest) => dest._id === selectedBusiness.destinationId
        );
        if (
          matchingDestination &&
          matchingDestination.destination !== destination
        ) {
          setDestination(matchingDestination.destination);
        }
      }
    }
  }, [business, businessesData, destinationsData, destination]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) {
      alert('이름을 선택해주세요');
      return;
    }
    if (!destination) {
      alert('방문지를 선택해주세요');
      return;
    }
    if (!business) {
      alert('사업명을 선택해주세요');
      return;
    }
    if (!work) {
      alert('업무를 선택해주세요');
      return;
    }

    const res = await axiosReq.put('/api/employee-inform/editInform', {
      _id: item._id,
      date,
      username,
      destination,
      business,
      work,
      car,
      startDate: item.isDaily === 3 ? startDate : date,
      endDate: item.isDaily === 3 ? endDate : date,
      remarks,
    });
    if (res.status === 200) {
      alert(res.data.message);
      queryClient.invalidateQueries({ queryKey: ['employeeInform'] });
      queryClient.invalidateQueries({ queryKey: ['schedule'] });
      setEditingItemId('');
    }
  };

  const handleCancel = () => {
    setEditingItemId('');
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setDate(newDate.toDate());
    }
  };
  const handleStartDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setStartDate(newDate.toDate());
    }
  };

  const handleEndDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setEndDate(newDate.toDate());
    }
  };

  const handleNameChange = (
    e: React.SyntheticEvent,
    username: string | null
  ) => {
    if (username) {
      setUserName(username);
    }
  };

  const handleDestinationChange = (
    e: React.SyntheticEvent,
    destination: string | null
  ) => {
    if (destination) {
      setDestination(destination);
      setBusiness('');
    }
  };

  const handleBusinessChange = (
    e: React.SyntheticEvent,
    business: string | null
  ) => {
    if (business) {
      setBusiness(business);
    }
  };

  const handleWorkChange = (e: React.SyntheticEvent, work: string | null) => {
    if (work) {
      setWork(work);
    }
  };

  const handleCarChange = (e: React.SyntheticEvent, car: string | null) => {
    if (car) {
      setCar(car);
    }
  };

  if (
    namesLoading ||
    destinationsLoading ||
    businessesLoading ||
    worksLoading ||
    carsLoading ||
    businessesLoading
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 top-0 z-10 flex items-center justify-center w-full px-4 bg-black bg-opacity-65">
      <form
        onSubmit={onSubmit}
        className="flex flex-col p-6 bg-white rounded-lg shadow-lg w-[40%]"
      >
        <h2 className="mb-4 text-xl font-bold text-center">정보 수정</h2>
        <div className="flex flex-col">
          <div className="my-2">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              {item.isDaily === 3 ? (
                <div className="flex mt-4">
                  <MobileDatePicker
                    label="시작일"
                    onChange={handleStartDateChange}
                    value={dayjs(startDate)}
                    sx={{
                      width: '100%',

                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                      },
                    }}
                  />
                  <MobileDatePicker
                    label="종료일"
                    onChange={handleEndDateChange}
                    value={dayjs(endDate)}
                    sx={{
                      width: '100%',

                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                      },
                    }}
                  />
                </div>
              ) : (
                <MobileDatePicker
                  label="시작일"
                  onChange={handleDateChange}
                  value={dayjs(date)}
                  sx={{
                    width: '100%',

                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                    },
                  }}
                />
              )}
            </LocalizationProvider>
          </div>

          <div className="my-2">
            <Autocomplete
              value={username}
              options={
                names
                  ?.sort((a, b) => a.username.localeCompare(b.username))
                  .map((item) => item.username) || []
              }
              renderInput={(names) => <TextField {...names} label="이름" />}
              onChange={handleNameChange}
            />
          </div>
          <div className="my-2">
            <Autocomplete
              value={destination}
              options={
                destinationsData
                  ?.sort((a, b) => a.destination.localeCompare(b.destination))
                  .map((item) => item.destination) || []
              }
              renderInput={(destinations) => (
                <TextField {...destinations} label="방문지" />
              )}
              onChange={handleDestinationChange}
            />
          </div>
          <div className="my-2">
            <Autocomplete
              value={business}
              options={
                businessesData
                  ?.filter((business) => {
                    const matchingDestination = destinationsData?.find(
                      (dest) => dest.destination === destination
                    );
                    return business.destinationId === matchingDestination?._id;
                  })
                  ?.sort((a, b) => a.business.localeCompare(b.business))
                  .map((item) => item.business) || []
              }
              renderInput={(businesses) => (
                <TextField {...businesses} label="사업명" />
              )}
              onChange={handleBusinessChange}
            />
          </div>
          <div className="my-2">
            <Autocomplete
              value={work}
              options={
                workData
                  ?.sort((a, b) => a.work.localeCompare(b.work))
                  .map((item) => item.work) || []
              }
              renderInput={(works) => <TextField {...works} label="업무" />}
              onChange={handleWorkChange}
            />
          </div>
          <div className="my-2">
            <Autocomplete
              options={carOptions}
              renderInput={(cars) => <TextField {...cars} label="차량" />}
              onChange={handleCarChange}
              value={car}
            />
          </div>
          <div className="my-2">
            <TextField
              fullWidth
              multiline
              rows={2}
              label="비고"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between mt-2">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:opacity-80"
          >
            변경
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:opacity-80"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditInform;
