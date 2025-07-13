import { useEffect, useState } from 'react';

export default function useDateManager() {
  const [currentDate, setCurrentDate] = useState(new Date());
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

  return {
    currentDate,
    setCurrentDate,
    isOpen,
    setIsOpen,
  };
}
