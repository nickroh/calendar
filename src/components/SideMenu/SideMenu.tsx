import type { RootState, AppDispatch } from "../../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import MiniCalendar from "../MiniCalendar/MiniCalendar.tsx";
import EasterButton from "./test.tsx";

const SideMenu = () => {
	const expanded = useSelector((state: RootState) => state.option.expanded);
	const darkmode = useSelector((state: RootState) => state.option.darkMode);
	const dispatch = useDispatch<AppDispatch>();

	return (
		<div
			className={`
			h-screen 
			overflow-scroll
			transition-transform transition-width
			duration-300 ease-in-out
			transform
			${expanded ? "w-72 translate-x-0" : "w-0 -translate-x-full overflow-hidden"}
			grid place-items-top
		`}
			style={{
				backgroundColor: darkmode ? "#272727" : "#f2f3f4",
				scrollbarWidth: 'none',
				msOverflowStyle: 'none',
			}}
		>
			<div className="p-4 flex flex-col items-center gap-4">
				<MiniCalendar />
				{[...Array(7)].map((_,idx)=> (
					<EasterButton key={idx}/>
				))}

				<div className="h-16"/>
			</div>
		</div>
	)
}

export default SideMenu