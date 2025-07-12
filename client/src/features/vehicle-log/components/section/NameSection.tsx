import { Autocomplete, Grid, TextField } from '@mui/material';
import SectionTitle from '../../../../components/common/SectionTitle';
import { User } from 'lucide-react';
import { inputStyles } from '../../../work-status/styles/style';
import type { Username } from '../../../work-status/types/workStatus';
import type { FormAction } from '../../reducers/vehicleLogReducer';

interface Props {
  usernames: Username[];
  dispatch: React.Dispatch<FormAction>;
}

export default function NameSection({ usernames, dispatch }: Props) {
  const usernameOption =
    usernames
      ?.sort((a, b) => a.username.localeCompare(b.username))
      ?.map((item) => item.username) || [];

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <SectionTitle icon={User} title='운전자' />
      <Grid container spacing={2}>
        {[0, 1].map((index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Autocomplete
              options={usernameOption}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`운전자 ${index + 1}${index === 0 ? ' *' : ''}`}
                  sx={inputStyles}
                />
              )}
              onChange={(_, payload) =>
                payload
                  ? dispatch({ type: 'SET_USERNAMES', index, payload })
                  : null
              }
              className='bg-white'
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
