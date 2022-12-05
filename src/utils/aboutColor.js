export const getStatusColor = (type) => {
  if (type === 'pending') return 'warning'
  if (type === 'done') return 'secondary'
  if (type === 'reject') return 'primary'
  if (type === 'accepted') return 'info'
  if (type === 'paid') return 'success'
  return 'default'
}

export const getColorByIndex = (index) => {
  const listColor = [
    '#54BAB9',
    '#F675A8',
    '#F29393',
    '#AAC4FF',
    '#B6E2A1',
    '#E97777',
    '#C1EFFF',
    '#CDF0EA',
    '#FFF89A',
  ]
  return listColor[index]
}
