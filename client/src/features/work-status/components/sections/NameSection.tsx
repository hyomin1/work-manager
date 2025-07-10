import React from 'react';
import type { FormAction } from '../../reducers/workStatusReducer';
import { Autocomplete, Grid, TextField } from '@mui/material';
import SectionTitle from './SectionTitle';
import { User } from 'lucide-react';
import type { Username } from '../../types/workStatus';
import { inputStyles } from '../../style';

interface Props {
  usernames: Username[];
  dispatch: React.Dispatch<FormAction>;
}

export default function NameSection({ usernames, dispatch }: Props) {
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <div className='rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100'>
        <SectionTitle icon={User} title='이름' />
        <Autocomplete
          options={
            usernames
              ?.sort((a, b) => a.username.localeCompare(b.username))
              ?.map((item) => item.username) || []
          }
          renderInput={(params) => (
            <TextField {...params} label='이름 선택 *' sx={inputStyles} />
          )}
          onChange={(_, payload) =>
            payload ? dispatch({ type: 'SET_USERNAME', payload }) : null
          }
          className='bg-white'
        />
      </div>
    </Grid>
  );
}
