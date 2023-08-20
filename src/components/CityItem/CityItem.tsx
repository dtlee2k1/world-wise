import styles from './CityItem.module.css'
import { CityType } from '../../types/city.type'
import { flagEmojiToPNG } from '../../utils/utils'
import { Link } from 'react-router-dom'
import { useCities } from '../../utils/customHooks'

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date))
}

interface PropTypes {
  city: CityType
}

export default function CityItem(props: PropTypes) {
  const { cityName, date, emoji, position, id } = props.city

  const { currentCity, deleteCity } = useCities()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    deleteCity(id as string)
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${currentCity.id === id ? styles['cityItem--active'] : ''}`}
      >
        <span className={styles.emoji}>{flagEmojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  )
}
