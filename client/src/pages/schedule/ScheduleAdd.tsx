import React, { useState, useEffect } from 'react';
import { type SetStateAction } from 'react';
import { useCommonData } from '../../hooks/useCommonData';
import { Autocomplete, TextField } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import { api } from '../../api';

dayjs.locale('ko');

interface IScheduleAdd {
  showAddForm: boolean;
  setShowAddForm: React.Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  date: Date | null;
}

export default function ScheduleAdd({
  setShowAddForm,
  refetch,
  date,
}: IScheduleAdd) {
  const {
    usernames,
    usernamesLoading,
    destinations,
    destinationsLoading,
    businesses,
    businessesLoading,
    works,
    worksLoading,
    cars,
    carsLoading,
  } = useCommonData();

  const [formData, setFormData] = useState({
    startDate: date,
    endDate: date,
    username: '',
    destination: '',
    business: '',
    work: '',
    car: '',
    remarks: '',
  });

  const isLoading =
    usernamesLoading ||
    destinationsLoading ||
    businessesLoading ||
    worksLoading ||
    carsLoading;

  const carOptions = [
    '선택 안함',
    ...(cars
      ? cars.sort((a, b) => a.car.localeCompare(b.car)).map((item) => item.car)
      : []),
  ];

  const handleClick = async () => {
    const res = await api.post('/api/employee-inform/addInform', {
      username: formData.username,
      destination: formData.destination,
      business: formData.business,
      work: formData.work,
      car: formData.car,
      startDate: formData.startDate,
      endDate: formData.endDate,
      remarks: formData.remarks,
    });
    if (res.status === 200) {
      refetch();
      setShowAddForm(false);
    }
  };

  useEffect(() => {
    if (formData.business && businesses && destinations) {
      const selectedBusiness = businesses.find(
        (b) => b.business === formData.business
      );
      if (selectedBusiness) {
        const matchingDestination = destinations.find(
          (dest) => dest._id === selectedBusiness.destinationId
        );
        if (
          matchingDestination &&
          matchingDestination.destination !== formData.destination
        ) {
          setFormData((prev) => ({
            ...prev,
            destination: matchingDestination.destination,
          }));
        }
      }
    }
  }, [formData.business, businesses, destinations, formData.destination]);

  const datePickerStyles = {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
    },
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='fixed inset-0 top-0 z-10 flex w-full items-center justify-center bg-black bg-opacity-65 px-4'>
      <div className='flex w-[40%] flex-col rounded-lg bg-white p-6 shadow-lg'>
        <h2 className='mb-4 text-center text-xl font-bold'>일정 추가</h2>
        <div className='flex flex-col'>
          <div className='my-2'>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
              <div className='mt-4 flex gap-2'>
                <MobileDatePicker
                  label='시작일'
                  value={dayjs(formData.startDate)}
                  onChange={(newDate: Dayjs | null) =>
                    newDate &&
                    setFormData((prev) => ({
                      ...prev,
                      startDate: newDate.toDate(),
                    }))
                  }
                  sx={datePickerStyles}
                />
              </div>
            </LocalizationProvider>
          </div>

          <div className='my-2'>
            <Autocomplete
              value={formData.username}
              options={
                usernames
                  ?.sort((a, b) => a.username.localeCompare(b.username))
                  .map((item) => item.username) || []
              }
              renderInput={(params) => <TextField {...params} label='이름' />}
              onChange={(_, value) =>
                setFormData((prev) => ({
                  ...prev,
                  username: value || '',
                }))
              }
            />
          </div>

          <div className='my-2'>
            <Autocomplete
              value={formData.destination}
              options={
                destinations
                  ?.sort((a, b) => a.destination.localeCompare(b.destination))
                  .map((item) => item.destination) || []
              }
              renderInput={(params) => <TextField {...params} label='방문지' />}
              onChange={(_, value) => {
                setFormData((prev) => ({
                  ...prev,
                  destination: value || '',
                  business: '', // Reset business when destination changes
                }));
              }}
            />
          </div>

          <div className='my-2'>
            <Autocomplete
              value={formData.business}
              options={
                businesses
                  ?.filter((business) => {
                    const matchingDestination = destinations?.find(
                      (dest) => dest.destination === formData.destination
                    );
                    return business.destinationId === matchingDestination?._id;
                  })
                  ?.sort((a, b) => a.business.localeCompare(b.business))
                  .map((item) => item.business) || []
              }
              renderInput={(params) => <TextField {...params} label='사업명' />}
              onChange={(_, value) =>
                setFormData((prev) => ({
                  ...prev,
                  business: value || '',
                }))
              }
            />
          </div>

          <div className='my-2'>
            <Autocomplete
              value={formData.work}
              options={
                works
                  ?.sort((a, b) => a.work.localeCompare(b.work))
                  .map((item) => item.work) || []
              }
              renderInput={(params) => <TextField {...params} label='업무' />}
              onChange={(_, value) =>
                setFormData((prev) => ({
                  ...prev,
                  work: value || '',
                }))
              }
            />
          </div>

          <div className='my-2'>
            <Autocomplete
              value={formData.car}
              options={carOptions}
              renderInput={(params) => <TextField {...params} label='차량' />}
              onChange={(_, value) =>
                setFormData((prev) => ({
                  ...prev,
                  car: value || '',
                }))
              }
            />
          </div>

          <div className='my-2'>
            <TextField
              fullWidth
              multiline
              rows={2}
              label='비고'
              value={formData.remarks}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  remarks: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className='mt-2 flex justify-between'>
          <button
            onClick={handleClick}
            type='button'
            className='rounded bg-blue-500 px-4 py-2 text-white hover:opacity-80'
          >
            추가
          </button>
          <button
            type='button'
            onClick={() => setShowAddForm(false)}
            className='rounded bg-gray-300 px-4 py-2 hover:opacity-80'
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
