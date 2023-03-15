export const checkWord = (word, lang) => {

  const isLetter = (l) => {
    return l.toLowerCase() != l.toUpperCase()
  }

  const isSubset = (a1, a2) => {
    return a2.every((element) => {
      return a1.includes(element)
    })
  }

  const letters = word.split('')
  const arabicAlphabet = ['ء', 'أ', 'اً', 'إ', 'ا', 'ب', 'ت', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'ك', 'ل', 'م', 'ن', 'و', 'ة', 'ه', 'ی', 'ي', 'ئ', ' ']

  if (lang == 'ar-sa') return isSubset(arabicAlphabet, letters)

  else {
    if (letters.length < 2) return false
    let errors = 0
    letters.forEach(letter => {
      if (!isLetter(letter) && letter !== ' ') errors++
    })
    return errors === 0
  }
}

export const fetcher = url => fetch(url).then(r => r.json())