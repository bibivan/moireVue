const converter = require('@/data/languages/alpabet.json')

export default function translit (word) {
  word = word.toLowerCase()

  let answer = ''
  for (var i = 0; i < word.length; ++i) {
    if (converter[word[i]] === undefined) {
      answer += word[i]
    } else {
      answer += converter[word[i]]
    }
  }

  answer = answer.replace(/[^-0-9a-z]/g, '')
  answer = answer.replace(/[-]+/g, '')
  answer = answer.replace(/^-|-$/g, '')
  return answer
}
