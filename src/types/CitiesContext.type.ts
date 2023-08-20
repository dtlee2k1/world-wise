import { CityType } from './city.type'

export interface CitiesContextType {
  cities: CityType[]
  isLoading: boolean
  errorMessage: string
  currentCity: CityType
  getCity: (id: string) => void
  addNewCity: (city: CityType) => void
  deleteCity: (id: string) => Promise<void>
}
