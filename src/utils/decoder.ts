import type { defaultDecoder } from 'qs'

export const decoder = (
  str: string,
  decoder: defaultDecoder,
  charset: string
) => {
  const strWithoutPlus = str.replace(/\+/g, ' ')
  if (charset === 'iso-8859-1') {
    return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape)
  }
  if (/^(\d+|\d*\.\d+)$/.test(str)) {
    return parseFloat(str)
  }
  const keywords = {
    true: true,
    false: false,
    null: null,
    undefined
  }
  if (str in keywords) {
    return keywords[str as keyof typeof keywords]
  }
  try {
    return decodeURIComponent(strWithoutPlus)
  } catch (e) {
    return strWithoutPlus
  }
}
