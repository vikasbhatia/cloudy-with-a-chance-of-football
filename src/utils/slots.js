export function describeSlot(slot) {
  if (/^[123][A-L]$/.test(slot)) {
    const pos   = slot[0]
    const group = slot[1]
    const label = pos === '1' ? 'Group winner' : pos === '2' ? 'Group runner-up' : '3rd place'
    return `${label}, Group ${group}`
  }
  if (/^W\d+$/.test(slot)) return `Winner of match ${slot.slice(1)}`
  if (/^L\d+$/.test(slot)) return `Loser of match ${slot.slice(1)}`
  if (slot.startsWith('3') && slot.includes('/')) {
    const groups = slot.slice(1).split('/')
    return `Best 3rd place from groups ${groups.join(', ')}`
  }
  return ''
}
