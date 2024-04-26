export default function formatTimeTo24Hours(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();
  const day =
    date.getDate() === today.getDate() ? 'today' : date.getDate();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const month = date.getMonth() + 1;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const paddedDay = String(day).padStart(2, '0');
  const paddedMonth = String(month).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');
  let formattedTime: string;
  if (date.getDate() === today.getDate()) {
    formattedTime = `today ${hours}:${paddedMinutes}`;
  } else if (date.getDate() === yesterday.getDate()) {
    formattedTime = `yesterday ${hours}:${paddedMinutes}`;
  } else {
    formattedTime = `${paddedDay}/${paddedMonth} ${hours}:${paddedMinutes}`;
  }
  return formattedTime;
}
