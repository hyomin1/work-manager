import { Pencil } from 'lucide-react';
import NavButton from '../../../components/common/NavButton';

interface Props {
  onOpen: () => void;
}

export default function NavigationButtons({ onOpen }: Props) {
  return (
    <div className='mb-4 w-full rounded-xl border border-gray-200 bg-white shadow-sm transition-all'>
      <div className='p-4 sm:p-3'>
        <div className='flex items-center justify-between gap-4 sm:flex-col'>
          <div className='flex items-center gap-3 sm:w-full sm:justify-between'>
            <NavButton
              icon={Pencil}
              label='작성'
              variant='green'
              onClick={onOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
