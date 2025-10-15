import { Modal, Box, TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react';
import { WrenchIcon, XIcon } from 'lucide-react';
import useEscapeKey from '../../../../hooks/useEscapeKey';
import { serviceInputStyle, serviceStyle } from '../../../../styles/style';
import type { MaintenanceBase } from '../../types/vehicleLog';
import useVehicleLog from '../../hooks/useVehicle';

interface Props {
  open: boolean;
  onClose: () => void;
  carId: string;
}

export default function MaintenanceAddForm({ open, carId, onClose }: Props) {
  const [form, setForm] = useState<MaintenanceBase>({
    date: null,
    type: '',
    mileage: {
      base: '',
      next: '',
    },
    note: '',
  });

  const { addMaintenance } = useVehicleLog();

  const handleSubmit = async () => {
    addMaintenance.mutate(
      { carId, form },
      {
        onSuccess: onClose,
      }
    );
  };
  useEscapeKey(onClose);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal open={open} onClose={onClose} className='backdrop-blur-sm'>
      <Box sx={serviceStyle}>
        <div className='sticky top-0 z-10 rounded-t-[24px] bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-4 sm:px-6'>
          <div className='flex items-center space-x-3'>
            <WrenchIcon className='h-5 w-5 text-white sm:h-6 sm:w-6' />
            <h2 className='text-lg font-bold text-white sm:text-xl'>
              정비 내용 입력
            </h2>
          </div>
          <button
            onClick={onClose}
            className='absolute right-3 top-3 text-white/80 transition-colors hover:text-white sm:right-4 sm:top-4'
          >
            <XIcon className='h-5 w-5' />
          </button>
        </div>

        <div className='space-y-4 p-4 sm:p-6'>
          <div className='space-y-4'>
            <div>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale='ko'
              >
                <MobileDatePicker
                  label='정비 날짜*'
                  onChange={(newDate) =>
                    newDate &&
                    setForm((prev) => ({
                      ...prev,
                      date: newDate.toDate(),
                    }))
                  }
                  value={form.date && dayjs(form.date)}
                  format='YYYY.MM.DD'
                  sx={{
                    width: '100%',
                    ...serviceInputStyle,
                  }}
                />
              </LocalizationProvider>
            </div>

            <TextField
              fullWidth
              label='정비 유형*'
              variant='outlined'
              name='type'
              value={form.type}
              onChange={handleChange}
              sx={serviceInputStyle}
            />

            <div className='flex flex-col gap-4 sm:flex-row'>
              <TextField
                fullWidth
                label='최근 점검(Km)*'
                variant='outlined'
                value={form.mileage.base}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    mileage: {
                      ...prev.mileage,
                      base: e.target.value,
                    },
                  }))
                }
                sx={serviceInputStyle}
              />

              <TextField
                fullWidth
                label='다음 점검(Km)'
                variant='outlined'
                value={form.mileage.next}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    mileage: {
                      ...prev.mileage,
                      next: e.target.value,
                    },
                  }))
                }
                sx={serviceInputStyle}
              />
            </div>

            <TextField
              fullWidth
              multiline
              rows={3}
              label='비고'
              variant='outlined'
              name='note'
              value={form.note}
              onChange={handleChange}
              sx={serviceInputStyle}
            />
          </div>

          <div className='flex justify-end space-x-3 pt-4'>
            <button
              onClick={onClose}
              className='rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:px-6'
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className='rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-6'
            >
              입력
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
