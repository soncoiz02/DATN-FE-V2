import dateFormat from './dateFormat'

const calculateDayLeft = (day) => {
  const currentDay = new Date()
  const lastDay = new Date(day)
  const oneDay = 24 * 60 * 60 * 1000

  const dayLeft = (currentDay - lastDay) / oneDay
  console.log(dayLeft)

  if (dayLeft < 1) {
    const currentHour = currentDay.getHours()
    const lastHour = lastDay.getHours()

    const hourLeft = currentHour - lastHour

    if (hourLeft < 1) {
      const currentMinutes = currentDay.getMinutes()
      const lastMinutes = lastDay.getMinutes()

      const minutesLeft = currentMinutes - lastMinutes

      if (minutesLeft < 1) {
        const currentSecond = currentDay.getSeconds()
        const lastSecond = lastDay.getSeconds()

        const secondLeft = currentSecond - lastSecond

        return `${secondLeft} giây trước`
      }

      return `${minutesLeft} phút trước`
    }

    return `${hourLeft} giờ trước`
  }

  if (dayLeft === 1) return `Hôm qua`
  if (dayLeft === 2) return `Hôm kia`

  return dateFormat(lastDay)
}

export default calculateDayLeft
