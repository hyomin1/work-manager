type Props = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (check: boolean) => void;
};
export default function AuthCheckBox({ id, label, checked, onChange }: Props) {
  return (
    <div className="mb-6 flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
        {label}
      </label>
    </div>
  );
}
