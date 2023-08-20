import styles from './CityList.module.css'
import Spinner from '../Spinner'
import Message from '../Message'
import CityItem from '../CityItem'
import { useCities } from '../../utils/customHooks'

export default function CityList() {
  const { cities, isLoading, errorMessage } = useCities()

  if (errorMessage) return <Message message={errorMessage} />

  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && !cities.length && (
        <Message message='Add your first city by clicking on a city on the map ' />
      )}

      {!isLoading && cities.length > 0 && (
        <ul className={styles.cityList}>
          {cities.map((city) => (
            <CityItem key={city.id} city={city} />
          ))}
        </ul>
      )}
    </>
  )
}
