import { UUIDTypes } from "uuid"

export interface TimeBoxProps {
    coord: Coord
    color: string
    id: UUIDTypes
}

export interface Coord {
    left: string,
    top: string,
    width: string,
    height: string,
} 
