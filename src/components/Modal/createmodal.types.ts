import { Event } from "../../store/event/event";

export interface CreateModalProps {
    isOpen: boolean;
    onOpenChange?: () => void;
}

export interface DetailsModalProps {
    isOpen: boolean;
    onOpenChange?: () => void;
}