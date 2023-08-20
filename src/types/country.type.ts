import { CityType } from './city.type'

export type CountryType = Pick<CityType, 'country' | 'emoji'>
