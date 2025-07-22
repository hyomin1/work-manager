import { Tab, Tabs } from '@mui/material';
import type { AdminType } from '../types/admin';
import { TABS } from '../constants/admin';

interface Props {
  activeTab: string;
  onTabClick: (tab: AdminType) => void;
}

export default function TableHeader({ activeTab, onTabClick }: Props) {
  return (
    <div className='border-b border-gray-200 bg-white'>
      <div className='overflow-x-auto'>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => onTabClick(newValue)}
          variant='scrollable'
          scrollButtons={false}
          textColor='primary'
          indicatorColor='primary'
          className='min-h-[48px]'
          sx={{
            '& .MuiTabs-scroller': {
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              scrollbarWidth: 'none',
            },
          }}
        >
          {TABS.map(({ key, label }) => (
            <Tab
              key={key}
              value={key}
              label={label}
              className='min-h-[48px] font-semibold transition-colors hover:bg-blue-50'
              sx={{
                minWidth: '14.285%',
              }}
            />
          ))}
        </Tabs>
      </div>
    </div>
  );
}
