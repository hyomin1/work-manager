import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField } from '@mui/material';
import { Megaphone, XIcon, Trash2 } from 'lucide-react';
import { useVehicleLogStore } from '../../stores/useVehicleLogStore';
import { boxStyle, inputStyles } from '../../../../styles/style';
import useVehicleLog from '../../hooks/useVehicle';

interface Props {
  carId: string;
  notification?: string;
}

export default function VehicleNoticeFormModal({ carId, notification }: Props) {
  const [inputNotification, setInputNotification] = useState(notification);

  const isisNoticeModalOpen = useVehicleLogStore(
    (state) => state.isNoticeModalOpen
  );
  const { addNotice, deleteNotice } = useVehicleLog();
  const setIsNoticeModalOpen = useVehicleLogStore(
    (state) => state.setIsNoticeModalOpen
  );
  const onClose = () => setIsNoticeModalOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNotice.mutate(
      { carId, notification: inputNotification },
      {
        onSuccess: onClose,
      }
    );
  };

  const handleDelete = async () => {
    // window.confirm 대체하기
    if (window.confirm('공지사항을 삭제하시겠습니까?')) {
      deleteNotice.mutate(carId, {
        onSuccess: onClose,
      });
    }
  };

  useEffect(() => {
    setInputNotification(notification || '');
  }, [notification, isisNoticeModalOpen]);

  return (
    <Modal
      open={isisNoticeModalOpen}
      onClose={onClose}
      className='backdrop-blur-sm'
    >
      <Box sx={boxStyle}>
        <div className='relative rounded-t-[24px] bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4'>
          <div className='flex items-center space-x-3'>
            <Megaphone className='h-6 w-6 text-white' />
            <h2 className='text-xl font-bold text-white'>공지사항</h2>
          </div>
          <button
            onClick={onClose}
            className='absolute right-4 top-4 text-white/80 transition-colors hover:text-white'
          >
            <XIcon className='h-5 w-5' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6 p-6'>
          <TextField
            fullWidth
            multiline
            rows={6}
            placeholder='공지사항을 입력하세요'
            value={inputNotification}
            onChange={(e) => setInputNotification(e.target.value)}
            sx={inputStyles}
          />

          <div className='flex items-center justify-between pt-2'>
            <button
              type='button'
              onClick={handleDelete}
              className='flex items-center rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200'
            >
              <Trash2 className='mr-2 h-4 w-4' />
              삭제
            </button>

            <div className='flex space-x-3'>
              <button
                type='button'
                onClick={onClose}
                className='rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200'
              >
                취소
              </button>
              <button
                type='submit'
                className='rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              >
                등록
              </button>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
