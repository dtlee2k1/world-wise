import React, { createContext, useCallback, useEffect, useReducer } from 'react'
import http from '../utils/http'
import { CityType } from '../types/city.type'
import { CitiesContextType } from '../types/CitiesContext.type'

interface PropTypes {
  children: React.ReactNode
}

interface CitiesState {
  cities: CityType[]
  isLoading: boolean
  currentCity: CityType
  errorMessage: string
}

type CitiesAction =
  | { type: 'loading' }
  | { type: 'cities/loaded'; payload: CityType[] }
  | { type: 'city/created'; payload: CityType }
  | { type: 'city/deleted'; payload: string }
  | { type: 'city/loaded'; payload: CityType }
  | { type: 'rejected'; payload: string }

const initialState: CitiesState = {
  cities: [],
  isLoading: false,
  currentCity: {
    cityName: '',
    country: '',
    emoji: '',
    date: '',
    notes: '',
    position: {
      lat: 0,
      lng: 0
    }
  },
  errorMessage: ''
}

const reducer = (state: CitiesState, action: CitiesAction): CitiesState => {
  switch (action.type) {
    case 'loading': {
      return { ...state, isLoading: true }
    }
    case 'cities/loaded': {
      return { ...state, cities: action.payload, isLoading: false }
    }
    case 'city/loaded': {
      return { ...state, currentCity: action.payload, isLoading: false }
    }
    case 'city/created': {
      return { ...state, cities: [...state.cities, action.payload], isLoading: false }
    }
    case 'city/deleted': {
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false
      }
    }

    case 'rejected': {
      return { ...state, errorMessage: action.payload }
    }
    default:
      throw new Error('unknown action')
  }
}

const CitiesContext = createContext<CitiesContextType | null>(null)

function CitiesProvider({ children }: PropTypes) {
  const [{ cities, isLoading, currentCity, errorMessage }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
    const fetchCities = async () => {
      try {
        dispatch({ type: 'loading' })
        dispatch({ type: 'rejected', payload: '' })
        const data = await http.get('cities')
        dispatch({ type: 'cities/loaded', payload: data.data })
      } catch (error) {
        dispatch({ type: 'rejected', payload: 'There was an error loading data...' })
      }
    }
    fetchCities()
  }, [])

  const getCity = useCallback(
    (id: string) => {
      if (Number(id) === currentCity.id) return

      const fetchCity = async () => {
        try {
          dispatch({ type: 'loading' })
          dispatch({ type: 'rejected', payload: '' })
          const data = await http.get(`cities/${id}`)
          dispatch({ type: 'city/loaded', payload: data.data })
        } catch (error) {
          dispatch({ type: 'rejected', payload: 'There was an error loading data...' })
        }
      }
      fetchCity()
    },
    [currentCity.id]
  )

  const addNewCity = async (newCity: CityType) => {
    try {
      dispatch({ type: 'loading' })
      dispatch({ type: 'rejected', payload: '' })
      const data = await http.post('cities', newCity)
      dispatch({ type: 'city/created', payload: data.data })
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'There was an error loading data...' })
    }
  }

  const deleteCity = async (id: string) => {
    try {
      dispatch({ type: 'loading' })
      dispatch({ type: 'rejected', payload: '' })
      await http.delete(`cities/${id}`)
      dispatch({ type: 'city/deleted', payload: id })
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'There was an error loading data...' })
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        errorMessage,
        currentCity,
        getCity,
        addNewCity,
        deleteCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

export { CitiesContext, CitiesProvider }
