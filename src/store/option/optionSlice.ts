import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Option, ViewMode, Lang } from './option'
import { CalendarEvent } from '../event/event'

const initialState: Option = {
    viewMode: ViewMode.week,
    lang: Lang.KO,
    selectedDate: new Date().toISOString(),
    darkMode: true,
    expanded: true,
    selectedEvent: null
}


const optionSlice = createSlice({
    name: 'option',
    initialState,
    reducers: {
        setViewMode(state, action: PayloadAction<ViewMode>) {
            state.viewMode = action.payload
        },
        setSelectedDate(state, action: PayloadAction<string>) {
            state.selectedDate = action.payload
        },
        setSelectedLang(state, action: PayloadAction<Lang>) {
            state.lang = action.payload
        },
        setSelectedEvent(state, action: PayloadAction<CalendarEvent>) {
            state.selectedEvent = action.payload
        },
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode
        },
        setDarkMode(state, action: PayloadAction<boolean>) {
            state.darkMode = action.payload
        },
        setExpandedMode(state) {
            state.expanded = !state.expanded
        },
    },
})

export const { setViewMode, setSelectedDate, toggleDarkMode, setDarkMode, setExpandedMode, setSelectedLang, setSelectedEvent } = optionSlice.actions
export default optionSlice.reducer