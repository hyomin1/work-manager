import { Autocomplete, Grid, TextField } from '@mui/material';
import React from 'react';
import type { Etc } from '../../types/vehicleLog';
import type { FormAction, FormState } from '../../reducers/vehicleLogReducer';
import { inputStyles } from '../../../work-status/styles/style';

interface Props {
  etcList: Etc[];
  etc: FormState['etc'];
  dispatch: React.Dispatch<FormAction>;
}

export default function EtcSection({ etcList, etc, dispatch }: Props) {
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <Autocomplete
          options={
            etcList
              ?.sort((a, b) => a.etcName.localeCompare(b.etcName))
              ?.map((item) => item.etcName) || []
          }
          renderInput={(params) => (
            <TextField {...params} label='기타 항목' sx={inputStyles} />
          )}
          onChange={(_, value) =>
            dispatch({
              type: 'SET_ETC',
              payload: {
                ...etc,
                name: value || '',
              },
            })
          }
          className='bg-white'
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type='number'
          label='기타 비용'
          onChange={(e) =>
            dispatch({
              type: 'SET_ETC',
              payload: {
                ...etc,
                cost: Number(e.target.value) || 0,
              },
            })
          }
          sx={inputStyles}
          className='bg-white'
        />
      </Grid>
    </>
  );
}
