export interface Event {
    id: string
    name: string
    date: string // ISO 8601 UTC string, e.g. "2025-05-20T14:00:00Z"
    description?: string
    color: string
    timeRange: number
}

export type CalendarEvent = Event

export interface EventsState {
    events: Event[]
    selectedEvent: Event | null
}