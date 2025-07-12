import type { LucideIcon } from 'lucide-react';

export default function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: LucideIcon;
  title: string;
}) {
  return (
    <div className='mb-4 flex items-center space-x-2'>
      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-500'>
        <Icon className='h-4 w-4' />
      </div>
      <h2 className='text-lg font-semibold text-gray-700'>{title}</h2>
    </div>
  );
}
