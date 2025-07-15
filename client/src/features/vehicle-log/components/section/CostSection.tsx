import { Grid, TextField } from '@mui/material';
import { inputStyles } from '../../../../styles/style';

interface Props {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CostSection({ label, onChange }: Props) {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <TextField
        fullWidth
        type='number'
        label={label}
        onChange={onChange}
        sx={inputStyles}
        className='bg-white'
      />
    </Grid>
  );
}
