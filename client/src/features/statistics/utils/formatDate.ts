export const extractMonthAndDay = (date: Date) => {
  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate();
  return { month, day };
};
export const calStatDay = (date: Date) => {
  const localDate = new Date(date);
  const month = localDate.getMonth() + 1;
  const day = localDate.getDate();
  return `${month}/${day}`;
};
