import { format } from 'date-fns'

const dateFormat = (date) => {
  const dateFormated = format(date, 'dd/MM/yyyy')
  return dateFormated
}

export default dateFormat
