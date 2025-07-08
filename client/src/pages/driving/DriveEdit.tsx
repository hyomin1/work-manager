import React, { useEffect, useState } from 'react';
import type { IDrivingInform } from '../../interfaces/interface';
import { useCustomQueries } from '../../hooks/useCustomQuery';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '../../api';
import { X, Plus, Minus } from 'lucide-react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import { Autocomplete, TextField } from '@mui/material';
dayjs.locale('ko');

interface IEditInformProps {
  item: IDrivingInform;
  setEditingItemId: React.Dispatch<React.SetStateAction<string>>;
}

const inputStyles = {
  width: '100%',
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

interface FormData {
  driveDay: Date;
  usernames: string[];
  drivingDestination: string;
  startKM: number;
  endKM: number;
  fuelCost: number;
  toll: number;
  etc: {
    name: string;
    cost: number;
  };
}

function EditDrivingInform({ item, setEditingItemId }: IEditInformProps) {
  const { names, namesLoading, etcNames, etcNamesLoading } = useCustomQueries();
  const queryClient = useQueryClient();
  const isLoading = namesLoading || etcNamesLoading;

  const [formData, setFormData] = useState<FormData>({
    driveDay: item.driveDay,
    usernames: item.username.split(', '),
    drivingDestination: item.drivingDestination,
    startKM: item.startKM,
    endKM: item.endKM,
    fuelCost: item.fuelCost,
    toll: item.toll,
    etc: item.etc,
  });

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

  const handleAddDriver = () => {
    setFormData((prev) => ({
      ...prev,
      usernames: [...prev.usernames, ''],
    }));
  };

  const handleRemoveDriver = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      usernames: prev.usernames.filter((_, i) => i !== index),
    }));
  };

  const handleDriverChange = (index: number, value: string | null) => {
    if (!value) return;
    setFormData((prev) => ({
      ...prev,
      usernames: prev.usernames.map((username, i) =>
        i === index ? value : username
      ),
    }));
  };

  const validateForm = () => {
    if (!formData.driveDay) return alert('날짜를 선택해주세요');
    if (formData.usernames.some((username) => !username))
      return alert('운전자를 선택해주세요');
    if (!formData.drivingDestination) return alert('행선지를 입력해주세요');
    if (!formData.startKM || !formData.endKM)
      return alert('주행거리를 입력해주세요');
    if (formData.etc.name && !formData.etc.cost)
      return alert('기타 비용을 입력해주세요');
    if (formData.etc.cost && !formData.etc.name)
      return alert('기타 항목을 선택해주세요');
    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const response = await api.put('/api/driving-inform/editInform', {
      _id: item._id,
      ...formData,
      username: formData.usernames.join(', '),
    });

    if (response.status === 200) {
      alert(response.data.message);
      queryClient.invalidateQueries({ queryKey: ['drivingInform'] });
      setEditingItemId('');
    }
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
              <MobileDatePicker
                label='날짜'
                onChange={(newDate: Dayjs | null) => {
                  if (newDate) {
                    updateField('driveDay', newDate.toDate());
                  }
                }}
                value={dayjs(formData.driveDay)}
                sx={inputStyles}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>

            <div className='space-y-3'>
              <div className='flex items-center justify-between px-2'>
                <label className='text-sm font-medium text-gray-700'>
                  운전자
                </label>
                <button
                  type='button'
                  onClick={handleAddDriver}
                  className='flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-sm text-blue-600 hover:bg-blue-100'
                >
                  <Plus size={16} />
                  추가
                </button>
              </div>
              {formData.usernames.map((username, index) => (
                <div key={index} className='flex gap-2'>
                  <Autocomplete
                    value={username}
                    options={
                      names
                        ?.sort((a, b) => a.username.localeCompare(b.username))
                        .map((item) => item.username) || []
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={`운전자 ${index + 1}`}
                        sx={inputStyles}
                      />
                    )}
                    onChange={(_, value) => handleDriverChange(index, value)}
                    className='flex-1'
                  />
                  {formData.usernames.length > 1 && (
                    <button
                      type='button'
                      onClick={() => handleRemoveDriver(index)}
                      className='flex h-14 w-14 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50'
                    >
                      <Minus size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <TextField
              fullWidth
              label='행선지'
              value={formData.drivingDestination}
              onChange={(e) =>
                updateField('drivingDestination', e.target.value)
              }
              sx={inputStyles}
            />

            <TextField
              fullWidth
              type='number'
              label='출발(Km)'
              value={formData.startKM}
              onChange={(e) => updateField('startKM', parseInt(e.target.value))}
              sx={inputStyles}
            />

            <TextField
              fullWidth
              type='number'
              label='도착(Km)'
              value={formData.endKM}
              onChange={(e) => updateField('endKM', parseInt(e.target.value))}
              sx={inputStyles}
            />

            <TextField
              fullWidth
              type='number'
              label='주유비'
              value={formData.fuelCost}
              onChange={(e) =>
                updateField('fuelCost', parseInt(e.target.value))
              }
              sx={inputStyles}
            />

            <TextField
              fullWidth
              type='number'
              label='하이패스'
              value={formData.toll}
              onChange={(e) => updateField('toll', parseInt(e.target.value))}
              sx={inputStyles}
            />

            <div className='grid grid-cols-2 gap-4'>
              <Autocomplete
                value={formData.etc.name}
                options={
                  etcNames
                    ?.sort((a, b) => a.etcName.localeCompare(b.etcName))
                    .map((item) => item.etcName) || []
                }
                renderInput={(params) => (
                  <TextField {...params} label='기타 항목' sx={inputStyles} />
                )}
                onChange={(_, value) =>
                  updateField('etc', { ...formData.etc, name: value || '' })
                }
              />

              <TextField
                fullWidth
                type='number'
                label='기타 비용'
                value={formData.etc.cost}
                onChange={(e) =>
                  updateField('etc', {
                    ...formData.etc,
                    cost: parseInt(e.target.value),
                  })
                }
                sx={inputStyles}
              />
            </div>
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

export default EditDrivingInform;
