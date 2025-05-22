import { configureStore } from '@reduxjs/toolkit'
import eventsReducer from './event/eventsSlice'
import optionReducer from './option/optionSlice'
import logger from '../middleware/logger'

export const store = configureStore({
    reducer: {
      event: eventsReducer,
      option: optionReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logger),
  })
  
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch