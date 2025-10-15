import React, { useState } from 'react';
import useEscapeKey from '../../../hooks/useEscapeKey';
import Modal from '../../../components/common/Modal';
import { changeName } from '../utils/admin';
import type { AdminType } from '../types/admin';
import { useAdmin } from '../hooks/useAdmin';

interface Props {
  activeTab: AdminType;
  destination?: string;
  onClose: () => void;
}

export default function AddCommonDataForm({
  activeTab,
  onClose,
  destination,
}: Props) {
  const [inputValue, setInputValue] = useState('');
  const { addItem } = useAdmin(activeTab);

  useEscapeKey(onClose);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addItem(
      { inputValue, destination },
      {
        onSuccess: onClose,
      }
    );
  };

  const type = changeName(activeTab);

  return (
    <Modal onClose={onClose}>
      <form
        className='flex flex-col overflow-hidden rounded-2xl'
        onSubmit={onSubmit}
      >
        <div className='bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 px-6 py-4 sm:px-8 sm:py-6'>
          <h2 className='text-center text-xl font-semibold text-white sm:text-2xl'>
            {type} 등록
          </h2>
        </div>

        <div className='flex flex-1 flex-col space-y-4 px-6 py-5 sm:space-y-6 sm:px-8 sm:py-6'>
          {activeTab === 'business' && destination && (
            <div className='rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 p-3 sm:rounded-2xl sm:p-4'>
              <span className='font-medium text-blue-900'>
                {destination.split(',')[1]}
              </span>
            </div>
          )}

          <div className='flex flex-col space-y-2 sm:space-y-3'>
            <label className='text-sm font-medium text-gray-700'>{type}</label>
            <input
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className='w-full h-11 rounded-lg border-2 border-gray-200 px-3 text-base transition-all placeholder:text-gray-400 hover:border-blue-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 sm:h-12 sm:rounded-xl sm:px-4'
              placeholder={`${type}을(를) 입력하세요`}
            />
          </div>
        </div>

        <div className='flex justify-end gap-2 border-t border-gray-100 bg-gray-50/50 px-6 py-4 sm:gap-3 sm:px-8 sm:py-6'>
          <button
            type='button'
            onClick={onClose}
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
    </Modal>
  );
}
