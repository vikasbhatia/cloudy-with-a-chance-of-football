export function tempToColor(tempC) {
  const minT = 15
  const maxT = 40
  const t = (Math.max(minT, Math.min(maxT, tempC)) - minT) / (maxT - minT)
  const cold = { r: 56,  g: 189, b: 248 }
  const hot  = { r: 185, g: 28,  b: 28  }
  const r = Math.round(cold.r + (hot.r - cold.r) * t)
  const g = Math.round(cold.g + (hot.g - cold.g) * t)
  const b = Math.round(cold.b + (hot.b - cold.b) * t)
  return `rgb(${r},${g},${b})`
}

export function toISODate(dateString) {
  const d = new Date(dateString)
  if (Number.isNaN(d.getTime())) return null
  const year  = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day   = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function isPastDate(isoDate) {
  if (!isoDate) return false
  const [y, m, d] = isoDate.split('-').map(Number)
  const matchDate = new Date(y, m - 1, d)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return matchDate < today
}
