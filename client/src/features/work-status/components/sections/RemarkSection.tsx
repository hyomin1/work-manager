import { Grid, TextField } from '@mui/material';
import React from 'react';
import SectionTitle from './SectionTitle';
import { MessageSquare } from 'lucide-react';
import { inputStyles } from '../../style';
import type { FormAction } from '../../reducers/workStatusReducer';

interface Props {
  remarks: string;
  dispatch: React.Dispatch<FormAction>;
}

export default function RemarkSection({ remarks, dispatch }: Props) {
  return (
    <Grid size={{ xs: 12 }}>
      <div className='lg:flex-row lg:items-end lg:justify-between lg:space-x-6 lg:space-y-0 mt-4 flex flex-col space-y-6'>
        <div className='lg:w-2/3 w-full'>
          <div className='rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100'>
            <SectionTitle icon={MessageSquare} title='비고' />
            <TextField
              fullWidth
              multiline
              rows={3}
              value={remarks}
              onChange={(e) =>
                dispatch({ type: 'SET_REMARKS', payload: e.target.value })
              }
              sx={inputStyles}
              className='bg-white'
            />
          </div>
        </div>
      </div>
    </Grid>
  );
}
