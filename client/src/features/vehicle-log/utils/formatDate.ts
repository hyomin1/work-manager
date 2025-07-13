export const calCarDay = (date: Date) => {
  const carDate = new Date(date);
  const month = carDate.getMonth() + 1;
  const day = carDate.getDate();
  return `${month}/${day}`;
};
