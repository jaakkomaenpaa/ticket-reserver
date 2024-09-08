import { Config } from './types'

const ACCESS_CODE = process.env.REACT_APP_ACCESS_CODE || ''
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY || ''
const SECRET = process.env.REACT_APP_SECRET_STRING || ''
const HEADER_TOKEN = process.env.REACT_APP_HEADER_TOKEN || ''
const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASEURL || ''
const CURRENT_VERSION = '1.0.0'

const KIDE_PRODUCT_URL = 'https://api.kide.app/api/products/'
const KIDE_RESERVATION_URL = 'https://api.kide.app/api/reservations'
const KIDE_SEARCH_URL = 'https://api.kide.app/api/search'
const TEST_EVENT_URL = process.env.REACT_APP_TEST_EVENT_URL || ''

const exports: Config = {
  ACCESS_CODE,
  ACCESS_KEY,
  SECRET,
  HEADER_TOKEN,
  SERVER_BASE_URL,
  CURRENT_VERSION,
  KIDE_PRODUCT_URL,
  KIDE_RESERVATION_URL,
  KIDE_SEARCH_URL,
  TEST_EVENT_URL,
}

export default exports
