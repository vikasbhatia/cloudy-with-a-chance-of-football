const cache = new Map()

export function shouldFetchLiveTemp(isoDate) {
  if (!isoDate) return false
  const [y, m, d] = isoDate.split('-').map(Number)
  const matchDate = new Date(y, m - 1, d)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffDays = (matchDate - today) / (1000 * 60 * 60 * 24)
  return diffDays <= 1
}

export async function fetchLiveTemp(cityKey, isoDate, coords) {
  const key = `${cityKey}|${isoDate}`
  if (cache.has(key)) return cache.get(key)

  const { lat, lon } = coords
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&daily=temperature_2m_max,temperature_2m_min` +
    `&timezone=auto` +
    `&start_date=${isoDate}&end_date=${isoDate}`

  try {
    const res = await fetch(url)
    if (!res.ok) { cache.set(key, null); return null }
    const data = await res.json()
    const tMax = data.daily?.temperature_2m_max?.[0]
    const tMin = data.daily?.temperature_2m_min?.[0]
    const temp = (typeof tMax === 'number' && typeof tMin === 'number')
      ? (tMax + tMin) / 2
      : null
    cache.set(key, temp)
    return temp
  } catch {
    cache.set(key, null)
    return null
  }
}
