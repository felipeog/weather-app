const normalizeString = (string: string) => {
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/'/g, '')
    .replace(/-/g, ' ')
    .toLowerCase()
}

export default normalizeString
