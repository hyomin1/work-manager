import { useEffect, useState } from 'react';
import { api, dailyWorkDay } from '../../api';
import { Edit, X } from 'lucide-react';
import { useCustomQueries } from '../../hooks/useCustomQuery';
import { Button, MenuItem, Select, TextField } from '@mui/material';

interface IDailyWorkView {
  id: string;
  currentDate: Date | null;
  setViewId: React.Dispatch<React.SetStateAction<string>>;
  refetch: () => void;
}

function DailyWorkView({
  id,
  setViewId,
  currentDate,
  refetch,
}: IDailyWorkView) {
  const [username, setUsername] = useState('');
  const [department, setDepartment] = useState('');
  const [content, setContent] = useState('');
  const [nextContent, setNextContent] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { names, departments } = useCustomQueries();

  const onSubmit = async () => {
    const response = await api.put('/api/employee-inform/dailyWork/edit', {
      _id: id,
      username,
      department,
      content,
      nextContent,
    });
    if (response.status === 200) {
      setIsEditing((prev) => !prev);
      refetch();
    }
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setViewId('');
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setViewId]);

  useEffect(() => {
    const fetchDailyWork = async () => {
      const response = await api.get(`/api/employee-inform/dailyWork/${id}`);
      if (response.status !== 200) {
        return;
      }
      const { username, department, content, nextContent, isOwner } =
        response.data.dailyWork;
      setUsername(username);
      setDepartment(department);
      setContent(content);
      setNextContent(nextContent);
      setIsOwner(isOwner);
    };
    fetchDailyWork();
  }, [id]);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div
        className={`scrollbar-thin h-[98vh] w-[58%] overflow-y-auto rounded-xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] sm:w-[90%]`}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#CBD5E1 transparent',
        }}
      >
        <style>
          {`
            .scrollbar-thin::-webkit-scrollbar {
              width: 6px;
            }
            
            .scrollbar-thin::-webkit-scrollbar-track {
              background: transparent;
            }
            
            .scrollbar-thin::-webkit-scrollbar-thumb {
              background-color: #CBD5E1;
              border-radius: 20px;
            }
            
            .scrollbar-thin::-webkit-scrollbar-thumb:hover {
              background-color: #94A3B8;
            }

            .MuiInputBase-root textarea::-webkit-scrollbar {
              width: 6px;
            }
            
            .MuiInputBase-root textarea::-webkit-scrollbar-track {
              background: transparent;
            }
            
            .MuiInputBase-root textarea::-webkit-scrollbar-thumb {
              background-color: #CBD5E1;
              border-radius: 20px;
            }
            
            .MuiInputBase-root textarea::-webkit-scrollbar-thumb:hover {
              background-color: #94A3B8;
            }
          `}
        </style>

        <div className='mb-5 flex items-center justify-between border-b border-gray-100 pb-3'>
          <h2 className='text-xl font-bold text-gray-800'>일일 업무 현황</h2>
          <div className='flex items-center space-x-2'>
            {isOwner && (
              <button
                onClick={() => setIsEditing((prev) => !prev)}
                className='rounded-full p-1.5 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600'
              >
                <Edit className='h-5 w-5' strokeWidth={1.5} />
              </button>
            )}
            <button
              onClick={() => setViewId('')}
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
              {isEditing ? (
                <Select
                  className='h-8 w-[200px]'
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(243 244 246)',
                      borderWidth: '1px',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(209 213 219)',
                    },
                    '& .MuiSelect-select': {
                      paddingY: '2px',
                      fontSize: '0.875rem',
                    },
                  }}
                >
                  {departments
                    ?.sort((a, b) => a.department.localeCompare(b.department))
                    .map((item) => (
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
              {isEditing ? (
                <Select
                  className='h-8 w-[200px]'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(243 244 246)',
                      borderWidth: '1px',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(209 213 219)',
                    },
                    '& .MuiSelect-select': {
                      paddingY: '2px',
                      fontSize: '0.875rem',
                    },
                  }}
                >
                  {names
                    ?.sort((a, b) => a.username.localeCompare(b.username))
                    .map((item) => (
                      <MenuItem key={item._id} value={item.username}>
                        {item.username}
                      </MenuItem>
                    ))}
                </Select>
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
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                rows={18}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    fontSize: '0.92rem',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '& .MuiInputBase-root': {
                    padding: '12px',
                    color: '#374151',
                  },
                }}
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
              {isEditing ? (
                <TextField
                  fullWidth
                  multiline
                  rows={7}
                  value={nextContent}
                  onChange={(e) => setNextContent(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      fontSize: '0.875rem',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '& .MuiInputBase-root': {
                      padding: '12px',
                      color: '#374151',
                    },
                  }}
                />
              ) : (
                <div className='mt-1 h-40 overflow-y-auto whitespace-pre-line p-2 text-sm text-gray-600'>
                  {nextContent}
                </div>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className='mt-3 flex justify-end space-x-3'>
            <Button
              variant='contained'
              onClick={onSubmit}
              className='h-9 px-4 text-sm font-medium'
              sx={{
                textTransform: 'none',
                backgroundColor: '#3b82f6',
                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                '&:hover': {
                  backgroundColor: '#2563eb',
                  boxShadow:
                    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                },
                '&:active': {
                  backgroundColor: '#1d4ed8',
                },
                '&:focus': {
                  boxShadow: '0 0 0 2px #bfdbfe',
                },
              }}
            >
              완료
            </Button>
            <Button
              variant='outlined'
              onClick={() => setIsEditing(false)}
              className='h-9 px-4 text-sm font-medium'
              sx={{
                textTransform: 'none',
                borderColor: '#e5e7eb',
                color: '#4b5563',
                backgroundColor: 'white',
                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                '&:hover': {
                  backgroundColor: '#f9fafb',
                  borderColor: '#d1d5db',
                  color: '#374151',
                },
                '&:active': {
                  backgroundColor: '#f3f4f6',
                },
                '&:focus': {
                  boxShadow: '0 0 0 2px #f3f4f6',
                },
              }}
            >
              취소
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyWorkView;
