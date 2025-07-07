import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import ServiceTable from './ServiceTable';
import { getCars, getServices } from '../../../api';
import type { ICars, ICarService } from '../../../interfaces/interface';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import dayjs from 'dayjs';
import AddDriveNotification from '../components/AddDriveNotification';
import { useLocation } from 'react-router-dom';
import useDrivingStore from '../../../stores/drivingStore';
import DriveAlert from '../components/DriveAlert';
import NavButton from '../../../components/common/NavButton';
import AddService from './AddService';

dayjs.locale('ko');

function ServiceTab() {
  //const [carId, setCarId] = useState("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [type, setType] = useState('');
  const [mileage, setMileage] = useState({
    base: '',
    next: '',
  });
  const [note, setNote] = useState('');

  const [notification, setNotification] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const queryClient = useQueryClient();
  const location = useLocation();

  const { carId, setCarId } = useDrivingStore();

  useEffect(() => {
    if (location.state) {
      setCarId(location.state.car);
    }
  }, [location, setCarId]);

  const handleOpen = () => setOpen(true);

  const handleInput = () => {
    if (!carId) {
      alert('차량을 선택해주세요.');
      return;
    }
    handleOpen();
  };

  const { data: cars } = useQuery<ICars[]>({
    queryKey: ['car', 1],
    queryFn: getCars,
  });

  const { data: services, refetch } = useQuery<ICarService[]>({
    queryKey: ['services', carId],
    queryFn: () => getServices(carId),
    enabled: carId.length > 0,
  });

  const handleChangeCar = (e: SelectChangeEvent) => {
    setCarId(e.target.value as string);
  };

  useEffect(() => {
    const car = cars?.find((car) => car._id === carId);
    if (car) {
      setNotification(car.notification);
    }
  }, [carId, cars]);

  return (
    <div className='flex h-full w-[90%] flex-col overflow-hidden sm:p-2'>
      <div className='print-hidden mb-8 flex w-full items-center rounded-lg bg-white/90 py-3 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-all duration-500 sm:h-auto sm:flex-col md:justify-between'>
        <div className='flex items-center sm:w-full sm:p-3 md:ml-2 md:w-[30%]'>
          <FormControl size='small' sx={{ width: '30%', marginRight: '2rem' }}>
            <InputLabel
              id='car'
              sx={{
                color: '#64748b',
                '&.Mui-focused': {
                  color: '#3b82f6',
                },
              }}
            >
              차량 선택
            </InputLabel>
            <Select
              id='car'
              labelId='car'
              label='차량 선택'
              onChange={handleChangeCar}
              value={carId}
              sx={{
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e2e8f0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3b82f6',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3b82f6',
                },
                '& .MuiSelect-select': {
                  padding: '10px 14px',
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
                  transition: 'all 0.2s ease-in-out',
                  '&[aria-expanded="true"]': {
                    transform: 'rotate(180deg)',
                    color: '#3b82f6',
                  },
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    mt: 1,
                    borderRadius: '12px',
                    boxShadow:
                      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    '& .MuiMenuItem-root': {
                      padding: '10px 14px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#1e293b',
                      transition: 'all 0.15s ease-in-out',
                      '&:hover': {
                        backgroundColor: '#f1f5f9',
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#eff6ff',
                        color: '#3b82f6',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: '#e0f2fe',
                        },
                      },
                    },
                  },
                },
              }}
              renderValue={(value) => {
                if (!value) {
                  return <span className='text-slate-400'>차량 선택</span>;
                }
                return (
                  cars && (
                    <span className='font-medium'>
                      {cars.find((car) => car._id === value)?.car}
                    </span>
                  )
                );
              }}
            >
              {cars &&
                cars
                  .sort((a, b) => a.car.localeCompare(b.car))
                  .map((car) => (
                    <MenuItem key={car._id} value={`${car._id}`}>
                      {car.car}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
          <NavButton
            icon={Pencil}
            label='입력'
            onClick={handleInput}
            variant='blue'
          />
          <AddService
            open={open}
            setOpen={setOpen}
            mileage={mileage}
            date={date}
            setDate={setDate}
            type={type}
            setType={setType}
            setMileage={setMileage}
            refetch={refetch}
            setNote={setNote}
            carId={carId}
            note={note}
          />
        </div>
      </div>
      <div>
        {carId.length > 0 && (
          <DriveAlert
            notification={notification || ''}
            onClick={() => setIsAdding(true)}
            type='carService'
          />
        )}
        {isAdding && (
          <AddDriveNotification
            setIsAdding={setIsAdding}
            id={carId}
            queryClient={queryClient}
            notice={notification || ''}
          />
        )}
      </div>

      <ServiceTable services={services || []} refetch={refetch} />
    </div>
  );
}

export default ServiceTab;
