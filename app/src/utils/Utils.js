const toCamelCase = (value) => {
  const ucc = toUpperCamelCase(value)
  return ucc[0].toLowerCase() + ucc.substring(1)
}

const upperCaseFirstLetter = (value) => {
  return value.split('-')
    .map(word => word.toLowerCase())
    .map(word => word[0].toUpperCase() + word.substring(1))
    .join(' ')
}

const toUpperCamelCase = (value) => {
  console.log(value.split('-'))
  return value.split('-')
    .map(word => word.toLowerCase())
    .map(word => word[0].toUpperCase() + word.substring(1))
    .join('')
}

const toKebabCase = (value) => {
  return value.split('')
    .reduce((prev, curr, idx) => {
      if (curr === ' ') {
        return prev + '-'
      }
      if (curr === curr.toUpperCase()) {
        prev[idx]
        if (idx === 0 || prev[idx - 1] === '-') {
          return prev + curr.toLowerCase()
        }
        return prev + '-' + curr.toLowerCase()
      }
      return prev + curr
    }, '')
}

export default {
  toCamelCase,
  toUpperCamelCase,
  toKebabCase,
  upperCaseFirstLetter
}
