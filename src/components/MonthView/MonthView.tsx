import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { WEEKDAYS } from "../../utils/constants";
import { filterEventsperMonth, getCalendarDates } from "../../utils/util";
import { monthElement } from "./monthview.types";
import { useEffect, useMemo, useState } from "react";
import { getDate, parseISO } from "date-fns";
import DetailsModal from "../Modal/DetailsModal";
import { useDisclosure } from "@heroui/modal";
import { UUIDTypes } from "uuid";
import { setSelectedEvent } from "../../store/option/optionSlice";


const MonthView = () => {

	const darkmode = useSelector((state: RootState) => state.option.darkMode);
	const expanded = useSelector((state: RootState) => state.option.expanded);
	const lang = useSelector((state: RootState) => state.option.lang);
	const date = useSelector((state: RootState) => state.option.selectedDate);
	const evtStatus = useSelector((state: RootState) => state.event.events);
	const dispatch = useDispatch<AppDispatch>();

	const themeCode = darkmode ? "#161616" : "#f9f9f7"
	const fontColor = darkmode ? "#DCDCDC" : "#161616"
	const detailColor = darkmode ? "#FF7F50" : "#161616"
	const [matrix, setMatrix] = useState<monthElement[][]>([]);
	const days = useMemo(() => getCalendarDates(date), [date]);
	const events = useSelector(filterEventsperMonth(days[0][0], days[4][6]))

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	useEffect(() => {
		if (!days.length || !days[0].length) return;

		const newMatrix: monthElement[][] = days.map(row =>
			row.map((isoDate: string) => {
				const filteredEvents = events.filter(event => {
					return event.date.slice(0, 10) === isoDate.slice(0, 10);
				});

				return {
					day: getDate(parseISO(isoDate)),
					ISO: isoDate,
					events: filteredEvents,
				};
			})
		);

		setMatrix(newMatrix);
		console.log(matrix)
	}, [date]);

	useEffect(() => {
		if (!matrix.length || !matrix[0].length) return;

		const newMatrix = matrix.map(row =>
			row.map(cell => {
				const filteredEvents = events.filter(event =>
					event.date.slice(0, 10) === cell.ISO.slice(0, 10)
				);
				return {
					...cell,
					events: filteredEvents,
				};
			})
		);

		setMatrix(newMatrix);
	}, [evtStatus]);

	const toggleModal = (id: UUIDTypes) => {
		console.log(id)
		const target = events.find(event => event.id === id);
		if (target) {
			dispatch(setSelectedEvent(target));
		}
		onOpen()
	}

	return (
		<div
			style={{
				backgroundColor: themeCode,
				color: fontColor,
				height: '80%',
				scrollbarWidth: 'none',
				msOverflowStyle: 'none',
			}}
			className="rounded-xl p-4 shadow-md overflow-scroll"
		>
			<div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
				{WEEKDAYS[lang].map((day, idx) => (
					<div key={idx} className="flex flex-col justify-center items-center h-14 text-xs relative">
						<div>{day}</div>
					</div>
				))}
			</div>
			<div className="my-0 border-t border-gray-600" />
			<div
				className="grid grid-rows-5 gap-0"
				style={{ width: '100%', height: '90%' }}
			>
				{[...Array(5)].map((hour, i) => (
					<div
						key={i}
						className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr]"
					>
						{Array.from({ length: 7 }).map((_, j) => (
							<div key={j}
								className="border border-b border-gray-600 p-2 overflow-scroll"
								style={{
									scrollbarWidth: 'none',
									msOverflowStyle: 'none',
								}}>
								{matrix[i]?.[j]?.day ?? 0}
								{matrix[i]?.[j]?.events?.map((event, idx) => (
									<div onClick={() => (toggleModal(event.id))} key={idx} className="text-sm text-blue-400" style={{color: detailColor}}>
										{event.name}
									</div>
								))}
							</div>
						))}
					</div>
				))}
				<DetailsModal isOpen={isOpen} onOpenChange={onOpenChange} />
			</div>
		</div>
	)
}

export default MonthView