import React, { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { axiosReq } from '../../api';

interface IAddData {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  queryClient: QueryClient;
  destination?: string;
}

function AddAdminData({
  setIsAdding,
  type,
  queryClient,
  destination,
}: IAddData) {
  const [inputValue, setInputValue] = useState('');

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
      default:
        return '';
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let url = '';
    let body = {};

    switch (type) {
      case 'username':
        url = '/api/employee-inform/addName';
        body = { username: inputValue };
        break;
      case 'destination':
        url = '/api/employee-inform/addDestination';
        body = { destination: inputValue };
        break;
      case 'business':
        url = '/api/employee-inform/addBusiness';
        body = {
          business: inputValue,
          destinationId: destination?.split(',')[0],
        };
        break;
      case 'work':
        url = '/api/employee-inform/addWork';
        body = { work: inputValue };
        break;
      case 'car':
        url = '/api/employee-inform/addCar';
        body = { car: inputValue };
        break;
      case 'etcName':
        url = '/api/employee-inform/addEtcName';
        body = { etcName: inputValue };
        break;
      default:
        return;
    }

    const res = await axiosReq.post(url, body);
    if (res.status === 200) {
      alert('성공적으로 등록하였습니다.');
      queryClient.invalidateQueries({ queryKey: [type] });
      setIsAdding(false);
    }
  };

  return (
    <div className="fixed inset-0 top-0 z-10 flex items-center justify-center px-4 bg-black bg-opacity-65">
      <form
        className="flex flex-col p-6 bg-white rounded-lg shadow-lg w-96 h-80"
        onSubmit={onSubmit}
      >
        <h2 className="mb-4 text-xl font-bold text-center">
          {changeName()} 등록
        </h2>
        <div className="flex flex-col">
          {type === 'business' && destination && (
            <span className="mb-2 font-bold">{destination.split(',')[1]}</span>
          )}
          <input
            autoFocus
            placeholder="입력"
            value={inputValue}
            onChange={handleOnChange}
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

export default AddAdminData;
