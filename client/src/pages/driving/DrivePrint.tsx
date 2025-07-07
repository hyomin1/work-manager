import React from 'react';
import TabHeader from '../../components/layout/TabHeader';
import { drivingHeaders } from '../../constants/headers';
import type { IDrivingInform } from '../../interfaces/interface';
import { calCarDay } from '../../api';

interface IDrivePrint {
  drivingInform: IDrivingInform[];
  indexOfFirstItem: number;
  indexOfLastItem: number;
}
// 차량 운행일지 프린트 시 나오는 화면 (사용 X)
function DrivePrint({
  drivingInform,
  indexOfFirstItem,
  indexOfLastItem,
}: IDrivePrint) {
  const totalFuelCost =
    drivingInform?.reduce((acc, item) => acc + item.fuelCost, 0) || 0;

  const totalToll =
    drivingInform?.reduce((acc, item) => acc + item.toll, 0) || 0;

  const totalEtcCost =
    drivingInform?.reduce((acc, item) => acc + item.etc.cost, 0) || 0;

  const totalDrivingKM =
    drivingInform?.reduce((acc, item) => acc + item.totalKM, 0) || 0;
  const grandTotal = totalFuelCost + totalToll + totalEtcCost;
  return (
    <table className='hidden w-[100%] text-left print:block'>
      <TabHeader headers={drivingHeaders} />
      <tbody className='rounded-b-xl border border-black text-xs print:text-[9px]'>
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
            <tr
              key={index}
              className={`hover:bg-gray-100 sm:text-sm ${
                index % 2 === 0 ? 'bg-white' : 'w-full bg-gray-50'
              }`}
            >
              <td className='whitespace-nowrap border border-black py-2 pl-1'>
                {calCarDay(item.driveDay)}
              </td>
              <td className='whitespace-nowrap border border-black py-2 pl-1'>
                {item.username}
              </td>
              <td className='whitespace-nowrap border border-black py-2 pl-1'>
                {item.drivingDestination}
              </td>

              <td className='whitespace-nowrap border border-black py-2 pl-1'>
                {item.startKM.toLocaleString()}km
              </td>
              <td className='whitespace-nowrap border border-black py-2 pl-1'>
                {item.endKM.toLocaleString()}km
              </td>
              <td className='whitespace-nowrap border border-black py-2 pl-1'>
                {item.totalKM.toLocaleString()}km
              </td>
              <td className='whitespace-nowrap border border-black py-2 pl-1'>
                {item.fuelCost ? item.fuelCost.toLocaleString() : ''}
              </td>
              <td className='whitespace-nowrap border border-black py-2 pl-1'>
                {item.toll ? item.toll.toLocaleString() : ''}
              </td>
              <td className='whitespace-nowrap border border-black py-2 pl-1'>
                {item.etc.cost > 0 &&
                  `${item.etc.cost.toLocaleString()}(${item.etc.name})`}
              </td>
            </tr>
          ))}
        <tr>
          <td colSpan={5} />
          <td className='whitespace-nowrap border border-black py-2 pl-1 md:text-xs print:text-[10px]'>
            {totalDrivingKM.toLocaleString()}km
          </td>

          <td className='whitespace-nowrap border border-black py-2 pl-1 md:text-xs print:text-[10px]'>
            {totalFuelCost.toLocaleString()}
          </td>
          <td className='whitespace-nowrap border border-black py-2 pl-1 md:text-xs print:text-[10px]'>
            {totalToll.toLocaleString()}
          </td>
          <td className='whitespace-nowrap border border-black py-2 pl-1 md:text-xs print:text-[10px]'>
            {totalEtcCost.toLocaleString()}
          </td>
          <td className='whitespace-nowrap border border-black py-2 pl-1 md:text-xs print:text-[10px]'>
            {grandTotal.toLocaleString()}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default DrivePrint;
