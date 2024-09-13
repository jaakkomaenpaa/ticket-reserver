import axios from 'axios'

import {
  getRequestId,
  processProducts,
  reverseString,
  stripIdFromUrl,
} from '../utils'
import config from '../config'
import {
  ApiProductModel,
  ApiProduct,
  ApiTicketVariant,
  ProductInfo,
  City,
  ApiSearchModel,
} from '../types'

// Get basic event data
const getEvent = async (eventUrl: string): Promise<ProductInfo | null> => {
  try {
    const eventId = stripIdFromUrl(eventUrl)
    const request = await axios.get(`${config.KIDE_PRODUCT_URL}${eventId}`)
    const model: ApiProductModel = request.data.model
    const product: ApiProduct = model.product

    return {
      name: product.name,
      saleStart: new Date(product.dateSalesFrom),
      salesUntil: new Date(product.dateSalesUntil),
      salesStarted: product.salesStarted,
      salesOngoing: product.salesOngoing,
      salesPaused: product.salesPaused,
      maxTotalReservations: product.maxTotalReservationsPerCheckout,
      variants: request.data.model.variants,
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

// Reserve given amount of one ticket type
const makeReservation = async (
  authToken: string,
  variant: ApiTicketVariant,
  quantity: number
): Promise<{ status: number }> => {
  const body = {
    toCreate: [
      {
        inventoryId: variant.inventoryId,
        quantity,
        productVariantUserForm: null,
      },
    ],
    toCancel: [],
    expectCart: true,
  }

  console.log('Request body', body)

  const headers = {
    authorization: `Bearer ${reverseString(authToken)}`,
    [config.HEADER_TOKEN]: getRequestId(variant.inventoryId),
    'Content-Type': 'application/json;charset=UTF-8',
  }

  console.log('headers', headers)

  try {
    const response = await axios.post(config.KIDE_RESERVATION_URL, body, { headers })
    console.log(`Success reserving type ${variant.name}`)
    return response
  } catch (error) {
    console.log(`Fail reserving type ${variant.name}`)
    console.error(error)
    return { status: 400 }
  }
}

const cancelReservation = async (
  authToken: string,
  variant: ApiTicketVariant
): Promise<{ status: number }> => {
  const body = {
    toCreate: [],
    toCancel: [
      {
        inventoryId: variant.inventoryId,
      },
    ],
    expectCart: true,
  }

  const headers = {
    authorization: `Bearer ${reverseString(authToken)}`,
    'Content-Type': 'application/json;charset=UTF-8',
  }
  try {
    const response = await axios.post(config.KIDE_RESERVATION_URL, body, { headers })
    console.log(`Success canceling type ${variant.name}`, response)
    return response
  } catch (error) {
    console.log(`Fail reserving type ${variant.name}`)
    console.error(error)
    return { status: 400 }
  }
}

const getEventsByCity = async (city: City): Promise<ApiProduct[]> => {
  let cityString: string = city
  if (city === City.Any) {
    cityString = ''
  }

  try {
    const request = await axios.get(
      `${config.KIDE_PRODUCT_URL}?city=${cityString}&productType=1`
    )
    return processProducts(request.data.model)
  } catch (error) {
    console.log(error)
    return []
  }
}

const getEventsBySearchText = async (searchText: string): Promise<ApiProduct[]> => {
  try {
    const request = await axios.get(
      `${config.KIDE_SEARCH_URL}?searchText=${searchText}`
    )
    const model: ApiSearchModel = request.data.model
    return processProducts(model.products)
  } catch (error) {
    console.log(error)
    return []
  }
}

const exports = {
  getEvent,
  makeReservation,
  cancelReservation,
  getEventsByCity,
  getEventsBySearchText,
}
export default exports
