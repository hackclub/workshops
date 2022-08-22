export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
}

export function formatTitle(str) {
  return capitalize(str.split('-')[2]) + ' ' + str.split('-')[0]
}
