import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, calculateDate } from '../../api';
import ArrowBack from '../../components/common/ArrowBack';
import { useCustomQueries } from '../../hooks/useCustomQuery';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Container, Grid, TextField, Autocomplete } from '@mui/material';
import { Calendar, Navigation, User, Car, MapPin, Wallet } from 'lucide-react';
import useDrivingStore from '../../stores/drivingStore';
import { ROUTES } from '../../constants/constant';
import Logout from '../../features/auth/components/LogoutButton';
import 'dayjs/locale/ko';

dayjs.locale('ko');

const DriveInput = () => {
  const navigate = useNavigate();
  const [driveDay, setDriveDay] = useState<Date>();
  const [drivers, setDrivers] = useState(['', '']);
  const [drivingDestination, setDrivingDestination] = useState('');
  const [startKM, setStartKM] = useState(0);
  const [endKM, setEndKM] = useState(0);
  const [totalKM, setTotalKM] = useState(0);
  const [fuelCost, setFuelCost] = useState(0);
  const [toll, setToll] = useState(0);
  const [etc, setEtc] = useState({ name: '', cost: 0 });

  const { carId, setCarId } = useDrivingStore();
  const privateCarId = process.env.REACT_APP_PRIVATE_CAR;

  const { names, namesLoading, cars, carsLoading, etcNames, etcNamesLoading } =
    useCustomQueries();

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      transition: 'all 0.2s ease-in-out',
      '& fieldset': {
        borderColor: '#E5E7EB',
      },
      '&:hover fieldset': {
        borderColor: '#3B82F6',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3B82F6',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#6B7280',
      '&.Mui-focused': {
        color: '#3B82F6',
      },
    },
  };

  const SectionTitle = ({
    icon: Icon,
    title,
  }: {
    icon: any;
    title: string;
  }) => (
    <div className='mb-4 flex items-center space-x-2'>
      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-500'>
        <Icon className='h-4 w-4' />
      </div>
      <h2 className='text-lg font-semibold text-gray-700'>{title}</h2>
    </div>
  );

  const handleDriveDayChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setDriveDay(newDate.toDate());
    }
  };

  const onClickComplete = async () => {
    const selectedDriver = drivers.filter(Boolean);

    if (!driveDay) {
      alert('날짜를 선택해주세요');
      return;
    }
    if (selectedDriver.length === 0) {
      alert('운전자를 선택해주세요');
      return;
    }
    if (!carId) {
      alert('차량을 선택해주세요');
      return;
    }
    if (!drivingDestination) {
      alert('행선지를 입력해주세요');
      return;
    }

    if (carId !== privateCarId && (!startKM || !endKM)) {
      alert('주행거리를 입력해주세요.');
      return;
    }
    if (carId === privateCarId && !totalKM) {
      alert('주행거리를 입력해주세요.');
      return;
    }
    if (etc.name && !etc.cost) {
      alert('비용을 입력해주세요.');
      return;
    }
    if (etc.cost && !etc.name) {
      alert('항목을 선택해주세요.');
      return;
    }

    const driverJoined = selectedDriver.join(', ');
    const res = await api.post('/api/driving-inform/addInform', {
      driveDay,
      username: driverJoined,
      car: carId,
      drivingDestination,
      startKM,
      endKM,
      totalKM: carId === privateCarId ? totalKM : endKM - startKM,
      fuelCost,
      toll,
      etc,
    });

    if (res.status === 201) {
      alert(res.data.message);
      navigate(ROUTES.VEHICLES.LIST, {
        state: { car: carId },
      });
    }
  };

  if (namesLoading || carsLoading || etcNamesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex min-h-screen w-full flex-col items-center bg-gradient-to-br from-gray-50 to-blue-50 p-10 sm:p-4'>
      <Container className='py-6' maxWidth='xl'>
        <div className='w-full'>
          <div className='mb-8 flex items-center justify-between'>
            <ArrowBack type='not home' />
            <div className='flex items-center rounded-2xl bg-white shadow-lg ring-1 ring-black/5 sm:px-6 sm:py-2 md:px-16 md:py-4'>
              <Calendar className='mr-2 h-5 w-5 text-blue-600 transition-colors group-hover:text-blue-700 sm:hidden' />
              <span className='whitespace-nowrap text-xl font-semibold text-gray-700 transition-colors sm:text-xs'>
                {calculateDate(new Date())}
              </span>
            </div>
            <Logout />
          </div>

          <div className='w-full rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100'>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className='rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100'>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                      <SectionTitle icon={Calendar} title='날짜' />
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale='ko'
                      >
                        <DatePicker
                          onChange={handleDriveDayChange}
                          sx={inputStyles}
                          label='날짜 선택 *'
                          slotProps={{
                            textField: {
                              sx: inputStyles,
                            },
                          }}
                          format='YYYY.MM.DD'
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <SectionTitle icon={User} title='운전자' />
                      <Grid container spacing={2}>
                        {[0, 1].map((index) => (
                          <Grid item xs={12} md={6} key={index}>
                            <Autocomplete
                              options={
                                names
                                  ?.sort((a, b) =>
                                    a.username.localeCompare(b.username)
                                  )
                                  ?.map((item) => item.username) || []
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label={`운전자 ${index + 1}${
                                    index === 0 ? ' *' : ''
                                  }`}
                                  sx={inputStyles}
                                />
                              )}
                              onChange={(_, value) => {
                                const newDrivers = [...drivers];
                                newDrivers[index] = value || '';
                                setDrivers(newDrivers);
                              }}
                              className='bg-white'
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <SectionTitle icon={Car} title='차량' />
                      <Autocomplete
                        options={
                          cars
                            ?.sort((a, b) => a.car.localeCompare(b.car))
                            ?.map((item) => item._id) || []
                        }
                        getOptionLabel={(option) =>
                          cars?.find((car) => car._id === option)?.car || ''
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='차량 선택 *'
                            sx={inputStyles}
                          />
                        )}
                        onChange={(_, value) => setCarId(value || '')}
                        value={carId}
                        className='bg-white'
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <SectionTitle icon={MapPin} title='행선지' />
                      <TextField
                        fullWidth
                        label='행선지 *'
                        value={drivingDestination}
                        onChange={(e) => setDrivingDestination(e.target.value)}
                        sx={inputStyles}
                        className='bg-white'
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <div className='h-full rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100'>
                      <SectionTitle icon={Navigation} title='주행거리' />
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            type='number'
                            label='출발 (km) *'
                            disabled={carId === privateCarId}
                            onChange={(e) =>
                              setStartKM(parseInt(e.target.value) || 0)
                            }
                            sx={inputStyles}
                            className='bg-white'
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            type='number'
                            label='도착 (km) *'
                            disabled={carId === privateCarId}
                            onChange={(e) =>
                              setEndKM(parseInt(e.target.value) || 0)
                            }
                            sx={inputStyles}
                            className='bg-white'
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            type='number'
                            label='총 주행거리'
                            disabled={carId !== privateCarId}
                            value={
                              carId === privateCarId ? totalKM : endKM - startKM
                            }
                            onChange={(e) =>
                              setTotalKM(parseInt(e.target.value) || 0)
                            }
                            sx={inputStyles}
                            className='bg-white'
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <div className='h-full rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100'>
                      <SectionTitle icon={Wallet} title='비용' />
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            type='number'
                            label='주유비'
                            onChange={(e) =>
                              setFuelCost(parseInt(e.target.value) || 0)
                            }
                            sx={inputStyles}
                            className='bg-white'
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            type='number'
                            label='하이패스'
                            onChange={(e) =>
                              setToll(parseInt(e.target.value) || 0)
                            }
                            sx={inputStyles}
                            className='bg-white'
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Autocomplete
                            options={
                              etcNames
                                ?.sort((a, b) =>
                                  a.etcName.localeCompare(b.etcName)
                                )
                                ?.map((item) => item.etcName) || []
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label='기타 항목'
                                sx={inputStyles}
                              />
                            )}
                            onChange={(_, value) =>
                              setEtc({ ...etc, name: value || '' })
                            }
                            className='bg-white'
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            type='number'
                            label='기타 비용'
                            onChange={(e) =>
                              setEtc({
                                ...etc,
                                cost: parseInt(e.target.value) || 0,
                              })
                            }
                            sx={inputStyles}
                            className='bg-white'
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <div className='mt-4 flex justify-center'>
                  <button
                    onClick={onClickComplete}
                    className='min-w-[160px] rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  >
                    입력 완료
                  </button>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DriveInput;
