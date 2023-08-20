// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from 'react'
import Button from '../Button'
import BackButton from '../BackButton'
import { useCities, useUrlPosition } from '../../utils/customHooks'
import axios from 'axios'
import { GEOCODING_URL, flagEmojiToPNG } from '../../utils/utils'
import Message from '../Message'
import Spinner from '../Spinner'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './Form.module.css'

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char: string) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

function Form() {
  //  get location from search params
  const [lat, lng] = useUrlPosition()

  // get methods from CitiesContext
  const { addNewCity, isLoading } = useCities()

  const navigate = useNavigate()

  const [cityName, setCityName] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [date, setDate] = useState<Date>(new Date())
  const [notes, setNotes] = useState<string>('')
  const [emoji, setEmoji] = useState<string>('')
  const [isGeocodingLoading, setGeocodingIsLoading] = useState<boolean>(false)
  const [geocodingError, setGeocodingError] = useState<string>('')

  useEffect(() => {
    const fetchCityData = async () => {
      if (!lat && !lng) return
      try {
        setGeocodingIsLoading(true)
        setGeocodingError('')

        const response = await axios.get(`${GEOCODING_URL}?latitude=${lat}&longitude=${lng}`)
        if (!response.data.countryCode)
          throw new Error("That doesn't seem to be a city. Click somewhere else 😉")

        setCityName(response.data.city || response.data.locality || '')
        setCountry(response.data.countryName)
        setEmoji(convertToEmoji(response.data.countryCode))
      } catch (error) {
        setGeocodingError((error as Error).message)
      } finally {
        setGeocodingIsLoading(false)
      }
    }
    fetchCityData()
  }, [lat, lng])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!cityName || !date) return

    const newCity = {
      cityName,
      country,
      emoji,
      date: new Date(date).toISOString(),
      notes,
      position: {
        lat,
        lng
      }
    }

    await addNewCity(newCity)
    navigate('/app/cities')
  }

  if (geocodingError) return <Message message={geocodingError} />

  if (!lat && !lng) return <Message message='Start by clicking somewhere on the map' />
  return (
    <>
      {isGeocodingLoading && <Spinner />}
      {!isGeocodingLoading && (
        <form
          className={`${styles.form} ${isLoading ? styles.loading : ''}`}
          onSubmit={handleSubmit}
        >
          <div className={styles.row}>
            <label htmlFor='cityName'>City name</label>
            <input id='cityName' onChange={(e) => setCityName(e.target.value)} value={cityName} />
            <span className={styles.flag}>{emoji ? flagEmojiToPNG(emoji) : emoji}</span>
          </div>

          <div className={styles.row}>
            <label htmlFor='date'>When did you go to {cityName}?</label>
            <DatePicker
              id='date'
              dateFormat='dd/MM/yyyy'
              selected={date}
              onChange={(date: Date) => setDate(date)}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor='notes'>Notes about your trip to {cityName}</label>
            <textarea id='notes' onChange={(e) => setNotes(e.target.value)} value={notes} />
          </div>

          <div className={styles.buttons}>
            <Button type='primary' onClick={() => {}}>
              Add
            </Button>
            <BackButton />
          </div>
        </form>
      )}
    </>
  )
}

export default Form
