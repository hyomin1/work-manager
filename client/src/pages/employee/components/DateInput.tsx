import useEmployeeStore from '../../../stores/employeeStore';

interface DateInputProps {
  showInput: boolean;
  onClose: () => void;
}

function DateInput({ showInput, onClose }: DateInputProps) {
  const { currentDate, setCurrentDate } = useEmployeeStore();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (newDate) {
      const date = new Date(newDate);
      if (!isNaN(date.getTime())) {
        setCurrentDate(date);
      }
    }
  };

  if (!showInput) return null;

  return (
    <div className="w-[21%] sm:w-[40%] flex justify-center">
      <input
        type="date"
        value={currentDate ? currentDate.toISOString().split('T')[0] : ''}
        className="sm:w-full w-[60%] my-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
        onChange={handleDateChange}
        onBlur={onClose}
      />
    </div>
  );
}

export default DateInput;
