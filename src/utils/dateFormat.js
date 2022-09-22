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
