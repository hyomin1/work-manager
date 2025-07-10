import React, { useEffect, useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { api } from '../../api';

interface IAddData {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  queryClient: QueryClient;
  destination?: string;
}

function AdminAdd({ setIsAdding, type, queryClient, destination }: IAddData) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsAdding(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setIsAdding]);

  const handleCancel = () => {
    setIsAdding(false);
  };

  const changeName = () => {
    switch (type) {
      case 'username':
        return '이름';
      case 'destination':
        return '방문지';
      case 'business':
        return '사업명';
      case 'work':
        return '업무';
      case 'car':
        return '차량';
      case 'etcName':
        return '기타 비용';
      case 'department':
        return '파트';
      default:
        return '';
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let url = '/api/employee-inform/';
    let body = {};

    switch (type) {
      case 'username':
        url += 'addName';
        body = { username: inputValue };
        break;
      case 'destination':
        url += 'addDestination';
        body = { destination: inputValue };
        break;
      case 'business':
        url += 'addBusiness';
        body = {
          business: inputValue,
          destinationId: destination?.split(',')[0],
        };
        break;
      case 'work':
        url += 'addWork';
        body = { work: inputValue };
        break;
      case 'car':
        url += 'addCar';
        body = { car: inputValue };
        break;
      case 'etcName':
        url += 'addEtcName';
        body = { etcName: inputValue };
        break;
      case 'department':
        url += 'addDepartment';
        body = { department: inputValue };
        break;
      default:
        return;
    }

    const res = await api.post(url, body);
    if (res.status === 201) {
      alert('성공적으로 등록하였습니다.');
      queryClient.invalidateQueries({ queryKey: [type] });
      setIsAdding(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0'>
      <div
        className='absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity'
        onClick={handleCancel}
      />
      <div className='animate-in zoom-in-95 w-full duration-200'>
        <form
          className='relative mx-auto flex w-full max-w-[32rem] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl'
          onSubmit={onSubmit}
        >
          <div className='bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 px-4 py-4 sm:px-8 sm:py-6'>
            <h2 className='text-center text-xl font-semibold text-white sm:text-2xl'>
              {changeName()} 등록
            </h2>
          </div>

          <div className='flex flex-1 flex-col space-y-4 p-4 sm:space-y-6 sm:p-8'>
            {type === 'business' && destination && (
              <div className='rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 p-3 sm:rounded-2xl sm:p-4'>
                <span className='font-medium text-blue-900'>
                  {destination.split(',')[1]}
                </span>
              </div>
            )}

            <div className='flex flex-col space-y-2 sm:space-y-3'>
              <label className='text-sm font-medium text-gray-700'>
                {changeName()}
              </label>
              <input
                autoFocus
                value={inputValue}
                onChange={handleOnChange}
                className='h-11 rounded-lg border-2 border-gray-200 px-3 text-base transition-all placeholder:text-gray-400 hover:border-blue-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 sm:h-12 sm:rounded-xl sm:px-4'
                placeholder={`${changeName()}을(를) 입력하세요`}
              />
            </div>
          </div>

          <div className='flex justify-end gap-2 border-t border-gray-100 bg-gray-50/50 px-4 py-4 sm:gap-3 sm:px-8 sm:py-6'>
            <button
              type='button'
              onClick={handleCancel}
              className='rounded-lg border-2 border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-400/20 sm:rounded-xl sm:px-6 sm:py-2.5'
            >
              취소
            </button>
            <button
              type='submit'
              className='rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-500/30 focus:outline-none focus:ring-4 focus:ring-blue-500/30 sm:rounded-xl sm:px-6 sm:py-2.5'
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminAdd;
