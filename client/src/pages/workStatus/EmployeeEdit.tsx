import React, { useEffect, useState } from 'react';
import { useCustomQueries } from '../../hooks/useCustomQuery';
import type { IInform, FormData } from '../../interfaces/interface';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '../../api';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import { Autocomplete, TextField } from '@mui/material';
import { X } from 'lucide-react';
dayjs.locale('ko');

interface IEditInformProps {
  item: IInform;
  currentDate: Date;
  setEditingItemId: React.Dispatch<React.SetStateAction<string>>;
  onUpdate?: (updatedData: any) => void;
}

function EmployeeEdit({
  item,
  setEditingItemId,
  currentDate,
  onUpdate,
}: IEditInformProps) {
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

  const queryClient = useQueryClient();
  const isLoading =
    namesLoading ||
    destinationsLoading ||
    businessesLoading ||
    worksLoading ||
    carsLoading;

  const [formData, setFormData] = useState<FormData>({
    date: currentDate,
    username: item.username,
    destination: item.destination,
    business: item.business,
    work: item.work,
    car: item.car,
    startDate: item.startDate,
    endDate: item.endDate,
    remarks: item.remarks,
  });

  // ESC 키 이벤트 핸들러
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEditingItemId('');
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setEditingItemId]);

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const carOptions = [
    '선택 안함',
    ...(cars
      ? cars.sort((a, b) => a.car.localeCompare(b.car)).map((item) => item.car)
      : []),
  ];

  useEffect(() => {
    if (formData.business && businessesData && destinationsData) {
      const selectedBusiness = businessesData.find(
        (b) => b.business === formData.business
      );
      if (selectedBusiness) {
        const matchingDestination = destinationsData.find(
          (dest) => dest._id === selectedBusiness.destinationId
        );
        if (
          matchingDestination &&
          matchingDestination.destination !== formData.destination
        ) {
          updateField('destination', matchingDestination.destination);
        }
      }
    }
  }, [formData, businessesData, destinationsData]);

  const validateForm = () => {
    if (!formData.username) return alert('이름을 선택해주세요');
    if (!formData.destination) return alert('방문지를 선택해주세요');
    if (!formData.business) return alert('사업명을 선택해주세요');
    if (!formData.work) return alert('업무를 선택해주세요');
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();

    const updatedData = {
      _id: item._id,
      ...formData,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };

    const response = await api.put(
      '/api/employee-inform/editInform',
      updatedData
    );
    if (response.status !== 200) return;

    alert(response.data.message);
    queryClient.invalidateQueries({ queryKey: ['employeeInform'] });
    if (onUpdate) onUpdate(updatedData);
    setEditingItemId('');
  };

  if (isLoading) {
    return (
      <div className='fixed inset-0 z-10 flex items-center justify-center bg-gray-800/50'>
        <div className='rounded-lg bg-white p-8 shadow-xl'>
          <div className='flex items-center space-x-4'>
            <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
            <span className='text-lg font-medium text-gray-700'>로딩중...</span>
          </div>
        </div>
      </div>
    );
  }

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      '& fieldset': {
        borderColor: '#E5E7EB',
      },
      '&:hover fieldset': {
        borderColor: '#3B82F6',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3B82F6',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#6B7280',
      '&.Mui-focused': {
        color: '#3B82F6',
      },
    },
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-900/40 px-4 backdrop-blur-[2px]'>
      <div className='relative w-full max-w-2xl transform rounded-2xl bg-gradient-to-b from-white to-gray-50 shadow-[0_0_50px_rgba(0,0,0,0.15)] transition-all'>
        <button
          onClick={() => setEditingItemId('')}
          className='absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600'
        >
          <X size={20} />
        </button>

        <div className='border-b border-gray-200 px-6 py-4'>
          <h2 className='text-center text-xl font-semibold text-gray-800'>
            정보 수정
          </h2>
        </div>

        <form onSubmit={onSubmit} className='px-6 py-6'>
          <div className='space-y-5'>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
              <div
                className={`grid ${
                  item.isDaily === 3 ? 'grid-cols-2 gap-4' : 'grid-cols-1'
                }`}
              >
                <MobileDatePicker
                  label='시작일'
                  onChange={(newDate: Dayjs | null) => {
                    if (newDate) {
                      updateField('startDate', newDate.toDate());
                      if (item.isDaily !== 3)
                        updateField('endDate', newDate.toDate());
                    }
                  }}
                  value={dayjs(formData.startDate)}
                  sx={inputStyles}
                />
                {item.isDaily === 3 && (
                  <MobileDatePicker
                    label='종료일'
                    onChange={(newDate: Dayjs | null) =>
                      newDate && updateField('endDate', newDate.toDate())
                    }
                    value={dayjs(formData.endDate)}
                    sx={inputStyles}
                  />
                )}
              </div>
            </LocalizationProvider>

            <Autocomplete
              value={formData.username}
              options={
                names
                  ?.sort((a, b) => a.username.localeCompare(b.username))
                  .map((item) => item.username) || []
              }
              renderInput={(params) => (
                <TextField {...params} label='이름' sx={inputStyles} />
              )}
              onChange={(_, value) => value && updateField('username', value)}
            />

            <Autocomplete
              value={formData.destination}
              options={
                destinationsData
                  ?.sort((a, b) => a.destination.localeCompare(b.destination))
                  .map((item) => item.destination) || []
              }
              renderInput={(params) => (
                <TextField {...params} label='방문지' sx={inputStyles} />
              )}
              onChange={(_, value) => {
                if (value) {
                  updateField('destination', value);
                  updateField('business', '');
                }
              }}
            />

            <Autocomplete
              value={formData.business}
              options={
                businessesData
                  ?.filter((business) => {
                    const matchingDestination = destinationsData?.find(
                      (dest) => dest.destination === formData.destination
                    );
                    return business.destinationId === matchingDestination?._id;
                  })
                  ?.sort((a, b) => a.business.localeCompare(b.business))
                  .map((item) => item.business) || []
              }
              renderInput={(params) => (
                <TextField {...params} label='사업명' sx={inputStyles} />
              )}
              onChange={(_, value) => value && updateField('business', value)}
            />

            <Autocomplete
              value={formData.work}
              options={
                workData
                  ?.sort((a, b) => a.work.localeCompare(b.work))
                  .map((item) => item.work) || []
              }
              renderInput={(params) => (
                <TextField {...params} label='업무' sx={inputStyles} />
              )}
              onChange={(_, value) => value && updateField('work', value)}
            />

            <Autocomplete
              value={formData.car}
              options={carOptions}
              renderInput={(params) => (
                <TextField {...params} label='차량' sx={inputStyles} />
              )}
              onChange={(_, value) => value && updateField('car', value)}
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label='비고'
              value={formData.remarks}
              onChange={(e) => updateField('remarks', e.target.value)}
              sx={inputStyles}
            />
          </div>

          <div className='mt-8 flex justify-end space-x-3'>
            <button
              type='button'
              onClick={() => setEditingItemId('')}
              className='rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400'
            >
              취소
            </button>
            <button
              type='submit'
              className='rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              변경
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeEdit;
