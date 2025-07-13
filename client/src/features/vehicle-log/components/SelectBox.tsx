import {
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import type { Car } from '../types/vehicleLog';

interface Props {
  carId: string;
  cars: Car[];
  onChange: (e: SelectChangeEvent) => void;
}

export default function SelectBox({ carId, cars, onChange }: Props) {
  return (
    <div className='flex items-center sm:w-full sm:flex-col sm:p-3 md:ml-2 md:h-full md:justify-start'>
      <FormControl
        fullWidth
        size='small'
        sx={{
          width: '100%',
          minWidth: 140,

          '& .MuiOutlinedInput-root': {
            height: '42px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',

            '&:hover': {
              borderColor: '#cbd5e1',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
              backgroundColor: '#ffffff',
            },

            '&.Mui-focused': {
              borderColor: '#3b82f6',
              boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            },

            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          },
        }}
      >
        <Select
          onChange={onChange}
          value={carId}
          displayEmpty
          sx={{
            '& .MuiSelect-select': {
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#1e293b',

              '&.MuiSelect-select': {
                '&[aria-expanded="true"]': {
                  backgroundColor: 'transparent',
                },
              },
            },

            '& .MuiSelect-icon': {
              right: '12px',
              color: '#64748b',
              transition: 'transform 0.2s ease-in-out',

              '&[aria-expanded="true"]': {
                transform: 'rotate(180deg)',
              },
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                mt: 1,
                borderRadius: '10px',
                boxShadow:
                  '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                '& .MuiMenu-list': {
                  padding: '6px',
                },
                '& .MuiMenuItem-root': {
                  borderRadius: '6px',
                  margin: '2px 0',
                  padding: '10px 12px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#1e293b',

                  '&:hover': {
                    backgroundColor: '#f1f5f9',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#e2e8f0',
                    '&:hover': {
                      backgroundColor: '#cbd5e1',
                    },
                  },
                },
              },
            },
          }}
          renderValue={(value) => {
            if (!value) {
              return <span style={{ color: '#94a3b8' }}>차량 선택</span>;
            }
            return cars.find((car) => car._id === value)?.car;
          }}
        >
          {cars &&
            cars
              .sort((a, b) => a.car.localeCompare(b.car))
              .map(({ _id: id, car }) => (
                <MenuItem key={id} value={id}>
                  {car}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </div>
  );
}
