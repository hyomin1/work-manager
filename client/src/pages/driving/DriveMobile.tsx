import React from 'react';
import type { IDrivingInform } from '../../interfaces/interface';
import { calCarDay } from '../../api';
interface IDriveMobileProps {
  drivingInform: IDrivingInform[];
  totalDrivingKM: number;
  totalFuelCost: number;
  totalToll: number;
  totalEtcCost: number;
  grandTotal: number;
  indexOfFirstItem: number;
  indexOfLastItem: number;
}
// 차량 운행일지 모바일 화면
function DriveMobile({
  drivingInform,
  totalDrivingKM,
  totalEtcCost,
  totalFuelCost,
  totalToll,
  grandTotal,
  indexOfFirstItem,
  indexOfLastItem,
}: IDriveMobileProps) {
  return (
    <div className='h-full sm:w-full'>
      {drivingInform
        ?.sort((a, b) => {
          if (
            new Date(a.driveDay).getTime() === new Date(b.driveDay).getTime()
          ) {
            return a.startKM - b.startKM;
          }

          return (
            new Date(a.driveDay).getTime() - new Date(b.driveDay).getTime()
          );
        })
        ?.slice(indexOfFirstItem, indexOfLastItem)
        .map((item, index) => (
          <div
            key={index}
            className='mb-1 grid grid-cols-3 gap-2 space-x-0 rounded-lg border border-gray-300 bg-white p-4 text-sm shadow-md'
          >
            <div className='flex flex-col'>
              <span className='mb-1 font-bold'>날짜</span>
              <span>{calCarDay(item.driveDay)}</span>
            </div>

            <div className='flex flex-col'>
              <span className='mb-1 font-bold'>운전자</span>
              <span>{item.username}</span>
            </div>
            <div className='flex flex-col'>
              <span className='mb-1 whitespace-nowrap font-bold'>행선지</span>
              <p>{item.drivingDestination}</p>
            </div>
            <div className='flex flex-col'>
              <span className='mb-1 font-bold'>출발(km)</span>
              <span>{item.startKM.toLocaleString()} km</span>
            </div>
            <div className='flex flex-col'>
              <span className='mb-1 font-bold'>도착(km)</span>
              <span>{item.endKM.toLocaleString()} km</span>
            </div>
            <div className='flex flex-col'>
              <span className='mb-1 font-bold'>주행거리</span>
              <p>{item.totalKM.toLocaleString()} km</p>
            </div>
            <div className='flex flex-col'>
              <span className='mb-1 font-bold'>주유비</span>
              <span>{item.fuelCost.toLocaleString()}</span>
            </div>
            <div className='flex flex-col'>
              <span className='mb-1 font-bold'>하이패스</span>
              <span> {item.toll.toLocaleString()}</span>
            </div>
            <div className='flex flex-col'>
              <span className='mb-1 font-bold'>기타</span>
              <span>
                {item.etc.cost > 0 && (
                  <p>
                    {item.etc.cost.toLocaleString()} ({item.etc.name})
                  </p>
                )}
              </span>
            </div>
          </div>
        ))}
      <div className='mb-1 grid w-full grid-cols-3 gap-2 space-x-0 rounded-lg border border-gray-300 bg-white p-4 text-sm shadow-md print:text-[9px]'>
        <div className='flex flex-col'>
          <span className='font-bold'>주행거리</span>
          <span>{totalDrivingKM.toLocaleString()} km</span>
        </div>

        <div className='flex flex-col'>
          <span className='font-bold'>주유비</span>
          <span>{totalFuelCost.toLocaleString()}</span>
        </div>
        <div className='flex flex-col'>
          <span className='font-bold'>하이패스</span>
          <span>{totalToll.toLocaleString()}</span>
        </div>
        <div className='flex flex-col'>
          <span className='font-bold'>기타</span>
          <span>{totalEtcCost.toLocaleString()}</span>
        </div>
        <div />
        <div className='flex flex-col'>
          <span className='font-bold'>총계</span>
          <span>{grandTotal.toLocaleString()}</span>
        </div>
        <div />
      </div>
    </div>
  );
}

export default DriveMobile;
