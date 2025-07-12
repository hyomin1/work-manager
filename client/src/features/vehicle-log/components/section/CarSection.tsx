import { Car as CarIcon } from 'lucide-react';
import React from 'react';
import SectionTitle from '../../../../components/common/SectionTitle';
import { Autocomplete, Grid, TextField } from '@mui/material';
import type { Car } from '../../../work-status/types/workStatus';
import type { FormAction } from '../../reducers/vehicleLogReducer';
import { inputStyles } from '../../../work-status/styles/style';

interface Props {
  cars: Car[];
  dispatch: React.Dispatch<FormAction>;
}

export default function CarSection({ cars, dispatch }: Props) {
  const carOptions =
    cars?.sort((a, b) => a.car.localeCompare(b.car))?.map((item) => item._id) ||
    [];
  return (
    <Grid size={{ xs: 12, md: 3 }}>
      <SectionTitle icon={CarIcon} title='차량' />
      <Autocomplete
        options={carOptions}
        getOptionLabel={(option) =>
          cars?.find((car) => car._id === option)?.car || ''
        }
        renderInput={(params) => (
          <TextField {...params} label='차량 선택 *' sx={inputStyles} />
        )}
        onChange={(_, payload) =>
          payload ? dispatch({ type: 'SET_CAR', payload }) : null
        }
        className='bg-white'
      />
    </Grid>
  );
}
