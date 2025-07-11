import { useEffect, useState } from 'react';
import { useDateStore } from '../stores/useDateStore';

export default function useDateManager() {
  const currentDate = useDateStore((state) => state.currentDate);
  const setCurrentDate = useDateStore((state) => state.setCurrentDate);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();

    const timeoutId = setTimeout(() => {
      setCurrentDate(new Date());
    }, msUntilMidnight);

    return () => clearTimeout(timeoutId);
  }, [setCurrentDate]);

  return { currentDate, setCurrentDate, isOpen, setIsOpen };
}
