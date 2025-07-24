import { useReducer } from 'react';
import { calculateDate } from '../../../utils';
import ArrowBack from '../../../components/common/ArrowBack';
import { useCommonData } from '../../../hooks/useCommonData';
import dayjs from 'dayjs';
import { Container, Grid } from '@mui/material';
import { Calendar, Navigation, Wallet } from 'lucide-react';
import Logout from '../../auth/components/LogoutButton';
import 'dayjs/locale/ko';
import SectionTitle from '../../../components/common/SectionTitle';
import { formReducer, initialFormState } from '../reducers/vehicleLogReducer';
import CostSection from './section/CostSection';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import NameSection from './section/NameSection';
import CarSection from './section/CarSection';
import DestinationSection from './section/DestinationSection';
import DateSection from './section/DateSection';
import DistanceSection from './section/DistanceSection';
import useVehicleLog from '../hooks/useVehicle';
import EtcSection from './section/EtcSection';
import { validateForm } from '../utils/formUitls';
import toast from 'react-hot-toast';

dayjs.locale('ko');

export default function VehicleLogForm() {
  const [form, dispatch] = useReducer(formReducer, initialFormState);
  const privateCarId = import.meta.env.VITE_PRIVATE_CAR_ID;
  const { destination, startKM, endKM, totalKM, car, etc } = form;

  const { add } = useVehicleLog();

  const { usernames, cars, etcList, isVehicleLoading } = useCommonData();

  const handleSubmit = async () => {
    const error = validateForm({ ...form, privateCarId });
    if (error) toast.error(error);

    add.mutate({ ...form });
  };
  if (isVehicleLoading) {
    return <LoadingSpinner />;
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
              <Grid size={{ xs: 12 }}>
                <div className='rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100'>
                  <Grid container spacing={3}>
                    <DateSection dispatch={dispatch} />

                    {usernames && (
                      <NameSection usernames={usernames} dispatch={dispatch} />
                    )}

                    {cars && <CarSection cars={cars} dispatch={dispatch} />}
                    <DestinationSection
                      destination={destination}
                      dispatch={dispatch}
                    />
                  </Grid>
                </div>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <div className='h-full rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100'>
                      <SectionTitle icon={Navigation} title='주행거리' />
                      <Grid container spacing={2}>
                        <DistanceSection
                          label='출발 (km) *'
                          onChange={(e) =>
                            dispatch({
                              type: 'SET_START_KM',
                              payload: Number(e.target.value),
                            })
                          }
                          value={startKM}
                          disabled={car === privateCarId}
                        />
                        <DistanceSection
                          label='도착 (km) *'
                          onChange={(e) =>
                            dispatch({
                              type: 'SET_END_KM',
                              payload: Number(e.target.value),
                            })
                          }
                          value={endKM}
                          disabled={car === privateCarId}
                        />
                        <DistanceSection
                          label='총 주행거리'
                          onChange={(e) =>
                            dispatch({
                              type: 'SET_TOTAL_KM',
                              payload: Number(e.target.value),
                            })
                          }
                          value={
                            car === privateCarId ? totalKM : endKM - startKM
                          }
                          disabled={car !== privateCarId}
                        />
                      </Grid>
                    </div>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <div className='h-full rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100'>
                      <SectionTitle icon={Wallet} title='비용' />
                      <Grid container spacing={2}>
                        <CostSection
                          label='주유비'
                          onChange={(e) =>
                            dispatch({
                              type: 'SET_FUEL_COST',
                              payload: Number(e.target.value),
                            })
                          }
                        />
                        <CostSection
                          label='하이패스'
                          onChange={(e) =>
                            dispatch({
                              type: 'SET_TOLL',
                              payload: Number(e.target.value),
                            })
                          }
                        />
                        {etcList && (
                          <EtcSection
                            etcList={etcList}
                            etc={etc}
                            dispatch={dispatch}
                          />
                        )}
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <div className='mt-4 flex justify-center'>
                  <button
                    onClick={handleSubmit}
                    className='min-w-[160px] rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  >
                    입력
                  </button>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  );
}
