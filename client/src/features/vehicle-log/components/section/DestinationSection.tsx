import { Grid, TextField } from '@mui/material';
import React from 'react';
import SectionTitle from '../../../../components/common/SectionTitle';
import { MapPin } from 'lucide-react';
import type { FormAction } from '../../reducers/vehicleLogReducer';
import { inputStyles } from '../../../../styles/style';

interface Props {
  destination: string;
  dispatch: React.Dispatch<FormAction>;
}

export default function DestinationSection({ destination, dispatch }: Props) {
  return (
    <Grid size={{ xs: 12 }}>
      <SectionTitle icon={MapPin} title='행선지' />
      <TextField
        fullWidth
        label='행선지 *'
        value={destination}
        onChange={(e) =>
          dispatch({
            type: 'SET_DESTINATION',
            payload: e.target.value,
          })
        }
        sx={inputStyles}
        className='bg-white'
      />
    </Grid>
  );
}
