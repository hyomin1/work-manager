import React, { useState } from 'react';
import {
  Autocomplete,
  FormControl,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from '@mui/material';
import { X } from 'lucide-react';
import { useCommonData } from '../../../hooks/useCommonData';
import type { DailyWorkForm } from '../types/dailyWork';
import useDailyWork from '../hooks/useDailyWork';
import useEscapeKey from '../../work-status/hooks/useEscapeKey';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { dailyWorkStyle } from '../../../styles/style';
import FormButton from './FormButton';
import ScreenModal from './ScreenModal';
import { dailyWorkDay } from '../utils/formatDate';

interface Props {
  currentDate: Date | null;
  onClose: () => void;
}

export default function DailyWorkAddForm({ currentDate, onClose }: Props) {
  const { usernames, usernamesLoading, departments, departmentsLoading } =
    useCommonData();
  const isLoading = usernamesLoading || departmentsLoading;
  const [form, setForm] = useState<DailyWorkForm>({
    writingDate: currentDate,
    username: '',
    department: '',
    content: '1. ',
    nextContent: '1. ',
  });

  const sortedUsernames =
    usernames
      ?.sort((a, b) => a.username.localeCompare(b.username))
      ?.map((item) => item.username) || [];

  const sortedDepartments = departments?.sort((a, b) =>
    a.department.localeCompare(b.department)
  );

  const { department, content, nextContent } = form;

  const { addItem } = useDailyWork();

  const handleSubmit = () => {
    addItem(form, {
      onSuccess: onClose,
    });
  };

  useEscapeKey(onClose);
  const handleNameChange = (
    _: React.SyntheticEvent,
    username: string | null
  ) => {
    if (username) {
      setForm((prev) => ({
        ...prev,
        username,
      }));
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ScreenModal onClose={onClose}>
      <div className='mb-5 flex items-center justify-between border-b border-gray-100 pb-3'>
        <h2 className='text-xl font-bold text-gray-800'>일일 업무 현황</h2>
        <button
          onClick={onClose}
          className='rounded-full p-1.5 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600'
        >
          <X className='h-5 w-5' />
        </button>
      </div>

      <div className='overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm'>
        <div className='grid grid-cols-9 border-b border-gray-100'>
          <div className='col-span-1 flex items-center justify-center border-r border-gray-100 bg-gray-50 py-2 text-sm font-medium text-gray-600'>
            파트
          </div>
          <div className='col-span-8 p-1.5'>
            <FormControl className='w-[200px]'>
              <Select
                className='h-8'
                value={department}
                name='department'
                onChange={handleChange}
                sx={dailyWorkStyle}
              >
                {sortedDepartments?.map((item) => (
                  <MenuItem key={item._id} value={item.department}>
                    {item.department}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className='grid grid-cols-9 border-b border-gray-100'>
          <div className='col-span-1 flex items-center justify-center border-r border-gray-100 bg-gray-50 py-2 text-sm font-medium text-gray-600'>
            작성자
          </div>
          <div className='col-span-8 p-1.5'>
            <FormControl className='w-[200px]'>
              <Autocomplete
                size='small'
                options={sortedUsernames}
                renderInput={(params) => (
                  <TextField {...params} sx={dailyWorkStyle} />
                )}
                onChange={handleNameChange}
              />
            </FormControl>
          </div>
        </div>

        <div className='grid grid-cols-9 border-b border-gray-100'>
          <div className='col-span-1 flex items-center justify-center border-r border-gray-100 bg-gray-50 py-2 text-sm font-medium text-gray-600'>
            작성 일자
          </div>
          <div className='col-span-8 p-2 text-sm text-gray-600'>
            {dailyWorkDay(currentDate || new Date())}
          </div>
        </div>

        <div className='border-b border-gray-100'>
          <TextField
            fullWidth
            multiline
            rows={18}
            name='content'
            value={content}
            onChange={handleChange}
            sx={dailyWorkStyle}
          />
        </div>

        <div className='grid grid-cols-9'>
          <div className='col-span-1 flex items-center justify-center border-r border-gray-100 bg-gray-50 py-2 text-sm font-medium text-gray-600'>
            내일 일과
          </div>
          <div className='col-span-8'>
            <TextField
              fullWidth
              multiline
              rows={8}
              name='nextContent'
              value={nextContent}
              onChange={handleChange}
              sx={dailyWorkStyle}
            />
          </div>
        </div>
      </div>
      <FormButton onSubmit={handleSubmit} onClose={onClose} />
    </ScreenModal>
  );
}
