import { Autocomplete, TextField } from '@mui/material';
import type { Username } from '../../work-status/types/workStatus';

export default function SearchComponent({
  names,
  username,
  handleNameChange,
}: {
  names: Username[];
  username: string | null;
  handleNameChange: (event: React.SyntheticEvent, value: string | null) => void;
}) {
  return (
    <div className='mr-4 w-[150px]'>
      <Autocomplete
        size='small'
        options={
          names
            ?.sort((a, b) => a.username.localeCompare(b.username))
            ?.map((item) => item.username) || []
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label='이름 검색'
            size='small'
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'white',
                borderRadius: '4px',
                height: '36px',
              },
            }}
          />
        )}
        onChange={handleNameChange}
        value={username}
      />
    </div>
  );
}
