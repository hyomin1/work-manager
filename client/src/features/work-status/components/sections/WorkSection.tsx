import { Autocomplete, Grid, TextField } from '@mui/material';
import React from 'react';
import SectionTitle from './SectionTitle';
import { ClipboardList } from 'lucide-react';
import type { FormAction, FormState } from '../../reducers/workStatusReducer';
import { inputStyles } from '../../style';
import type { Work } from '../../types/workStatus';

interface Props {
  form: FormState;
  works: Work[];
  dispatch: React.Dispatch<FormAction>;
}

export default function WorkSection({ form, works, dispatch }: Props) {
  const { inputWork } = form;

  const workOptions: Work[] =
    works
      ?.filter((w): w is Work => w !== null)
      .sort((a, b) => a.work.localeCompare(b.work)) || [];
  return (
    <Grid size={{ xs: 12, md: 3 }}>
      <div className='rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100'>
        <SectionTitle icon={ClipboardList} title='업무' />
        <div className='space-y-3'>
          {[0, 1, 2].map((index) => (
            <Autocomplete
              key={index}
              options={workOptions}
              getOptionLabel={(option) => option.work}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`업무 ${index + 1}${index === 0 ? ' *' : ''}`}
                  sx={inputStyles}
                />
              )}
              onChange={(_, payload) =>
                dispatch({
                  type: 'SET_WORK',
                  index,
                  payload,
                })
              }
              value={form.selectedWorks[index]}
              className='bg-white'
            />
          ))}
          <TextField
            fullWidth
            label='업무 직접 입력'
            value={inputWork}
            onChange={(e) =>
              dispatch({ type: 'SET_INPUT_WORK', payload: e.target.value })
            }
            sx={inputStyles}
            className='bg-white'
          />
        </div>
      </div>
    </Grid>
  );
}
