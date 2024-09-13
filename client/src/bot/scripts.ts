import Bot from './Bot'
import kideService from '../services/kide'
import {
  ApiTicketVariant,
  ProductInfo,
  ReservationStatus,
  UserPreferences,
} from '../types'
import config from '../config'

export const startBot = async (bot: Bot): Promise<void> => {
  await bot.waitForSaleStart()
  await bot.getEventData()
  await bot.startReservation()
}

export const initBot = async (
  eventUrl: string,
  authToken: string,
  userPreferences: UserPreferences,
  sendStatusMessage: (message: string) => void
): Promise<Bot | null> => {
  const event: ProductInfo | null = await kideService.getEvent(eventUrl)
  if (!event) {
    sendStatusMessage('Event not found :(')
    return null
  }
  sendStatusMessage(`Event found: ${event.name}`)
  return new Bot(
    eventUrl,
    authToken,
    event.saleStart,
    userPreferences,
    sendStatusMessage
  )
}

export const testAuthToken = async (
  authToken: string,
  setErrorMessage: (message: string) => void
): Promise<ReservationStatus> => {
  const testEventUrl = config.TEST_EVENT_URL
  const event: ProductInfo | null = await kideService.getEvent(testEventUrl)

  if (!event) {
    setErrorMessage('Error fetching test event url')
    return ReservationStatus.EventNotFound
  }

  let testVariant: ApiTicketVariant | null = null
  event.variants.forEach((variant: ApiTicketVariant) => {
    if (variant.availability > 0) {
      testVariant = variant
    }
  })

  if (!testVariant) {
    setErrorMessage('No tickets available for test event')
    return ReservationStatus.NoTicketsAvailable
  }

  const reserveResponse = await kideService.makeReservation(authToken, testVariant, 1)
  if (reserveResponse.status === 400) {
    setErrorMessage('Auth token likely not working')
    return ReservationStatus.InvalidAuthToken
  }

  const cancelResponse = await kideService.cancelReservation(authToken, testVariant)
  if (cancelResponse.status === 400) {
    setErrorMessage('Error canceling reservation')
    return ReservationStatus.CancelFailed
  }

  return ReservationStatus.Success
}
