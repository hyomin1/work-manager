import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Calendar } from 'lucide-react';
import { Paper, Pagination, Card, CardContent } from '@mui/material';
import { directAdminSession, formDate } from '../../api';
import { useAdminData } from '../../hooks/useAdminData';
import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';
import ArrowBack from '../../components/common/ArrowBack';
import Logout from '../../features/auth/components/LogoutButton';

const AdminPage = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<string>('username');
  const [page, setPage] = useState(1);
  const [destination, setDestination] = useState('');
  const { data, removeItem } = useAdminData(activeTab, page, queryClient);

  useEffect(() => {
    directAdminSession();
  }, []);

  const handleTabClick = (tab: string) => {
    setPage(1);
    setActiveTab(tab);
  };

  const filteredData = data.filter((item) => {
    if (activeTab === 'business') {
      return item.destinationId === destination.split(',')[0].trim();
    }
    return true;
  });

  const itemsPerPage = 10;
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className='lg:px-8 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-8 sm:px-6'>
      <div className='mx-auto w-[90%]'>
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

        <Paper elevation={3} className='overflow-hidden rounded-lg'>
          <TableHeader activeTab={activeTab} onTabClick={handleTabClick} />
          <TableBody
            activeTab={activeTab}
            data={paginatedData}
            removeItem={removeItem}
            queryClient={queryClient}
            destination={destination}
            setDestination={setDestination}
          />
        </Paper>

        <div className='fixed bottom-0 left-0 right-0 flex h-16 items-center justify-center backdrop-blur-sm'>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color='primary'
            size='large'
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
