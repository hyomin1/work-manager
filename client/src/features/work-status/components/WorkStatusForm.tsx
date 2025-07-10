import { useReducer } from 'react';
import { formDate } from '../../../api';
import ArrowBack from '../../../components/common/ArrowBack';
import { useCommonData } from '../../../hooks/useCommonData';
import dayjs from 'dayjs';
import { Container, Divider, Grid } from '@mui/material';
import 'dayjs/locale/ko';
import { Calendar } from 'lucide-react';
import Logout from '../../auth/components/LogoutButton';
import { formReducer, initialFormState } from '../reducers/workStatusReducer';
import NameSection from './sections/NameSection';
import CarSection from './sections/CarSection';
import RemarkSection from './sections/RemarkSection';
import DestinationSection from './sections/DestinationSection';
import WorkSection from './sections/WorkSection';
import BusinessSection from './sections/BusinessSection';
import DateSection from './sections/DateSection';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { mergeSelectedAndInput, validateForm } from '../utils/formUtils';
import { toast } from 'react-hot-toast';
import useWorkStatus from '../hooks/useWorkStatus';

dayjs.locale('ko');

export default function WorkStatusForm() {
  const [form, dispatch] = useReducer(formReducer, initialFormState);
  const {
    selectedUsername,
    selectedCar,
    remarks,
    selectedDestinations,
    inputDestination,
    selectedWorks,
    inputWork,
    selectedBusinesses,
    inputBusiness,
    isDaily,
    startDate,
    endDate,
  } = form;

  // 0 : 기본 1 : 일일 업무 2: 여러 날은 아니지만 다른 날 선택 3: 기간선택

  const { usernames, destinations, businesses, works, cars, isLoading } =
    useCommonData();
  const { add } = useWorkStatus();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const getFormData = () => {
    return {
      selectedDestinations: mergeSelectedAndInput(
        selectedDestinations,
        inputDestination,
        'destination'
      ),
      selectedBusinesses: mergeSelectedAndInput(
        selectedBusinesses,
        inputBusiness,
        'business'
      ),
      selectedWorks: mergeSelectedAndInput(selectedWorks, inputWork, 'work'),
    };
  };

  const handleSubmit = async () => {
    const { selectedDestinations, selectedBusinesses, selectedWorks } =
      getFormData();

    const errorMessage = validateForm({
      selectedUsername,
      selectedDestinations,
      selectedBusinesses,
      selectedWorks,
      selectedCar,
      isDaily,
      startDate,
      endDate,
    });
    if (errorMessage) {
      return toast.error(errorMessage);
    }

    add.mutate({
      selectedUsername,
      selectedBusinesses,
      selectedDestinations,
      selectedWorks,
      selectedCar,
      isDaily,
      startDate,
      endDate,
      remarks,
    });
  };

  return (
    <div className='flex min-h-screen w-full flex-col items-center bg-gradient-to-br from-gray-50 to-blue-50 p-10 sm:p-4'>
      <Container className='' maxWidth='xl'>
        <div className='w-full'>
          <div className='mb-8 flex items-center justify-between'>
            <ArrowBack type='not home' />
            <div className='flex items-center rounded-2xl bg-white shadow-lg ring-1 ring-black/5 sm:px-6 sm:py-2 md:px-16 md:py-4'>
              <Calendar className='mr-2 h-5 w-5 text-blue-600 transition-colors group-hover:text-blue-700 sm:hidden' />

              <span className='whitespace-nowrap text-xl font-semibold text-gray-700 transition-colors sm:text-xs'>
                {formDate}
              </span>
            </div>

            <Logout />
          </div>

          <div className='w-full rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100'>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12 }}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <DateSection isDaily={form.isDaily} dispatch={dispatch} />
                  </Grid>
                  {usernames && (
                    <NameSection usernames={usernames} dispatch={dispatch} />
                  )}
                  {cars && <CarSection cars={cars} dispatch={dispatch} />}
                </Grid>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Divider className='my-4' />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Grid container spacing={3}>
                  {destinations && (
                    <DestinationSection
                      destinations={destinations}
                      form={form}
                      dispatch={dispatch}
                    />
                  )}

                  {businesses && (
                    <BusinessSection
                      businesses={businesses}
                      form={form}
                      dispatch={dispatch}
                    />
                  )}
                  {works && (
                    <WorkSection
                      works={works}
                      form={form}
                      dispatch={dispatch}
                    />
                  )}
                </Grid>
              </Grid>

              <RemarkSection remarks={remarks} dispatch={dispatch} />
            </Grid>
            <div className='lg:justify-end lg:flex-1 flex justify-center'>
              <button
                onClick={handleSubmit}
                className='min-w-[160px] rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              >
                입력 완료
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
