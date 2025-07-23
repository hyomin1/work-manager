import React, { useState } from 'react';
import { dailyWorkDay } from '../../../api';
import { Edit, X } from 'lucide-react';
import { useCommonData } from '../../../hooks/useCommonData';
import {
  Autocomplete,
  FormControl,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from '@mui/material';
import useEscapeKey from '../../work-status/hooks/useEscapeKey';
import { dailyWorkStyle } from '../../../styles/style';
import useDailyWork from '../hooks/useDailyWork';
import type { DailyWork } from '../types/dailyWork';
import FormButton from './FormButton';

interface Props {
  id: string;
  dailyWork: DailyWork;
  onClose: () => void;
  onCloseEdit: () => void;
  currentDate: Date | null;
  onChangeOpenEdit: () => void;
  openEdit: boolean;
}

export default function DailyWorkView({
  id,
  onClose,
  dailyWork,
  currentDate,
  onCloseEdit,
  onChangeOpenEdit,
  openEdit,
}: Props) {
  const [form, setForm] = useState({
    writingDate: currentDate,
    username: dailyWork.username,
    department: dailyWork.department,
    content: dailyWork.content,
    nextContent: dailyWork.nextContent,
  });
  const { username, department, content, nextContent } = form;
  const { isOwner } = dailyWork;
  const { usernames, departments } = useCommonData();
  const { editItem } = useDailyWork();

  const sortedDepartments = departments?.sort((a, b) =>
    a.department.localeCompare(b.department)
  );
  const sortedUsernames =
    usernames
      ?.sort((a, b) => a.username.localeCompare(b.username))
      ?.map((item) => item.username) || [];
  const handleSubmit = () => {
    editItem(
      { id, form },
      {
        onSuccess: onChangeOpenEdit,
      }
    );
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
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div
        className={`scrollbar-thin h-[98vh] w-[58%] overflow-y-auto rounded-xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] sm:w-[90%]`}
      >
        <div className='mb-5 flex items-center justify-between border-b border-gray-100 pb-3'>
          <h2 className='text-xl font-bold text-gray-800'>일일 업무 현황</h2>
          <div className='flex items-center space-x-2'>
            {isOwner && (
              <button
                onClick={onChangeOpenEdit}
                className='rounded-full p-1.5 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600'
              >
                <Edit className='h-5 w-5' strokeWidth={1.5} />
              </button>
            )}
            <button
              onClick={onClose}
              className='rounded-full p-1.5 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600'
            >
              <X className='h-5 w-5' />
            </button>
          </div>
        </div>

        <div className='overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm'>
          <div className='grid grid-cols-9 border-b border-gray-100'>
            <div className='col-span-1 flex items-center justify-center border-r border-gray-100 bg-gray-50 py-2 text-sm font-medium text-gray-600'>
              파트
            </div>
            <div className='col-span-8 p-1.5'>
              {openEdit ? (
                <Select
                  className='h-8 w-[200px]'
                  name='department'
                  value={department}
                  onChange={handleChange}
                  sx={dailyWorkStyle}
                >
                  {sortedDepartments?.map((item) => (
                    <MenuItem key={item._id} value={item.department}>
                      {item.department}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <div className='py-1 text-sm text-gray-700'>{department}</div>
              )}
            </div>
          </div>

          <div className='grid grid-cols-9 border-b border-gray-100'>
            <div className='col-span-1 flex items-center justify-center border-r border-gray-100 bg-gray-50 py-2 text-sm font-medium text-gray-600'>
              작성자
            </div>
            <div className='col-span-8 p-1.5'>
              {openEdit ? (
                <FormControl className='w-[200px]'>
                  <Autocomplete
                    size='small'
                    value={username}
                    options={sortedUsernames}
                    renderInput={(params) => (
                      <TextField {...params} sx={dailyWorkStyle} />
                    )}
                    onChange={handleNameChange}
                  />
                </FormControl>
              ) : (
                <div className='py-1 text-sm text-gray-700'>{username}</div>
              )}
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

          <div className='border-b border-gray-100 px-3'>
            <h3 className='mt-2 font-medium text-gray-700'>• {username}</h3>
            {openEdit ? (
              <TextField
                fullWidth
                multiline
                rows={18}
                name='content'
                value={content}
                onChange={handleChange}
                sx={dailyWorkStyle}
              />
            ) : (
              <div className='mt-1 h-96 overflow-y-auto whitespace-pre-line p-2 text-gray-600'>
                {content}
              </div>
            )}
          </div>

          <div className='grid grid-cols-9'>
            <div className='col-span-1 flex items-center justify-center border-r border-gray-100 bg-gray-50 py-2 font-medium text-gray-600'>
              내일 일과
            </div>
            <div className='col-span-8 px-3'>
              <h4 className='mt-2 text-sm font-medium text-gray-700'>
                • {username}
              </h4>
              {openEdit ? (
                <TextField
                  fullWidth
                  multiline
                  rows={7}
                  name='nextContent'
                  value={nextContent}
                  onChange={handleChange}
                  sx={dailyWorkStyle}
                />
              ) : (
                <div className='mt-1 h-40 overflow-y-auto whitespace-pre-line p-2 text-sm text-gray-600'>
                  {nextContent}
                </div>
              )}
            </div>
          </div>
        </div>

        {openEdit && (
          <FormButton onSubmit={handleSubmit} onClose={onCloseEdit} />
        )}
      </div>
    </div>
  );
}
