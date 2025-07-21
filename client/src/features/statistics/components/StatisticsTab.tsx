import {
  Tab,
  Tabs,
  Box,
  FormControl,
  Button,
  Autocomplete,
  TextField,
  Paper,
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Search, MapPin, User } from 'lucide-react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import React from 'react';
import { useCommonData } from '../../../hooks/useCommonData';

dayjs.locale('ko');

interface Props {
  value: number;
  onChangeValue: (e: React.SyntheticEvent, newValue: number) => void;
  username: string;
  onChangeUsername: (e: React.SyntheticEvent, newValue: string | null) => void;
  destination: string;
  onChangeDestination: (
    e: React.SyntheticEvent,
    newValue: string | null
  ) => void;
  startDate: Date;
  setStartDate: (newDate: Date) => void;
  endDate: Date;
  setEndDate: (newDate: Date) => void;
  onSearch: () => void;
}

export default function StatisticsTab({
  value,
  onChangeValue,
  username,
  onChangeUsername,
  destination,
  onChangeDestination,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onSearch,
}: Props) {
  const { usernames, destinations } = useCommonData();

  const sortedUsernames =
    usernames
      ?.sort((a, b) => a.username.localeCompare(b.username))
      .map((item) => item.username) || [];

  const sortedDestinations =
    destinations
      ?.sort((a, b) => a.destination.localeCompare(b.destination))
      .map((item) => item.destination) || [];

  return (
    <Paper elevation={2} className='w-[90%] bg-white p-6'>
      <Box className='space-y-6'>
        <Tabs
          value={value}
          onChange={onChangeValue}
          variant='fullWidth'
          className='border-b border-gray-200'
          sx={{
            '& .MuiTab-root': {
              fontSize: '0.95rem',
              fontWeight: 600,
              textTransform: 'none',
              minHeight: 48,
              color: '#64748b',
            },
            '& .Mui-selected': {
              color: '#2563eb',
            },
          }}
        >
          <Tab
            icon={<User className='h-4 w-4' />}
            iconPosition='start'
            label='이름 검색'
            className='transition-colors duration-200'
          />
          <Tab
            icon={<MapPin className='h-4 w-4' />}
            iconPosition='start'
            label='방문지 검색'
            className='transition-colors duration-200'
          />
        </Tabs>

        <div className='flex w-full flex-col gap-4 md:flex-row md:items-center'>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
            <MobileDatePicker
              label='시작일'
              onChange={(newDate) => newDate && setStartDate(newDate.toDate())}
              defaultValue={dayjs(startDate)}
              slotProps={{
                textField: {
                  className: 'bg-white w-full md:w-48',
                  size: 'small',
                },
              }}
            />

            <MobileDatePicker
              label='종료일'
              onChange={(newDate) => newDate && setEndDate(newDate.toDate())}
              defaultValue={dayjs(endDate)}
              slotProps={{
                textField: {
                  className: 'bg-white w-full md:w-48',
                  size: 'small',
                },
              }}
            />
          </LocalizationProvider>

          <FormControl
            className={`w-full ${value === 0 ? 'md:w-48' : 'md:w-80'}`}
          >
            {value === 0 ? (
              <Autocomplete
                size='small'
                options={sortedUsernames}
                renderInput={(params) => (
                  <TextField {...params} label='이름' size='small' />
                )}
                onChange={onChangeUsername}
                value={username}
                className='bg-white'
              />
            ) : (
              <Autocomplete
                size='small'
                options={sortedDestinations}
                renderInput={(params) => (
                  <TextField {...params} label='방문지' size='small' />
                )}
                onChange={onChangeDestination}
                value={destination}
                className='bg-white'
              />
            )}
          </FormControl>

          <Button
            onClick={onSearch}
            variant='contained'
            className='h-10 whitespace-nowrap bg-blue-600 px-6 text-sm font-semibold normal-case transition-colors duration-200 hover:bg-blue-700'
            startIcon={<Search className='h-4 w-4' />}
          >
            검색
          </Button>
        </div>
      </Box>
    </Paper>
  );
}
