export const calCarDay = (date: Date) => {
  const carDate = new Date(date);
  const month = carDate.getMonth() + 1;
  const day = carDate.getDate();
  return `${month}/${day}`;
};
export const serviceDay = (newDate: Date | null) => {
  if (newDate === null) return;
  const date = new Date(newDate);
  const year = date.getFullYear().toString().slice(-2);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${month}.${day}`;
};

export const calYearMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return `${year}년 ${month}월`;
};
