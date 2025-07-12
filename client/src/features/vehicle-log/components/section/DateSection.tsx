import { Grid } from '@mui/material';
import React from 'react';
import SectionTitle from '../../../../components/common/SectionTitle';
import { Calendar } from 'lucide-react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { inputStyles } from '../../../work-status/styles/style';
import type { FormAction } from '../../reducers/vehicleLogReducer';

interface Props {
  dispatch: React.Dispatch<FormAction>;
}

export default function DateSection({ dispatch }: Props) {
  return (
    <Grid size={{ xs: 12, md: 3 }}>
      <SectionTitle icon={Calendar} title='날짜' />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
        <DatePicker
          onChange={(date) =>
            dispatch({
              type: 'SET_DATE',
              payload: date ? date?.toDate() : null,
            })
          }
          sx={inputStyles}
          label='날짜 선택 *'
          slotProps={{
            textField: {
              sx: inputStyles,
            },
          }}
          format='YYYY.MM.DD'
        />
      </LocalizationProvider>
    </Grid>
  );
}
