import React from 'react';
import type { Destination } from '../../types/workStatus';
import type { FormAction, FormState } from '../../reducers/workStatusReducer';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { inputStyles } from '../../style';
import { MapPin } from 'lucide-react';
import SectionTitle from './SectionTitle';

interface Props {
  form: FormState;
  destinations: Destination[];
  dispatch: React.Dispatch<FormAction>;
}

export default function DestinationSection({
  destinations,
  form,
  dispatch,
}: Props) {
  const destinationOptions = [
    { _id: 'none', destination: '선택 안함' },
    ...(destinations?.sort((a, b) =>
      a.destination.localeCompare(b.destination)
    ) || []),
  ];
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <div className='rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100'>
        <SectionTitle icon={MapPin} title='방문지' />
        <div className='space-y-3'>
          {[0, 1, 2].map((index) => (
            <Autocomplete
              key={index}
              options={destinationOptions}
              getOptionLabel={(option) => option.destination}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`방문지 ${index + 1}${index === 0 ? ' *' : ''}`}
                  sx={inputStyles}
                />
              )}
              onChange={(_, payload) =>
                dispatch({
                  type: 'SET_DESTINATION',
                  index,
                  payload,
                })
              }
              value={form.selectedDestinations[index]}
              className='bg-white'
            />
          ))}
          <TextField
            fullWidth
            label='방문지 직접 입력'
            value={form.inputDestination}
            onChange={(e) =>
              dispatch({
                type: 'SET_INPUT_DESTINATION',
                payload: e.target.value,
              })
            }
            sx={inputStyles}
            className='bg-white'
          />
        </div>
      </div>
    </Grid>
  );
}
