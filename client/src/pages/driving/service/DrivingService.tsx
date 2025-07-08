import ArrowBack from '../../../components/common/ArrowBack';
import Logout from '../../../features/auth/components/Logout';
import { calculateDate } from '../../../api';
import ServiceTab from './ServiceTab';
import { Calendar } from 'lucide-react';

function DrivingService() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-between bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-2'>
      <div className='flex w-[90%] flex-col items-center sm:w-full'>
        <div className='mb-4 mt-4 flex w-full items-center justify-between sm:mt-4 print:justify-center'>
          <ArrowBack type='not home' />
          <div className='flex items-center rounded-2xl bg-white shadow-lg ring-1 ring-black/5 sm:px-6 sm:py-2 md:px-16 md:py-4'>
            <Calendar className='mr-2 h-5 w-5 text-blue-600 transition-colors group-hover:text-blue-700 sm:hidden' />
            <span className='whitespace-nowrap text-xl font-semibold text-gray-700 transition-colors sm:text-xs'>
              {calculateDate(new Date())}
            </span>
          </div>
          <Logout />
        </div>
      </div>

      <ServiceTab />
    </div>
  );
}

export default DrivingService;
