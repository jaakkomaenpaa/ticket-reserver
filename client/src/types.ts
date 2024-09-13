export interface Config {
  ACCESS_CODE: string
  ACCESS_KEY: string
  SECRET: string
  HEADER_TOKEN: string
  SERVER_BASE_URL: string
  CURRENT_VERSION: string
  KIDE_PRODUCT_URL: string
  KIDE_RESERVATION_URL: string
  KIDE_SEARCH_URL: string
  TEST_EVENT_URL: string
}

export interface ApiProductModel {
  product: ApiProduct
  variants: ApiTicketVariant[]
}

export interface ApiSearchModel {
  companies: any[] // Company
  products: ApiProduct[]
}

export interface ApiTicketVariant {
  id: string
  inventoryId: string
  name: string
  availability: number
  productVariantMaximumReservableQuantity: number
}

export interface ApiProduct {
  id: string
  dateSalesFrom: string // Date
  dateSalesUntil: string // Date
  salesStarted: boolean
  salesOngoing: boolean
  salesPaused: boolean
  maxTotalReservationsPerCheckout: number
  city: City
  name: string
  dateActualFrom: string // Date
  place: string
}

export interface ProductInfo {
  name: string
  saleStart: Date
  salesUntil: Date
  salesStarted: boolean
  salesOngoing: boolean
  salesPaused: boolean
  maxTotalReservations: number
  variants: ApiTicketVariant[]
}

export interface UserPreferences {
  ticketIndex: number
  keyword: string
}

export enum City {
  Any = 'Everywhere',
  Tampere = 'Tampere',
  Helsinki = 'Helsinki',
  Espoo = 'Espoo',
  Jyväskylä = 'Jyväskylä',
  Lappeenranta = 'Lappeenranta',
  Oulu = 'Oulu',
  Turku = 'Turku',
  Vaasa = 'Vaasa',
  Vantaa = 'Vantaa',
}

export enum Font {
  Arial = 'Arial, Helvetica, sans-serif',
  ComicSans = 'cursive',
  CourierNew = '"Courier New", Courier, monospace',
  GillSans = '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
  LucidaSans = '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva',
  Monospace = 'monospace',
  SegoeUI = '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  TimesNewRoman = '"Times New Roman", Times, serif',
}

export interface FontInfo {
  display: string
  value: string
}


export enum ReservationStatus {
  NoTicketsAvailable = 400,
  InvalidAuthToken = 401,
  CancelFailed = 403,
  EventNotFound = 404,
  Success = 200
}

export enum LocalStorageKey {
  Font = 'font',
  KideAuthToken = 'kideAuthToken',
  Theme = 'theme'
}

export enum Theme {
  Purple = 'Purple',
  Blue = 'Blue',
  Orange = 'Orange',
  Green = 'Green',
}