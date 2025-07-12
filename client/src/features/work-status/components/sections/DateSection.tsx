import React from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Calendar } from 'lucide-react';
import SectionTitle from '../../../../components/common/SectionTitle';
import 'dayjs/locale/ko';
import type { FormAction } from '../../reducers/workStatusReducer';
import { inputStyles } from '../../styles/style';

interface Props {
  isDaily: number;
  dispatch: React.Dispatch<FormAction>;
}

export default function DateSection({ isDaily, dispatch }: Props) {
  return (
    <div className='rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100'>
      <SectionTitle icon={Calendar} title='날짜' />
      <FormControl fullWidth>
        <div className='mb-4 rounded-lg bg-white shadow-sm ring-1 ring-gray-200 sm:px-2 sm:py-1.5 sm:text-xs md:py-1.5'>
          <RadioGroup
            row
            value={isDaily}
            onChange={(e) =>
              dispatch({
                type: 'SET_IS_DAILY',
                payload: Number(e.target.value),
              })
            }
            className='flex flex-nowrap sm:space-x-1'
          >
            {[1, 2, 3].map((value) => (
              <FormControlLabel
                key={value}
                value={value}
                control={
                  <Radio sx={{ '&.Mui-checked': { color: '#3B82F6' } }} />
                }
                label={['오늘', '다른날', '기간'][value - 1]}
                className='m-0 flex flex-1 items-center justify-center whitespace-nowrap rounded-md transition-colors hover:bg-gray-50 md:px-2'
                sx={{
                  margin: '1px',
                  backgroundColor:
                    isDaily === value ? 'rgb(239 246 255)' : 'transparent',
                  borderRadius: '0.375rem',
                }}
              />
            ))}
          </RadioGroup>
        </div>

        <div className='mt-4'>
          {isDaily === 2 && (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
              <MobileDatePicker
                onChange={(date) =>
                  dispatch({
                    type: 'SET_DATE',
                    payload: {
                      start: date ? date.toDate() : null,
                      end: date ? date.toDate() : null,
                    },
                  })
                }
                label='날짜 선택'
                sx={{ ...inputStyles, width: '100%' }}
                slotProps={{
                  textField: { sx: { ...inputStyles, width: '100%' } },
                }}
              />
            </LocalizationProvider>
          )}

          {isDaily === 3 && (
            <div className='grid grid-cols-2 gap-3'>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale='ko'
              >
                <MobileDatePicker
                  onChange={(date) =>
                    dispatch({
                      type: 'SET_START_DATE',
                      payload: date ? date.toDate() : null,
                    })
                  }
                  label='시작일'
                  sx={inputStyles}
                  slotProps={{ textField: { sx: inputStyles } }}
                />
                <MobileDatePicker
                  onChange={(date) =>
                    dispatch({
                      type: 'SET_END_DATE',
                      payload: date ? date.toDate() : null,
                    })
                  }
                  label='종료일'
                  sx={inputStyles}
                  slotProps={{ textField: { sx: inputStyles } }}
                />
              </LocalizationProvider>
            </div>
          )}
        </div>
      </FormControl>
    </div>
  );
}
