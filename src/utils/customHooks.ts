import { useContext, useState } from 'react'
import { CitiesContextType } from '../types/CitiesContext.type'
import { CitiesContext } from '../contexts/CitiesContext'
import { PositionType } from '../types/position.type'
import { useSearchParams } from 'react-router-dom'
import { AuthContext } from '../contexts/FakeAuthContext'
import { AuthContextType } from '../types/FakeAuthContext.type'

export function useCities() {
  const context = useContext(CitiesContext) as CitiesContextType
  if (context === undefined || context === null)
    throw new Error('CitiesContext was used outside of the CitiesProvider')
  return context
}

export function useAuth() {
  const context = useContext(AuthContext) as AuthContextType
  if (context === undefined || context === null)
    throw new Error('AuthContext was used outside of the AuthProvider')
  return context
}

export function useGeolocation(defaultState = null) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [position, setPosition] = useState<PositionType | null>(defaultState)
  const [error, setError] = useState<null | string>(null)

  function getPosition() {
    if (!navigator.geolocation) return setError('Your browser does not support geolocation')

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
        setIsLoading(false)
      },
      (error) => {
        setError(error.message)
        setIsLoading(false)
      }
    )
  }

  return { isLoading, position, error, getPosition }
}

export function useUrlPosition() {
  const [searchParams] = useSearchParams()
  const lat = Number(searchParams.get('lat'))
  const lng = Number(searchParams.get('lng'))

  return [lat, lng]
}
