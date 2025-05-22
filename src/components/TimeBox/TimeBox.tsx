import { TimeBoxProps } from "./box.types"
import { randomColor } from "../../utils/util"

const TimeBox = (props: TimeBoxProps) => {
	const removeEvent = () => {

	}

	return (
		<div
			className="absolute opacity-60 rounded"
			style={{
				left: props.coord.left, // 14:00
				top: props.coord.top,   // e.g., Thursday (4th row)
				width: props.coord.width,  // 2 hours
				height: props.coord.height, // one day row
				backgroundColor: props.color
			}}
			// onClick={}
		/>
	)
}

export default TimeBox