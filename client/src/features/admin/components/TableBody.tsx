import { useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import type { Destination } from '../../work-status/types/workStatus';
import type { AdminDataItem } from '../types/admin';
import { TABS } from '../constants/admin';

interface Props {
  activeTab: string;
  data: AdminDataItem[];
  destinations: Destination[];
  destination: string;
  setDestination: (destination: string) => void;
  setEditId: (editId: string) => void;
  setDeleteId: (deleteId: string) => void;
}

export default function TableBody({
  activeTab,
  data,
  setDestination,
  setEditId,
  setDeleteId,
}: Props) {
  const activeTabConfig = TABS.find((tab) => tab.key === activeTab);

  useEffect(() => {
    if (activeTab !== 'business') {
      setDestination('');
    }
  }, [activeTab, setDestination]);

  return (
    <div className='bg-white'>
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
                ? (item as { business: string }).business
                : item[activeTabConfig?.dataKey as keyof typeof item]}
            </div>
            <div className='flex justify-end gap-2'>
              <button
                className='flex items-center rounded-md px-2 py-1 text-sm font-medium text-blue-600 transition-all hover:bg-slate-100'
                onClick={() => setEditId(item._id)}
              >
                <Edit className='h-5 w-5' />
                수정
              </button>
              <button
                className='flex items-center rounded-md px-2 py-1 text-sm font-medium text-red-600 transition-all hover:bg-red-50'
                onClick={() => setDeleteId(item._id)}
              >
                <Trash2 className='h-5 w-5' />
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
