const item = (time) => {
  return String(time).padStart(2, '0')
}
function timeFormat(date1) {
  const date = new Date(date1)
  console.log(date)
  const hoursAndMinutes = item(date.getHours()) + ':' + item(date.getMinutes())
  return hoursAndMinutes
}
export default timeFormat
