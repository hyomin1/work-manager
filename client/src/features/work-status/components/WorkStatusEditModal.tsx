import React, { useEffect, useState } from 'react';
import { useCommonData } from '../../../hooks/useCommonData';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import { Autocomplete, TextField } from '@mui/material';
import { X } from 'lucide-react';
import type { EditWorkStatus, WorkStatus } from '../../../types/work';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { inputStyles } from '../styles/style';
import useWorkStatus from '../hooks/useWorkStatus';
import useEscapeKey from '../hooks/useEscapeKey';
import toast from 'react-hot-toast';
import Modal from '../../../components/common/Modal';
dayjs.locale('ko');

interface Props {
  editWork: WorkStatus;
  setEditId: (id: string) => void;
}

export default function WorkStatusEditModal({ editWork, setEditId }: Props) {
  const { usernames, destinations, businesses, works, cars, isLoading } =
    useCommonData();
  const { edit } = useWorkStatus();
  const { isDaily } = editWork;

  const [form, setForm] = useState<EditWorkStatus>(editWork);

  const onClose = () => setEditId('');

  useEscapeKey(onClose);

  const updateField = <K extends keyof EditWorkStatus>(
    field: K,
    value: WorkStatus[K]
  ) => {
    setForm((prev) => ({
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
    setForm(editWork);
  }, [editWork]);

  useEffect(() => {
    if (form.business && businesses && destinations) {
      const selectedBusiness = businesses.find(
        (b) => b.business === form.business
      );
      if (selectedBusiness) {
        const matchingDestination = destinations.find(
          (dest) => dest._id === selectedBusiness.destinationId
        );
        if (
          matchingDestination &&
          matchingDestination.destination !== form.destination
        ) {
          updateField('destination', matchingDestination.destination);
        }
      }
    }
  }, [form.business, form.destination, businesses, destinations]);

  const validateForm = () => {
    if (!form.username) return '이름을 선택해주세요';
    if (!form.destination) return '방문지를 선택해주세요';
    if (!form.business) return '사업명을 선택해주세요';
    if (!form.work) return '업무를 선택해주세요';
    return null;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validateForm();
    if (error) return toast.error(error);

    const updatedData = {
      ...form,
      startDate: form.startDate,
      endDate: form.endDate,
    };
    edit.mutate(updatedData, {
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

      <form onSubmit={handleSubmit} className='px-6 py-6'>
        <div className='space-y-5'>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
            <div
              className={`grid ${
                isDaily === 3 ? 'grid-cols-2 gap-4' : 'grid-cols-1'
              }`}
            >
              <MobileDatePicker
                label='시작일'
                onChange={(newDate: Dayjs | null) => {
                  if (newDate) {
                    updateField('startDate', newDate.toDate());
                    if (isDaily !== 3) updateField('endDate', newDate.toDate());
                  }
                }}
                value={dayjs(form.startDate)}
                sx={inputStyles}
              />
              {isDaily === 3 && (
                <MobileDatePicker
                  label='종료일'
                  onChange={(newDate: Dayjs | null) =>
                    newDate && updateField('endDate', newDate.toDate())
                  }
                  value={dayjs(form.endDate)}
                  sx={inputStyles}
                />
              )}
            </div>
          </LocalizationProvider>

          <Autocomplete
            value={form.username}
            options={
              usernames
                ?.sort((a, b) => a.username.localeCompare(b.username))
                .map((item) => item.username) || []
            }
            renderInput={(params) => (
              <TextField {...params} label='이름' sx={inputStyles} />
            )}
            onChange={(_, value) => value && updateField('username', value)}
          />

          <Autocomplete
            value={form.destination}
            options={
              destinations
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
            value={form.business}
            options={
              businesses
                ?.filter((business) => {
                  const matchingDestination = destinations?.find(
                    (dest) => dest.destination === form.destination
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
            value={form.work}
            options={
              works
                ?.sort((a, b) => a.work.localeCompare(b.work))
                .map((item) => item.work) || []
            }
            renderInput={(params) => (
              <TextField {...params} label='업무' sx={inputStyles} />
            )}
            onChange={(_, value) => value && updateField('work', value)}
          />

          <Autocomplete
            value={form.car}
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
            value={form.remarks}
            onChange={(e) => updateField('remarks', e.target.value)}
            sx={inputStyles}
          />
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
