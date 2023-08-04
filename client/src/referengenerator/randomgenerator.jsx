export const generateReference = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, "0");

  return `FT-${year}${month}${day}${hours}${minutes}${seconds}-${randomDigits}`;
};


export const depositeReference = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  const randomDigits = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  return `CD-${year}${month}${day}${hours}${minutes}${seconds}-${randomDigits}`;
};