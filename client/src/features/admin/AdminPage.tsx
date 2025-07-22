import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { Paper, Pagination } from '@mui/material';
import { directAdminSession, formDate } from '../../api';
import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';
import ArrowBack from '../../components/common/ArrowBack';
import LogoutButton from '../../features/auth/components/LogoutButton';
import { useAdmin } from './hooks/useAdmin';
import AddCommonDataForm from './components/AddCommonDataForm';
import toast from 'react-hot-toast';
import type { AdminType } from './types/admin';
import EditCommonDataForm from './components/EditCommonDataForm';
import ItemList from './components/ItemList';
import DeleteBox from '../../components/common/DeleteBox';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminType>('username');
  const [page, setPage] = useState(1);
  const [destination, setDestination] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [editId, setEditId] = useState('');
  const [deleteId, setDeleteId] = useState('');

  const { data, destinations, removeItem } = useAdmin(activeTab, page);

  useEffect(() => {
    directAdminSession();
  }, []);

  const handleTabClick = (tab: AdminType) => {
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

  const selectedItem = filteredData.find((item) => item._id === editId);

  const handleAddClick = () => {
    if (activeTab === 'business' && destination === '') {
      toast.error('방문지를 선택해주세요.');
      return;
    }
    setIsAdd(true);
  };

  const handleDelete = () => {
    removeItem(deleteId, {
      onSuccess: () => setDeleteId(''),
    });
  };

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

          <LogoutButton />
        </div>

        <Paper elevation={3} className='overflow-hidden rounded-lg'>
          <TableHeader activeTab={activeTab} onTabClick={handleTabClick} />
          <ItemList
            activeTab={activeTab}
            destination={destination}
            destinations={destinations || []}
            setDestination={setDestination}
            onClick={handleAddClick}
          />
          <TableBody
            destinations={destinations || []}
            activeTab={activeTab}
            data={paginatedData}
            destination={destination}
            setDestination={setDestination}
            setEditId={setEditId}
            setDeleteId={setDeleteId}
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
      {isAdd && (
        <AddCommonDataForm
          onClose={() => setIsAdd(false)}
          activeTab={activeTab}
          destination={destination}
        />
      )}
      {editId && (
        <EditCommonDataForm
          activeTab={activeTab}
          onClose={() => setEditId('')}
          destination={destination}
          editId={editId}
          selectedItem={selectedItem}
        />
      )}
      <DeleteBox
        open={!!deleteId}
        onClose={() => setDeleteId('')}
        onDelete={handleDelete}
      />
    </div>
  );
}
