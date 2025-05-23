import { Lang } from "../store/option/option";
import { CalendarDate, Time } from "@internationalized/date";
import { createSelector } from "@reduxjs/toolkit";
import { EventsState, Event } from "../store/event/event";
import { RootState } from "../store/store";
import { HtmlColors } from "./constants";
import { Coord } from "../components/TimeBox/box.types";
import { startOfWeek, addDays, parseISO } from 'date-fns';

export function parseDateOnly(isoString: string) {
    return isoString.split("T")[0]; // "2025-05-21"
}

export function addDaysToISODate(isoString: string, days: number): string {
    const date = new Date(isoString);
    date.setDate(date.getDate() + days);
    return date.toISOString();
}

export function getSystemGMTOffset(): string {
    const offsetMinutes = new Date().getTimezoneOffset(); // UTC - local in minutes
    const offsetHours = -offsetMinutes / 60; // Flip the sign

    const sign = offsetHours >= 0 ? '+' : '-';
    const absHours = Math.abs(offsetHours).toString().padStart(2, '0');

    return `GMT${sign}${absHours}`;
}

export function getWeekDateNumbersFromISOString(isoDateString: string): number[] {
    const date = new Date(isoDateString);
    const day = date.getDay(); // 0=Sun, ..., 6=Sat
    const sunday = new Date(date);
    sunday.setDate(date.getDate() - day); // go back to Sunday

    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(sunday);
        d.setDate(sunday.getDate() + i);
        return d.getDate();
    });
}

export const languageLabels: Record<Lang, string> = {
    [Lang.EN]: 'English',
    [Lang.KO]: '한국어',
    [Lang.JA]: '日本語',
    [Lang.ZH]: '中文',
    [Lang.FR]: 'Français',
    [Lang.DE]: 'Deutsch',
    [Lang.ES]: 'Español',
    [Lang.RU]: 'Русский',
    [Lang.AR]: 'العربية',
    [Lang.HI]: 'हिन्दी',
};

export function toISOStringWithTime(date: string, time: Time): string {
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day, time.hour, time.minute, 0, 0).toISOString();
}

export function getEventBox(dayIndex: number, startHour: number, startMinute: number, durationMinutes: number, small: boolean): Coord {
    const scale = small ? 0.60 : 1;
    const columnSize = 1 / 7.3 * 100 * scale;
    const labelRatio = 3 / 73 * 100;       // ≈ 4.11%
    const columnRatio = 1 / 7.3 * 100;        // ≈ 13.70%
    const rowHeight = 4;             // ≈ 4.16%
    const shift = small ? Math.random() * 0.4 * columnRatio : 0

    return {
        left: `${labelRatio + columnRatio * (dayIndex) + shift}%`,
        top: `${rowHeight * (startHour + (startMinute / 60))}rem`,
        width: `${columnSize}%`,
        height: `${(rowHeight * durationMinutes / 60)}rem`
    };
}


export const filterEvents = (isoString: string) => createSelector(
    (state: RootState) => state.event.events,
    (events: Event[]) => {
        const date = new Date(isoString);
        const day = date.getDay();
        const sunday = new Date(date);
        sunday.setHours(0, 0, 0, 0);
        sunday.setDate(date.getDate() - day);

        const saturday = new Date(sunday);
        saturday.setDate(saturday.getDate() + 6);
        saturday.setHours(23, 59, 59, 999);

        return events.filter(event => {
            const eventDate = new Date(event.date); 
            return eventDate >= sunday && eventDate <= saturday;
        });
    }
);

export const filterEventsperMonth = (start: string, end:string) => createSelector(
    (state: RootState) => state.event.events,
    (events: Event[]) => {
        const begin = parseISO(start).getDay()
        const last = parseISO(end).getDay()

        return events.filter(event => {
            const eventDate = parseISO(event.date).getDay();

            return eventDate >= begin && eventDate <= last;
        });
    }
);

export function randomColor(): string {
    const values = Object.values(HtmlColors);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
}

export function calendarDateToDate(calDate: CalendarDate): Date {
    return new Date(calDate.year, calDate.month - 1, calDate.day);
}


export function calendarDateToLocalDate(val: CalendarDate): Date {
    return new Date(val.year, val.month - 1, val.day, 0, 0, 0, 0);
}

export function getCalendarDates(isoString: string) {
    const firstOfMonth = parseISO(isoString);
    const start = startOfWeek(new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), 1), {
      weekStartsOn: 0, // Sunday
    });
  
    const flatDates = Array.from({ length: 35 }, (_, i) => addDays(start, i).toISOString());

    const calendarMatrix = [];
    for (let i = 0; i < 5; i++) {
      calendarMatrix.push(flatDates.slice(i * 7, i * 7 + 7));
    }
  
    return calendarMatrix;
}