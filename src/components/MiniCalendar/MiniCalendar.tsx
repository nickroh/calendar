import { Calendar } from "@heroui/react";
import { CalendarDate, parseDate } from "@internationalized/date";
import type { RootState, AppDispatch } from "../../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "../../store/option/optionSlice.ts";
import { calendarDateToLocalDate, parseDateOnly } from "../../utils/util.ts";

export default function MiniCalendar() {
	const date = useSelector((state: RootState) => state.option.selectedDate);
	const darkmode = useSelector((state: RootState) => state.option.darkMode);
	const dispatch = useDispatch<AppDispatch>();

	return (
		<div>
			<Calendar
				className={darkmode ? 'dark' : 'light'}
				color="danger" calendarWidth={250}
				aria-label="Date (Uncontrolled)"

				value={parseDate(parseDateOnly(date))}
				onChange={(val) => {
					// val: CalendarDate
					const localDate = calendarDateToLocalDate(val);
					dispatch(setSelectedDate(localDate.toISOString()));
				}}
			/>
		</div>

	);
}
