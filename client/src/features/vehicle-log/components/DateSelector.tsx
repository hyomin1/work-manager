interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}
export default function DateSelector({ onChange, onBlur }: Props) {
  return (
    <div className='flex w-full justify-center hover:opacity-60'>
      <input
        type='month'
        onChange={onChange}
        onBlur={onBlur}
        className='my-4 w-[33%] rounded-lg border border-gray-300 p-2 shadow-sm transition duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-[70%]'
      />
    </div>
  );
}
