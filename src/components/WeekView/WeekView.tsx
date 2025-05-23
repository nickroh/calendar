
import type { RootState, AppDispatch } from "../../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate, setSelectedEvent } from "../../store/option/optionSlice.ts";
import { getEventBox, getSystemGMTOffset, getWeekDateNumbersFromISOString } from "../../utils/util.ts";
import { WEEKDAYS, HOURS } from "../../utils/constants.ts";
import { useEffect, useState } from "react";
import { filterEvents } from "../../utils/util.ts";
import { TimeBoxProps } from "../TimeBox/box.types.ts";
import TimeBox from "../TimeBox/TimeBox.tsx";
import { Event } from "../../store/event/event.ts";
import DetailsModal from "../Modal/DetailsModal.tsx";
import { useDisclosure } from "@heroui/modal";
import { UUIDTypes } from "uuid";
import { div } from "framer-motion/client";

const WeekView = () => {

	const darkmode = useSelector((state: RootState) => state.option.darkMode);
	const expanded = useSelector((state: RootState) => state.option.expanded);
	const lang = useSelector((state: RootState) => state.option.lang);
	const date = useSelector((state: RootState) => state.option.selectedDate);
	const evtStatus = useSelector((state: RootState) => state.event.events);
	const dispatch = useDispatch<AppDispatch>();

	const themeCode = darkmode ? "#161616" : "#f9f9f7"
	const fontColor = darkmode ? "#DCDCDC" : "#161616"

	const days = getWeekDateNumbersFromISOString(new Date(date).toISOString())

	const systime = getSystemGMTOffset()

	const events = useSelector(filterEvents(new Date(date).toISOString()))

	const [boxes, setBoxes] = useState([]);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	useEffect(() => {
		setBoxes([]);
		if (!events || events.length === 0) return;
		let end = new Date(0);
		const newBoxes: TimeBoxProps[] = events.map((event: Event) => {
			const start = new Date(event.date); // assuming ISO string or Date
			const eventEnd = new Date(start.getTime() + event.timeRange * 60000)
			const dayIndex = start.getDay();     // Sunday = 0, Monday = 1, ...
			const startHour = start.getHours();
			const startMinute = start.getMinutes();
			const durationMinutes = event.timeRange;

			const coord = getEventBox(dayIndex, startHour, startMinute, durationMinutes, start < end);
			end = eventEnd
			const color = event.color
			const id = event.id
			const title = event.name
			return {
				coord,
				color,
				id,
				title
			};
		});

		setBoxes(newBoxes);
	}, [evtStatus, date]);

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
				height: '75%',
				scrollbarWidth: 'none',
				msOverflowStyle: 'none',
			}}
			className="rounded-xl p-4 shadow-md overflow-scroll"
		>
			<div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
				<div className="w-10">
					<div className="relative h-16">
						<div className="absolute top-2 text-xs">{expanded ? systime : ""}</div>
					</div>
				</div>

				{WEEKDAYS[lang].map((day, idx) => (
					<div key={idx} className="flex flex-col justify-center items-center h-14 text-xs relative">
						<div>{day}</div>
						<div className="text-lg pt-1">{days[idx]}</div>
					</div>
				))}
			</div>
			<div className="my-0 border-t border-gray-600" />
			<div
				className="mt-0 h-screen overflow-scroll relative"
				style={{
					scrollbarWidth: 'none',
					msOverflowStyle: 'none',
				}}>
				<div
					className="grid grid-rows-24 gap-0"
					style={{ width: '100%' }}
				>
					{HOURS[lang].map((hour, idx) => (
						<div
							key={idx}
							className="grid grid-cols-[0.3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] h-16"
						>
							<div className="flex items-end justify-start text-[10px] ">
								<span style={{}}>{hour}</span>
							</div>
							{Array.from({ length: 7 }).map((_, i) => (
								<div key={i} className=" border-l border-b border-gray-600" />
							))}
						</div>
					))}
				</div>

				{boxes.map((box, index) => (
					<div key={index} onClick={() => toggleModal(box.id)}>
						<TimeBox {...box} />
					</div>

				))}
				<DetailsModal isOpen={isOpen} onOpenChange={onOpenChange} />
			</div>

		</div>
	)
}

export default WeekView