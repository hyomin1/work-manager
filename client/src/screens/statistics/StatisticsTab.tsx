import {
  Tab,
  Tabs,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Search, MapPin, User } from 'lucide-react';
import dayjs, { Dayjs } from 'dayjs';
import { useCustomQueries } from '../../hooks/useCustomQuery';

interface ITabs {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  username: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  destination: string;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  nameRefetch: () => void;
  destinationRefetch: () => void;
}

function a11yProps(index: number) {
  return {
    id: `statistics-tab-${index}`,
    'aria-controls': `statistics-tabpanel-${index}`,
  };
}

function StatisticsTab({
  value,
  setValue,
  username,
  setUserName,
  destination,
  setDestination,
  date,
  setDate,
  nameRefetch,
  destinationRefetch,
}: ITabs) {
  const handleChangeValue = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeName = (event: SelectChangeEvent) => {
    setUserName(event.target.value as string);
  };

  const handleChangeDestination = (event: SelectChangeEvent) => {
    setDestination(event.target.value as string);
  };

  const handleChangeDate = (newDate: Dayjs | null) => {
    if (newDate) {
      setDate(newDate.toDate());
    }
  };

  const { names, destinationsData } = useCustomQueries();

  const onClickUserStatistics = () => {
    if (!username) {
      alert('이름을 선택해주세요');
      return;
    }
    nameRefetch();
  };

  const onClickDestinationStatistics = () => {
    if (!destination) {
      alert('방문지를 선택해주세요');
      return;
    }
    destinationRefetch();
  };

  return (
    <div className="space-y-6  md:w-[50%]">
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChangeValue}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              fontSize: '0.95rem',
              fontWeight: 600,
              textTransform: 'none',
              minHeight: 48,
            },
            '& .Mui-selected': {
              color: '#2563eb',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#2563eb',
            },
          }}
        >
          <Tab
            icon={<User className="w-4 h-4" />}
            iconPosition="start"
            label="이름 검색"
            {...a11yProps(0)}
          />
          <Tab
            icon={<MapPin className="w-4 h-4" />}
            iconPosition="start"
            label="방문지 검색"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>

      {/* Search Forms */}
      {value === 0 ? (
        <div className="flex justify-between ">
          <MobileDatePicker
            onChange={handleChangeDate}
            defaultValue={dayjs(date)}
            sx={{
              width: '42%',
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
              },
            }}
          />
          <FormControl sx={{ width: '42%' }}>
            <InputLabel id="name-select-label">이름 *</InputLabel>
            <Select
              labelId="name-select-label"
              value={username}
              label="이름 *"
              onChange={handleChangeName}
              sx={{
                backgroundColor: 'white',
                '& .MuiSelect-select': {
                  paddingY: '1rem',
                },
              }}
            >
              {names
                ?.sort((a, b) => a.username.localeCompare(b.username))
                .map((item, index) => (
                  <MenuItem key={index} value={item.username}>
                    {item.username}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button
            onClick={onClickUserStatistics}
            variant="contained"
            startIcon={<Search className="w-4 h-4" />}
            sx={{
              backgroundColor: '#2563eb',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: 'large',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '0.5rem',
              padding: '0.75rem 1.5rem',
              '&:hover': {
                backgroundColor: '#1d4ed8',
              },
            }}
          >
            검색
          </Button>
        </div>
      ) : (
        <div className="flex justify-between">
          <FormControl sx={{ flexGrow: 1 }}>
            <InputLabel id="destination-select-label">방문지 *</InputLabel>
            <Select
              labelId="destination-select-label"
              value={destination}
              label="방문지 *"
              onChange={handleChangeDestination}
              sx={{
                backgroundColor: 'white',
                '& .MuiSelect-select': {
                  paddingY: '1rem',
                },
              }}
            >
              {destinationsData
                ?.sort((a, b) => a.destination.localeCompare(b.destination))
                .map((item, index) => (
                  <MenuItem key={index} value={item.destination}>
                    {item.destination}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button
            onClick={onClickDestinationStatistics}
            variant="contained"
            startIcon={<Search className="w-4 h-4" />}
            sx={{
              marginLeft: 2,
              backgroundColor: '#2563eb',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: 'large',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '0.5rem',
              padding: '0.75rem 1.5rem',
              '&:hover': {
                backgroundColor: '#1d4ed8',
              },
            }}
          >
            검색
          </Button>
        </div>
      )}
    </div>
  );
}

export default StatisticsTab;
