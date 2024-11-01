import React, { useState } from 'react';
import { axiosReq } from '../../api';
import { QueryClient } from '@tanstack/react-query';

interface IAddData {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  queryClient: QueryClient;
  notice: string;
}

function AddDriveNotification({
  setIsAdding,
  id,
  queryClient,
  notice,
}: IAddData) {
  const [notification, setNotification] = useState(notice);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axiosReq.post(
      '/api/driving-inform/addNotification',
      {
        id,
        notification,
      }
    );
    if (response.status === 200) {
      alert(response.data.message);
      setIsAdding(false);
      queryClient.invalidateQueries({ queryKey: ['notification', id] });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return (
    <div className="fixed inset-0 top-0 z-10 flex items-center justify-center px-4 bg-black bg-opacity-65">
      <form
        className="flex flex-col p-6 bg-white rounded-lg shadow-lg w-[40%] h-80"
        onSubmit={onSubmit}
      >
        <h2 className="mb-4 text-xl font-bold text-center">공지 등록</h2>
        <div className="flex flex-col">
          <input
            autoFocus
            placeholder="입력"
            value={notification}
            onChange={(e) => setNotification(e.target.value)}
            className="p-2 mb-4 border rounded"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:opacity-80"
          >
            등록
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:opacity-80"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDriveNotification;
