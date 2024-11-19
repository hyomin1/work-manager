interface DateInputProps {
  isDatePickerOpen: boolean;
  onClose: () => void;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

function DateInput({
  isDatePickerOpen,
  onClose,
  currentDate,
  setCurrentDate,
}: DateInputProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (newDate) {
      const date = new Date(newDate);
      if (!isNaN(date.getTime())) {
        setCurrentDate(date);
      }
    }
  };

  if (!isDatePickerOpen) return null;

  return (
    <div className="flex w-[21%] justify-center sm:w-[40%]">
      <input
        type="date"
        value={currentDate ? currentDate.toISOString().split("T")[0] : ""}
        className="my-4 w-[60%] rounded-lg border border-gray-300 p-2 shadow-sm transition duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-full"
        onChange={handleDateChange}
        onBlur={onClose}
      />
    </div>
  );
}

export default DateInput;
