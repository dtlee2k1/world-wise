import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import styles from './Map.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCities, useGeolocation, useUrlPosition } from '../../utils/customHooks'
import Button from '../Button'
import { flagEmojiToPNG } from '../../utils/utils'

type PositionType = [lat: number, lng: number]
const initialPosition: PositionType = [21, 106]

export default function Map() {
  const { cities } = useCities()
  const [mapPosition, setMapPosition] = useState<PositionType>(initialPosition)

  // get location from search params
  const [mapLat, mapLng] = useUrlPosition()

  // get user location
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition
  } = useGeolocation()

  // Sync View on map with the change of position
  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng])

  // Sync View on map with the change of user location
  useEffect(() => {
    if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
  }, [geolocationPosition])

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type='position' onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}
      <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city) => (
          <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
            <Popup autoClose={true}>
              <span>{flagEmojiToPNG(city.emoji)}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

interface ChangeCenterProps {
  position: PositionType
}

function ChangeCenter({ position }: ChangeCenterProps) {
  const map = useMap()
  map.closePopup()
  map.setView(position)
  return null
}

function DetectClick() {
  const navigate = useNavigate()
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      navigate(`form?lat=${lat}&lng=${lng}`)
    }
  })
  return null
}
