import { useState } from 'react';
import TabHeader from '../../components/TabHeader';
import { IDrivingInform } from '../../interfaces/interface';
import { drivingHeaders } from '../../constants/headers';
import { axiosReq, calCarDay } from '../../api';
import { Edit, X } from 'lucide-react';
import EditDrivingInform from './EditDrivingInform';

interface IDrivePCProps {
  drivingInform: IDrivingInform[];
  indexOfFirstItem: number;
  indexOfLastItem: number;
  totalDrivingKM: number;
  totalFuelCost: number;
  totalToll: number;
  totalEtcCost: number;
  grandTotal: number;
  refetch: () => void;
}

function DrivePC({
  drivingInform,
  indexOfFirstItem,
  indexOfLastItem,
  totalDrivingKM,
  totalFuelCost,
  totalToll,
  grandTotal,
  totalEtcCost,
  refetch,
}: IDrivePCProps) {
  const [editingItemId, setEditingItemId] = useState('');

  const deleteInform = async (id: string) => {
    const isConfirm = window.confirm('삭제하시겠습니까?');
    if (isConfirm) {
      const res = await axiosReq.delete(
        `/api/driving-inform/removeInform/${id}`
      );
      if (res.status === 200) {
        alert(res.data.message);
        refetch();
      }
    }
  };
  const a = 's';
  parseInt(a);
  return (
    <table className="w-[100%] rounded-2xl text-left border border-black">
      <TabHeader headers={drivingHeaders} category="driving" />
      <tbody className="rounded-b-xl text-xs print:text-[9px] ">
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
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50 w-full'
              }`}
            >
              <td className="py-2 pl-1 border border-black whitespace-nowrap">
                {calCarDay(item.driveDay)}
              </td>
              <td className="py-2 pl-1 border border-black whitespace-nowrap ">
                {item.username}
              </td>
              <td className="py-2 pl-1 border border-black whitespace-nowrap">
                {item.drivingDestination}
              </td>

              <td className="py-2 pl-1 border border-black whitespace-nowrap ">
                {item.startKM.toLocaleString()}km
              </td>
              <td className="py-2 pl-1 border border-black whitespace-nowrap ">
                {item.endKM.toLocaleString()}km
              </td>
              <td className="py-2 pl-1 border border-black whitespace-nowrap ">
                {item.totalKM.toLocaleString()}km
              </td>
              <td className="py-2 pl-1 border border-black whitespace-nowrap ">
                {item.fuelCost ? item.fuelCost.toLocaleString() : ''}
              </td>
              <td className="py-2 pl-1 border border-black whitespace-nowrap ">
                {item.toll ? item.toll.toLocaleString() : ''}
              </td>
              <td className="py-2 pl-1 border border-black whitespace-nowrap ">
                {item.etc.cost > 0 &&
                  `${item.etc.cost.toLocaleString()}(${item.etc.name})`}
              </td>
              <td className="border border-black md:py-1 md:pl-1 sm:p-1 print-hidden">
                {item.isOwner && (
                  <div className="flex justify-end">
                    <Edit
                      onClick={() => setEditingItemId(item._id)}
                      className="w-5 h-5 mr-2 hover:opacity-60"
                    />
                    <X
                      onClick={() => deleteInform(item._id)}
                      className="w-5 mr-2 sm:h-5 hover:opacity-60"
                    />
                    {editingItemId === item._id && (
                      <EditDrivingInform
                        item={item}
                        setEditingItemId={setEditingItemId}
                      />
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        <tr>
          <td colSpan={5} />
          <td className="py-2 pl-1 border border-black whitespace-nowrap md:text-xs print:text-[10px]">
            {totalDrivingKM.toLocaleString()}km
          </td>

          <td className="py-2 pl-1 border border-black whitespace-nowrap md:text-xs print:text-[10px]">
            {totalFuelCost.toLocaleString()}
          </td>
          <td className="py-2 pl-1 border border-black whitespace-nowrap md:text-xs print:text-[10px]">
            {totalToll.toLocaleString()}
          </td>
          <td className="py-2 pl-1 border border-black whitespace-nowrap md:text-xs print:text-[10px] ">
            {totalEtcCost.toLocaleString()}
          </td>
          <td className="py-2 pl-1 border border-black whitespace-nowrap md:text-xs print:text-[10px] ">
            {grandTotal.toLocaleString()}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default DrivePC;
