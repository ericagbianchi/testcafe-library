/* eslint-disable no-undef */
/* eslint-disable radix */
function getCurrentDateTime() {
  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  return `${date} ${time}`;
}

function convertDate(date) {
  return date.split("-").reverse().join("-");
}

function convertTimeToDecimal(value) {
  time = value.split(":");

  hours = parseInt(time[0]);
  minutes = parseInt(time[1]);
  seconds = parseInt(time[2]);

  return hours + minutes / 60 + seconds / 3600;
}

function convertTimeToMillisec(value) {
  return value * 3600000;
}

function convertDaysToTimestampDate(value) {
  // Days since 1970 used by Kafka - Operating Times
  return value * 3600 * 24;
}

function getRequestedDate(
  days = 0,
  months = 0,
  operationDay = 0,
  operationMonth = 0
) {
  const today = new Date();
  if (operationDay === "-") {
    today.setDate(today.getDate() - days);
  } else today.setDate(today.getDate() + days);

  if (operationMonth === "-") {
    today.setMonth(today.getMonth() + 1 - months);
  } else today.setMonth(today.getMonth() + 1 + months);

  let dd = today.getDate();
  let mm = today.getMonth();
  const y = today.getFullYear();

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;

  return `${y}-${mm}-${dd}`;
}

module.exports = {
  getCurrentDateTime,
  convertDate,
  convertTimeToDecimal,
  convertTimeToMillisec,
  convertDaysToTimestampDate,
  getRequestedDate,
};
