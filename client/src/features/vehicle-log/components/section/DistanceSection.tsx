import { Grid, TextField } from '@mui/material';
import React from 'react';
import { inputStyles } from '../../../../styles/style';

interface Props {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
  disabled: boolean;
}

export default function DistanceSection({
  label,
  onChange,
  value,
  disabled,
}: Props) {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        type='number'
        label={label}
        // disabled={carId === privateCarId}
        onChange={onChange}
        sx={inputStyles}
        className='bg-white'
        value={value}
        disabled={disabled}
      />
    </Grid>
  );
}
