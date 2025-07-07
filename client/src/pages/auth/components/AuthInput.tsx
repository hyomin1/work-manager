type Props = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  register: () => void;
  error?: string;
  autoFocus?: boolean;
};

export default function FormInput({
  id,
  label,
  type,
  placeholder,
  icon,
  register,
  error,
  autoFocus = false,
}: Props) {
  return (
    <div className='mb-6'>
      <label
        className='mb-2 block text-sm font-medium text-gray-700'
        htmlFor={id}
      >
        {label}
      </label>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          {icon}
        </div>
        <input
          id={id}
          type={type}
          {...register}
          className='w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
      </div>
      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  );
}
