import { useEffect, useState } from 'react';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { Edit, Trash2, ListPlus } from 'lucide-react';
import { Autocomplete, TextField, Button } from '@mui/material';
import AdminAdd from '../AdminAdd';
import AdminEdit from '../AdminEdit';
import { TABS } from '../../../constants/adminTabs';
import type { IDestinations } from '../../../interfaces/interface';
import { getDestinations } from '../../../api';
import DeleteBox from '../../../components/common/DeleteBox';

interface TabContentProps {
  activeTab: string;
  data: any[];
  removeItem: (id: string) => void;
  queryClient: QueryClient;
  destination: string;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
}

const TableBody = ({
  activeTab,
  data,
  removeItem,
  queryClient,
  destination,
  setDestination,
}: TabContentProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const activeTabConfig = TABS.find((tab) => tab.key === activeTab);
  const [item, setItem] = useState<{ [key: string]: string } | null>(null);
  const [itemId, setItemId] = useState('');

  const { data: destinations } = useQuery<IDestinations[]>({
    queryKey: ['destinations'],
    queryFn: getDestinations,
    enabled: activeTab === 'business',
    select: (data) => (activeTab === 'business' ? data : []),
  });

  const handleAddData = () => {
    if (activeTab === 'business' && destination === '') {
      alert('방문지를 선택해주세요.');
      return;
    }
    setIsAdding(true);
  };

  const editItem = (id: string, item: any) => {
    setItemId(id);
    setItem({ [activeTab]: item[activeTab] });
    setIsEditing(true);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    removeItem(selectedId);
    setDeleteDialogOpen(false);
  };

  useEffect(() => {
    if (activeTab !== 'business') {
      setDestination('');
    }
  }, [activeTab, setDestination]);

  useEffect(() => {
    const handleEnter = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        setDeleteDialogOpen(false);
        removeItem(selectedId);
      }
    };
    window.addEventListener('keydown', handleEnter);
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [selectedId, removeItem]);

  return (
    <div className='bg-white'>
      {isAdding && (
        <AdminAdd
          setIsAdding={setIsAdding}
          type={activeTab}
          queryClient={queryClient}
          destination={destination}
        />
      )}
      {isEditing && (
        <AdminEdit
          setIsEditing={setIsEditing}
          type={activeTab}
          queryClient={queryClient}
          destination={destination}
          itemId={itemId}
          item={item}
        />
      )}

      <div className='flex items-center justify-between border-b border-gray-200 px-4 py-2'>
        <div className='w-1/3'>
          {activeTab === 'business' ? (
            <Autocomplete
              value={destination || ''}
              options={
                destinations
                  ?.sort((a, b) => a.destination.localeCompare(b.destination))
                  .map((item) => `${item._id},${item.destination}`) || []
              }
              getOptionLabel={(option) => option.split(',')[1] || ''}
              onChange={(e, newValue) => setDestination(newValue || '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='방문지 선택'
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              )}
              size='small'
            />
          ) : (
            <div className='text-lg font-semibold text-gray-700'>목록</div>
          )}
        </div>

        <Button
          variant='contained'
          color='primary'
          startIcon={<ListPlus className='h-5 w-5' />}
          onClick={handleAddData}
          className='bg-blue-600 hover:bg-blue-700'
        >
          등록
        </Button>
      </div>

      <div>
        {data.map((item, index) => (
          <div
            key={item._id}
            className={`flex items-center justify-between px-4 py-4 text-lg ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            <div className='flex-1 truncate pr-4 text-gray-900'>
              {activeTab === 'business'
                ? item.business
                : item[activeTabConfig?.dataKey || '']}
            </div>
            <div className='flex justify-end gap-2'>
              <button
                className='flex items-center rounded-md px-2 py-1 text-sm font-medium text-blue-600 transition-all hover:bg-slate-100'
                onClick={() => editItem(item._id, item)}
              >
                <Edit className='h-5 w-5' />
                수정
              </button>
              <button
                className='flex items-center rounded-md px-2 py-1 text-sm font-medium text-red-600 transition-all hover:bg-red-50'
                onClick={() => handleDeleteClick(item._id)}
              >
                <Trash2 className='h-5 w-5' />
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
      <DeleteBox
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        handleDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default TableBody;
