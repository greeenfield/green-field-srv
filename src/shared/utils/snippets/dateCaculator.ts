export const addDays = (from: Date, days: number): Date => {
  const date = new Date(from)
  date.setDate(date.getDate() + days)

  return date
}
