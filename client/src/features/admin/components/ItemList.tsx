import { Autocomplete, Button, TextField } from '@mui/material';
import { ListPlus } from 'lucide-react';
import type { AdminType } from '../types/admin';
import type { Destination } from '../../work-status/types/workStatus';

interface Props {
  activeTab: AdminType;
  destination?: string;
  destinations: Destination[];
  setDestination: (destination: string) => void;
  onClick: () => void;
}

export default function ItemList({
  activeTab,
  destination,
  setDestination,
  destinations,
  onClick,
}: Props) {
  return (
    <div className='flex items-center justify-between border-b border-gray-200 px-4 py-2'>
      <div className='w-1/3'>
        {activeTab === 'business' ? (
          <Autocomplete
            value={destination || ''}
            options={
              destinations
                ?.sort((a, b) => a.destination.localeCompare(b.destination))
                .map((item) => `${item._id},${item.destination}`) || []
            }
            getOptionLabel={(option) => option.split(',')[1] || ''}
            onChange={(_, newValue) => setDestination(newValue || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label='방문지 선택'
                variant='outlined'
                size='small'
                fullWidth
              />
            )}
            size='small'
          />
        ) : (
          <div className='text-lg font-semibold text-gray-700'>목록</div>
        )}
      </div>

      <Button
        variant='contained'
        color='primary'
        startIcon={<ListPlus className='h-5 w-5' />}
        onClick={onClick}
        className='bg-blue-600 hover:bg-blue-700'
      >
        등록
      </Button>
    </div>
  );
}
