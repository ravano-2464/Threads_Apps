export default function useTimes(props: any) {
  const timeNow = new Date()
  const timePos = new Date(props)
  const second = 1000 
  
  const distance = Number(timeNow) - Number(timePos)
  const month = Math.floor(distance / (30 * 24 * 60 * 60  * second))
  const day = Math.floor(distance / (24 * 60 * 60 * second))
  const hour = Math.floor(distance / (60 * 60 * second))

  const realYear = timePos.getFullYear() % 100
  const realMonth = timePos.getMonth() // 0 sd 11
  const realDate = timePos.getDate()
  const realNameMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  if(month > 0) return `${realDate} ${realNameMonth[realMonth]} ${realYear}`
  if(day > 0) return `${day}d`
  if(hour > 0) return `${hour}h`
  
  return "Just now";
}
