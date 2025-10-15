import { Autocomplete, Grid, TextField } from '@mui/material';
import React from 'react';
import SectionTitle from '../../../../components/common/SectionTitle';
import { inputStyles } from '../../../../styles/style';
import type { FormAction } from '../../reducers/workStatusReducer';
import { Car as CarIcon } from 'lucide-react';
import type { Car } from '../../../vehicle-log/types/vehicleLog';

interface Props {
  cars: Car[];
  dispatch: React.Dispatch<FormAction>;
}

export default function CarSection({ cars, dispatch }: Props) {
  const carOptions = [
    { car: '선택 안함' },
    ...(cars
      ? cars
          .sort((a, b) => a.car.localeCompare(b.car))
          .map((item) => ({
            car: item.car,
          }))
      : []),
  ];
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <div className='rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100'>
        <SectionTitle icon={CarIcon} title='차량' />
        <Autocomplete
          options={carOptions}
          getOptionLabel={(option) => option.car}
          renderInput={(params) => (
            <TextField {...params} label='차량 선택 *' sx={inputStyles} />
          )}
          onChange={(_, value) =>
            value ? dispatch({ type: 'SET_CAR', payload: value.car }) : null
          }
          className='bg-white'
        />
      </div>
    </Grid>
  );
}
