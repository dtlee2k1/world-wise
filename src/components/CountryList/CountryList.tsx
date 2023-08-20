import styles from './CountryList.module.css'
import { CityType } from '../../types/city.type'
import Spinner from '../Spinner'
import Message from '../Message'
import CountryItem from '../CountryItem/CountryItem'
import { CountryType } from '../../types/country.type'
import { useCities } from '../../utils/customHooks'

export default function CountryList() {
  const { cities, isLoading, errorMessage } = useCities()
  // C1:filter all unique countries
  const countries: CountryType[] = cities.reduce(
    (arr: CountryType[], city: CityType): CountryType[] => {
      if (!arr.map((el: CountryType) => el.country).includes(city.country))
        return [...arr, { country: city.country, emoji: city.emoji }]
      else return arr
    },
    []
  )

  // C2:
  // const countriesUnique: string[] = []
  // const countries = cities.filter(
  //   (city) => !countriesUnique.includes(city.country) && countriesUnique.push(city.country)
  // )

  if (errorMessage) return <Message message={errorMessage} />
  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && !cities.length && (
        <Message message='Add your first city by clicking on a city on the map ' />
      )}

      {!isLoading && cities.length > 0 && (
        <ul className={styles.countryList}>
          {countries.map((country) => (
            <CountryItem country={country} key={country.country} />
          ))}
        </ul>
      )}
    </>
  )
}
