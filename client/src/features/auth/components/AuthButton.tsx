interface Props {
  type: 'submit' | 'button';
  disabled: boolean;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
}
export default function AuthButton({
  type,
  disabled = false,
  variant = 'primary',
  onClick,
  children,
}: Props) {
  const baseClasses =
    'flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90 focus:ring-blue-500',
    secondary:
      'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}
