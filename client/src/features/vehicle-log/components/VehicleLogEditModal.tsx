import React, { useState } from 'react';
import { useCommonData } from '../../../hooks/useCommonData';
import { X, Plus, Minus } from 'lucide-react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import { Autocomplete, TextField } from '@mui/material';
import { inputStyles } from '../../../styles/style';
import type { VehicleLog } from '../types/vehicleLog';
import { useVehicleLogStore } from '../stores/useVehicleLogStore';
import useEscapeKey from '../../../hooks/useEscapeKey';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import useVehicleLog from '../hooks/useVehicle';
import toast from 'react-hot-toast';
import Modal from '../../../components/common/Modal';
import { FIELDS } from '../constants/vehicleLog';
dayjs.locale('ko');

interface Props {
  editVehicleLog: VehicleLog;
}

export default function VehicleLogEditModal({ editVehicleLog }: Props) {
  const { usernames, usernamesLoading, etcList, etcListLoading } =
    useCommonData();

  const isLoading = usernamesLoading || etcListLoading;
  const setEditId = useVehicleLogStore((state) => state.setEditId);
  const [form, setForm] = useState<VehicleLog>(editVehicleLog);
  const {
    driveDay,
    username,
    drivingDestination,
    startKM,
    endKM,

    etc,
  } = form;

  const onClose = () => setEditId('');
  const { edit } = useVehicleLog();

  useEscapeKey(onClose);

  const updateField = <K extends keyof VehicleLog>(
    field: K,
    value: VehicleLog[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddDriver = () => {
    setForm((prev) => ({
      ...prev,
      username: [...prev.username, ''],
    }));
  };

  const handleRemoveDriver = (index: number) => {
    setForm((prev) => ({
      ...prev,
      username: prev.username.filter((_, i) => i !== index),
    }));
  };

  const handleUsernameChange = (index: number, value: string | null) => {
    if (!value) return;
    setForm((prev) => ({
      ...prev,
      username: prev.username.map((username, i) =>
        i === index ? value : username
      ),
    }));
  };

  const validateForm = () => {
    if (!driveDay) return '날짜를 선택해주세요';
    if (username.length === 0) return '운전자를 선택해주세요';
    if (!drivingDestination) return '행선지를 입력해주세요';
    if (!startKM || !endKM) return '주행거리를 입력해주세요';
    if (etc.name && !etc.cost) return '기타 비용을 입력해주세요';
    if (etc.cost && !etc.name) return '기타 항목을 선택해주세요';
    return null;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validateForm();
    if (error) return toast.error(error);
    edit.mutate(form, {
      onSuccess: onClose,
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Modal onClose={onClose}>
      <button
        onClick={onClose}
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
              value={dayjs(driveDay)}
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
            {username?.map((username, index) => (
              <div key={index} className='flex gap-2'>
                <Autocomplete
                  value={username}
                  options={
                    usernames
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
                  onChange={(_, value) => handleUsernameChange(index, value)}
                  className='flex-1'
                />

                <button
                  type='button'
                  onClick={() => handleRemoveDriver(index)}
                  className='flex h-14 w-14 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50'
                >
                  <Minus size={20} />
                </button>
              </div>
            ))}
          </div>

          {FIELDS.map(({ key, label }) => (
            <TextField
              key={key}
              fullWidth
              label={label}
              type={typeof form[key] === 'number' ? 'number' : 'text'}
              value={form[key]}
              onChange={(e) => {
                const value =
                  typeof form[key] === 'number'
                    ? parseInt(e.target.value)
                    : e.target.value;
                updateField(key, value);
              }}
              sx={inputStyles}
            />
          ))}
          <div className='grid grid-cols-2 gap-4'>
            <Autocomplete
              value={etc.name}
              options={
                etcList
                  ?.sort((a, b) => a.etcName.localeCompare(b.etcName))
                  .map((item) => item.etcName) || []
              }
              renderInput={(params) => (
                <TextField {...params} label='기타 항목' sx={inputStyles} />
              )}
              onChange={(_, value) =>
                updateField('etc', { ...etc, name: value || '' })
              }
            />

            <TextField
              fullWidth
              type='number'
              label='기타 비용'
              value={etc.cost}
              onChange={(e) =>
                updateField('etc', {
                  ...etc,
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
            onClick={onClose}
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
    </Modal>
  );
}
