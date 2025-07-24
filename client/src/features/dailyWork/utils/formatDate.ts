export const dailyWorkDay = (newDate: Date) => {
  const date = new Date(newDate);
  const year = date.getFullYear().toString();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${year}. ${month}. ${day}. (${dayOfWeek})`;
};
