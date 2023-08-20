import { CountryType } from '../../types/country.type'
import { flagEmojiToPNG } from '../../utils/utils'
import styles from './CountryItem.module.css'

interface PropTypes {
  country: CountryType
}

function CountryItem(props: PropTypes) {
  const { country } = props

  return (
    <li className={styles.countryItem}>
      <span>{flagEmojiToPNG(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  )
}

export default CountryItem
