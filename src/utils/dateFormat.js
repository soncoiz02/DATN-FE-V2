import { format } from 'date-fns'

export const dateFormat = (date) => {
  const dateFormated = format(date, 'dd/MM/yyyy')
  return dateFormated
}

export const minuteToHours = (minute) => {
  if (minute > 60) {
    const hours = Math.floor(minute / 60)
    const minuteLeft = minute - hours * 60
    return {
      hours,
      minutes: minuteLeft,
    }
  }

  return {
    hours: minute / 60,
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
