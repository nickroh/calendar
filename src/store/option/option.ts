import { Event } from "../event/event";

export interface Option {
    viewMode: ViewMode,
    lang: Lang,
    selectedDate: string, // utc
    darkMode: boolean,
    expanded: boolean,
    selectedEvent: Event
}

export enum ViewMode {
    day,
    week,
    month,
    year
}

export enum Lang {
    EN = 'en',
    KO = 'ko',
    JA = 'ja',
    ZH = 'zh',
    FR = 'fr',
    DE = 'de',
    ES = 'es',
    RU = 'ru',
    AR = 'ar',
    HI = 'hi',
} 