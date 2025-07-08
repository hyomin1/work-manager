import React, { useEffect, useState } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { api } from '../../../api';
import { useQueryClient } from '@tanstack/react-query';
import { WrenchIcon, XIcon } from 'lucide-react';
import type { ICarServiceBase } from '../../../interfaces/interface';

dayjs.locale('ko');

interface IServiceEdit {
  item: ICarServiceBase;
  setEditingItemId: React.Dispatch<React.SetStateAction<string>>;
}

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#f8fafc',
    '&:hover fieldset': {
      borderColor: '#3b82f6',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3b82f6',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#3b82f6',
  },
};

function ServiceEdit({ item, setEditingItemId }: IServiceEdit) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<ICarServiceBase>({
    _id: item._id,
    date: item.date,
    type: item.type,
    mileage: item.mileage,
    note: item.note,
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

  const validateForm = () => {
    if (!formData.date) {
      return alert('정비 일자를 선택해주세요');
    }
    if (!formData.type) {
      return alert('정비 유형을 선택해주세요');
    }
    if (!formData.mileage.base) {
      return alert('최근 점검(km)을 입력해주세요');
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
    const response = await api.put('/api/driving-inform/editService', {
      ...formData,
    });
    if (response.status !== 200) {
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['services'] });
    setEditingItemId('');
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
            onClick={() => setEditingItemId('')}
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
                  value={dayjs(formData.date)}
                  onChange={(newDate: Dayjs | null) =>
                    newDate && updateField('date', newDate.toDate())
                  }
                  sx={{
                    width: '100%',
                    ...inputStyle,
                  }}
                />
              </LocalizationProvider>
            </div>

            <TextField
              fullWidth
              label='정비 유형*'
              variant='outlined'
              value={formData.type}
              onChange={(e) => updateField('type', e.target.value)}
              sx={inputStyle}
            />

            <div className='flex gap-4'>
              <TextField
                fullWidth
                label='최근 점검(km)*'
                variant='outlined'
                value={formData.mileage.base}
                onChange={(e) =>
                  updateField('mileage', {
                    ...formData.mileage,
                    base: e.target.value,
                  })
                }
                sx={inputStyle}
              />

              <TextField
                fullWidth
                label='다음 점검(km)'
                variant='outlined'
                value={formData.mileage.next}
                onChange={(e) =>
                  updateField('mileage', {
                    ...formData.mileage,
                    next: e.target.value,
                  })
                }
                sx={inputStyle}
              />
            </div>

            <TextField
              fullWidth
              multiline
              rows={3}
              label='비고'
              variant='outlined'
              value={formData.note}
              onChange={(e) => updateField('note', e.target.value)}
              sx={inputStyle}
            />
          </div>

          <div className='flex justify-end space-x-3 pt-8'>
            <button
              type='button'
              onClick={() => setEditingItemId('')}
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

export default ServiceEdit;
