import { format } from 'date-fns'

export const dateFormat = (date) => {
  const dateFormated = format(date, 'dd/MM/yyyy')
  return dateFormated
}

export const minuteToHours = (minute) => {
  const hours = Math.floor(minute / 60)
  const minuteLeft = minute - hours * 60
  return {
    hours,
    minutes: minuteLeft,
  }
}

export const convertNumberToHour = (num, option) => {
  const hour = Math.floor(num)
  const minute = (num - hour) * 60
  if (option === 'formatTime')
    return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`
  if (option === 'getTime')
    return {
      hour,
      minute,
    }
}

export const convertTimeToNumber = (time) => {
  const date = new Date(time)
  const hour = date.getHours()
  const minute = date.getMinutes() / 60
  return hour + minute
}

export const formatDateToHour = (time) => {
  const date = new Date(time)
  return format(date, 'kk:mm')
}
