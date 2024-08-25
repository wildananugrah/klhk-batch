const now = new Date();
const formattedDate = now.toLocaleString('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
}).replace(',', '');

const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
export const formattedDateWithMilliseconds = `${formattedDate}.${milliseconds}`;

