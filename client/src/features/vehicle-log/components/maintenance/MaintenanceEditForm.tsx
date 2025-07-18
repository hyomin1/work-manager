import React, { useState } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { WrenchIcon, XIcon } from 'lucide-react';
import type { MaintenanceEditForm } from '../../types/vehicleLog';
import { inputStyles } from '../../../../styles/style';
import useEscapeKey from '../../../work-status/hooks/useEscapeKey';
import toast from 'react-hot-toast';
import useVehicleLog from '../../hooks/useVehicle';

dayjs.locale('ko');

interface Props {
  item: MaintenanceEditForm;
  setEditId: (editId: string) => void;
}

export default function MaintenanceEditForm({ item, setEditId }: Props) {
  const [form, setForm] = useState<MaintenanceEditForm>({
    _id: item._id,
    date: item.date,
    type: item.type,
    mileage: item.mileage,
    note: item.note,
  });

  const { date, type, mileage, note } = form;

  const { editMaintenance } = useVehicleLog();

  useEscapeKey(() => setEditId(''));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!date) return '정비 일자를 선택해주세요';
    if (!type) return '정비 유형을 선택해주세요';
    if (!mileage.base) return '최근 점검(km)을 입력해주세요';
    return null;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      toast.error(error);
    }
    editMaintenance.mutate(form, {
      onSuccess: () => setEditId(''),
    });
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm'>
      <div className='w-full max-w-[500px] overflow-hidden rounded-[24px] bg-white shadow-2xl'>
        <div className='relative bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4'>
          <div className='flex items-center space-x-3'>
            <WrenchIcon className='h-6 w-6 text-white' />
            <h2 className='text-xl font-bold text-white'>정비 정보 수정</h2>
          </div>
          <button
            onClick={() => setEditId('')}
            className='absolute right-4 top-4 text-white/80 transition-colors hover:text-white'
          >
            <XIcon className='h-5 w-5' />
          </button>
        </div>

        <form onSubmit={onSubmit} className='p-6'>
          <div className='space-y-4'>
            <div>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale='ko'
              >
                <MobileDatePicker
                  label='정비 일자*'
                  format='YYYY.MM.DD'
                  value={dayjs(date)}
                  onChange={(newDate) =>
                    newDate &&
                    setForm((prev) => ({
                      ...prev,
                      date: newDate.toDate(),
                    }))
                  }
                  sx={{
                    width: '100%',
                    ...inputStyles,
                  }}
                />
              </LocalizationProvider>
            </div>

            <TextField
              fullWidth
              label='정비 유형*'
              variant='outlined'
              value={type}
              name='type'
              onChange={handleChange}
              sx={inputStyles}
            />

            <div className='flex gap-4'>
              <TextField
                fullWidth
                label='최근 점검(km)*'
                variant='outlined'
                value={mileage.base}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    mileage: {
                      ...prev.mileage,
                      base: e.target.value,
                    },
                  }))
                }
                sx={inputStyles}
              />

              <TextField
                fullWidth
                label='다음 점검(km)'
                variant='outlined'
                value={mileage.next}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    mileage: {
                      ...prev.mileage,
                      next: e.target.value,
                    },
                  }))
                }
                sx={inputStyles}
              />
            </div>

            <TextField
              fullWidth
              multiline
              rows={3}
              label='비고'
              name='note'
              variant='outlined'
              value={note}
              onChange={handleChange}
              sx={inputStyles}
            />
          </div>

          <div className='flex justify-end space-x-3 pt-8'>
            <button
              type='button'
              onClick={() => setEditId('')}
              className='rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200'
            >
              취소
            </button>
            <button
              type='submit'
              className='rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
