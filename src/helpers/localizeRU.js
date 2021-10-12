const colorsRU = require('@/data/languages/ru.json')
const colorsEN = require('@/data/languages/en.json')

export default function localize (value, lang) {
  const colorValue = value.trim().toUpperCase()

  const colorNames = lang === 'ru' ? colorsRU : colorsEN
  for (const key in colorNames) {
    if (key === colorValue) return colorNames[key]
  }
}
