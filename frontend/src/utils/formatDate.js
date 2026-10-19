export function formatDate(fecha) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return fecha
  const [year, month, day] = fecha.split('-')
  return `${day}/${month}/${year}`
}
