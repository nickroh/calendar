import { Event } from "../../store/event/event";

export interface monthElement {
    day: number;
    events: Event[]; 
    ISO: string;
}