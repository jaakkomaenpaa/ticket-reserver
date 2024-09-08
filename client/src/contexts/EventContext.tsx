import { createContext, ReactNode, useState } from 'react'

interface EventContextType {
  eventId: string
  setEventId: (eventId: string) => void
}

const defaultContextValue: EventContextType = {
  eventId: '',
  setEventId: (eventId: string) => {},
}

export const EventContext = createContext<EventContextType>(defaultContextValue)

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [eventId, setEventId] = useState('')

  return (
    <EventContext.Provider value={{ eventId, setEventId }}>
      {children}
    </EventContext.Provider>
  )
}
