import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Event, EventsState } from './event'
import { UUIDTypes } from 'uuid'

const initialState: EventsState = {
  events: [],
  selectedEvent: null,
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<Event>) {
      state.events.push(action.payload)

      state.events.sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        if (dateA !== dateB) return dateB - dateA
        return a.timeRange - b.timeRange
      })
    },
    removeEvent(state, action: PayloadAction<string | UUIDTypes>) {
      state.events = state.events.filter(event => event.id !== action.payload)
    },
    updateEvent(state, action: PayloadAction<Event>) {
      const index = state.events.findIndex(event => event.id === action.payload.id)
      if (index !== -1) {
        state.events[index] = action.payload
        state.events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      }
    },
    selectEvent(state, action: PayloadAction<string | null>) {
      if (action.payload === null) {
        state.selectedEvent = null
      } else {
        state.selectedEvent = state.events.find(event => event.id === action.payload) || null
      }
    },
    clearEvents(state) {
      state.events = []
      state.selectedEvent = null
    },
  },
})

export const { addEvent, removeEvent, updateEvent, selectEvent, clearEvents } = eventsSlice.actions
export default eventsSlice.reducer
