import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { Event } from "../../store/event/event";
import { addEvent } from "../../store/event/eventsSlice";
import { randomColor } from "../../utils/util";

const createEvent = (
	dispatch: AppDispatch,
	name: string,
	date: string,
	description: string,
	timeRange: number,
) => {
	const newEvent: Event = {
		id: uuidv4(),
		name: name,
		date: date,
		description: description,
		timeRange: timeRange,
		color: randomColor()
	}
	console.log("===============",date)

	dispatch(addEvent(newEvent))
}

export default createEvent