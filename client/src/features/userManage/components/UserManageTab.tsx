import { Tab, Tabs, Box } from '@mui/material';
import { User, UserCog } from 'lucide-react';
import { userManageTableStyle } from '../../../styles/style';

interface Props {
  value: number;
  setValue: (value: number) => void;
}

const tabs = [
  {
    id: 0,
    label: '사용자 목록',
    icon: <User className='h-5 w-5' />,
  },
  {
    id: 1,
    label: '승인 관리',
    icon: <UserCog className='h-5 w-5' />,
  },
];

function UserManageTab({ value, setValue }: Props) {
  const handleChangeValue = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className='w-[90%] space-y-6'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChangeValue}
          variant='fullWidth'
          sx={userManageTableStyle}
        >
          {tabs.map(({ id, label, icon }) => (
            <Tab
              key={id}
              id={id.toString()}
              icon={icon}
              iconPosition='start'
              label={label}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}

export default UserManageTab;
