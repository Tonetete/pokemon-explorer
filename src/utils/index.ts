export const capitalize = (word: string) => {
  if (!word) return word
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export const replaceHyphenWithSpace = (text: string): string => {
  return text.replace(/-/g, ' ')
}
