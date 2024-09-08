import { sleep } from '../utils'
import kideService from '../services/kide'
import { ApiTicketVariant, ProductInfo, UserPreferences } from '../types'

class Bot {
  constructor(
    private eventId: string,
    private authToken: string, // Bearer token
    public saleStartTime: Date,
    private userPreferences: UserPreferences, // Ticket index and keyword
    private sendStatusMessage: (message: string) => void,
    private eventData: ProductInfo | null = null, // Will store data of event after sales start
    private maxTotalReservations: number = 200,
    private reservedAmount: number = 0,
    private variantIdsUsed: string[] = []
  ) {}

  //############### PUBLIC #####################

  async waitForSaleStart(): Promise<void> {
    if (this.saleStartTime > new Date()) {
      this.sendStatusMessage('Waiting until the sale starts')
      await sleep(this.saleStartTime.getTime() - new Date().getTime())
    }
  }

  async getEventData(): Promise<void> {
    this.sendStatusMessage('Fetching event data...')
    // Wait until sales open, then store data
    while (true) {
      const event: ProductInfo | null = await kideService.getEvent(this.eventId)
      if (
        event &&
        event.salesStarted &&
        event.salesOngoing &&
        !event.salesPaused &&
        event.variants.length > 0
      ) {
        this.eventData = event
        return
      }
    }
  }

  async startReservation(): Promise<void> {
    if (!this.eventData) {
      this.sendStatusMessage('Something went wrong with event data')
      return
    }

    this.maxTotalReservations = this.eventData.maxTotalReservations || 200
    const variants: ApiTicketVariant[] = this.eventData.variants
    const { ticketIndex, keyword } = this.userPreferences

    this.sendStatusMessage('Starting the reservation...')

    // Reserve based on keyword
    if (keyword.length >= 3) {
      variants.forEach(variant => {
        if (
          variant.name.toLowerCase().includes(keyword.toLowerCase()) &&
          variant.availability > 0 &&
          this.reservedAmount < this.maxTotalReservations
        ) {
          this.getVariant(variant)
          this.variantIdsUsed.push(variant.id)
        }
      })
    }

    // Reserve based on ticket index
    if (ticketIndex >= 1 && variants.length >= ticketIndex) {
      const wantedVariant = variants[ticketIndex - 1]
      if (
        wantedVariant.availability > 0 &&
        this.reservedAmount < this.maxTotalReservations &&
        !this.variantIdsUsed.includes(wantedVariant.id)
      ) {
        this.getVariant(wantedVariant)
        this.variantIdsUsed.push(wantedVariant.id)
      }
    }

    // Reserve as many other variants as possible
    variants.forEach(variant => {
      if (
        !this.variantIdsUsed.includes(variant.id) &&
        variant.availability > 0 &&
        this.reservedAmount < this.maxTotalReservations
      ) {
        this.getVariant(variant)
      }
    })
  }

  //############### PRIVATE #####################

  async getVariant(variant: ApiTicketVariant): Promise<void> {
    const variantQuantity = Math.min(
      variant.productVariantMaximumReservableQuantity,
      variant.availability,
      this.maxTotalReservations - this.reservedAmount,
      10
    )

    this.reservedAmount += variantQuantity

    const response = await kideService.makeReservation(
      this.authToken,
      variant,
      variantQuantity
    )
    const status = response.status !== 400 ? 'Success' : 'Fail'
    this.sendStatusMessage(`${status} reserving type ${variant.name}`)
  }
}

export default Bot
