export const flagEmojiToPNG = (flag: string): JSX.Element => {
  const countryCode = Array.from(flag, (codeUnit: string) => codeUnit.codePointAt(0)!)
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join('')

  return <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />
}

export const GEOCODING_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'
