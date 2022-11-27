export const getStatusColor = (type) => {
  if (type === 'pending') return 'warning'
  if (type === 'done') return 'secondary'
  if (type === 'reject') return 'primary'
  if (type === 'accepted') return 'info'
  if (type === 'paid') return 'success'
  return 'default'
}
