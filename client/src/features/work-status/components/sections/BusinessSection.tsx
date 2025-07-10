import React from 'react';
import type { FormAction, FormState } from '../../reducers/workStatusReducer';
import type { Business } from '../../types/workStatus';
import SectionTitle from './SectionTitle';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { inputStyles } from '../../style';
import { Briefcase } from 'lucide-react';

interface Props {
  form: FormState;
  businesses: Business[];
  dispatch: React.Dispatch<FormAction>;
}

export default function BusinessSection({ form, businesses, dispatch }: Props) {
  const getBusinessOptions = (destinationId: string) => {
    if (destinationId === 'none') {
      return [{ _id: 'none', business: '선택 안함', destinationId: '' }];
    }

    return (
      businesses
        ?.filter((business) => business.destinationId === destinationId)
        .sort((a, b) => a.business.localeCompare(b.business)) || []
    );
  };
  return (
    <Grid size={{ xs: 12, md: 5 }}>
      <div className='rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100'>
        <SectionTitle icon={Briefcase} title='사업명' />
        <div className='space-y-3'>
          {[0, 1, 2].map((index) => (
            <Autocomplete
              key={index}
              options={getBusinessOptions(
                form.selectedDestinations[index]?._id || 'none'
              )}
              getOptionLabel={(option) => option.business}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`사업명 ${index + 1}${index === 0 ? ' *' : ''}`}
                  sx={inputStyles}
                />
              )}
              onChange={(_, payload) =>
                dispatch({ type: 'SET_BUSINESS', index, payload })
              }
              value={form.selectedBusinesses[index]}
              disabled={!businesses[index]}
              className='bg-white'
            />
          ))}
          <TextField
            fullWidth
            label='사업명 직접 입력'
            value={form.inputBusiness}
            onChange={(e) =>
              dispatch({ type: 'SET_INPUT_BUSINESS', payload: e.target.value })
            }
            sx={inputStyles}
            className='bg-white'
          />
        </div>
      </div>
    </Grid>
  );
}
