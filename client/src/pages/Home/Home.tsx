import styles from './Home.module.css'
import kideService from '../../services/kide'
import { ApiProduct, City } from '../../types'
import { ChangeEvent, useState } from 'react'
import EventItem from './EventItem'
import Loader from '../../components/Loader'
import { IoSearch } from 'react-icons/io5'
import Card from '../../components/Card'

const Home = () => {
  const [city, setCity] = useState<City>()
  const [searchInput, setSearchInput] = useState<string>('')
  const [events, setEvents] = useState<ApiProduct[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleCityChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true)
    const selectedCity = event.target.value as City
    setCity(selectedCity)

    const products = await kideService.getEventsByCity(selectedCity)
    setEvents(products)
    setIsLoading(false)
  }

  const handleSearchInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value)
  }

  const search = async () => {
    if (searchInput.length < 3) {
      return
    }
    setIsLoading(true)
    setSearchInput('')
    const products = await kideService.getEventsBySearchText(searchInput)
    setEvents(products)
    setIsLoading(false)
  }

  return (
    <div className={styles.container}>
      <p className={styles.header}>Find events</p>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          placeholder='Search'
          value={searchInput}
          onChange={e => handleSearchInputChange(e)}
        />
        <button className={styles.searchButton} onClick={search}>
          <IoSearch className={styles.searchIcon} />
        </button>
        <select
          name='city'
          className={styles.citySelect}
          value={city}
          onChange={e => handleCityChange(e)}
        >
          <option value='' disabled selected>
            Select a city
          </option>
          {Object.values(City).map((city: City) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.eventListContainer}>
          {events.length > 0 &&
            events.map((event: ApiProduct) => (
              <Card customStyles={{ padding: '0px' }}>
                <EventItem key={event.id} event={event} />
              </Card>
            ))}
          {events.length === 0 && <div>No results</div>}
        </div>
      )}
    </div>
  )
}

export default Home
