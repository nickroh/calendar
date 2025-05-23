import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	useDraggable,
	Input,
	Link,
} from "@heroui/react";
import { CreateModalProps } from "./createmodal.types";
import TitleIcon from '@mui/icons-material/Title';
import { TimeInput } from "@heroui/date-input";
import { parseDate, Time } from "@internationalized/date";
import { DatePicker } from "@heroui/date-picker";
import { Textarea } from "@heroui/input";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { MODAL_TEXT } from "../../utils/constants";
import createEvent from "./CreateEvent";
import { calendarDateToLocalDate, parseDateOnly, toISOStringWithTime } from "../../utils/util";
import { setSelectedDate } from "../../store/option/optionSlice";

const CreateModal = ({ isOpen, onOpenChange }: CreateModalProps) => {
	const now = new Date();
	const isoString = now.toISOString();
	const startTime = new Time(now.getHours(), now.getMinutes());
	const endTime = new Time((now.getHours() + 1) % 24, now.getMinutes());

	const lang = useSelector((state: RootState) => state.option.lang);
	const curr = useSelector((state: RootState) => state.option.selectedDate);
	const darkmode = useSelector((state: RootState) => state.option.darkMode);
	const dispatch = useDispatch<AppDispatch>();

	const theme = darkmode ? "#DEDEDE" : "#c1c5ca"
	const fontColor = darkmode ? "#121212" : "#121212"

	const [description, setdescription] = useState("");
	const [date, setDate] = useState(parseDate(parseDateOnly(curr)));
	const [start, setStart] = useState(new Time());
	const [end, setend] = useState(new Time());
	const [title, setTitle] = useState("");

	const [complete, setComplete] = useState(false);

	const targetRef = useRef(null);
	const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

	useEffect(() => {
		if (isOpen) {
			setTitle("");
			setdescription("");
			setDate(parseDate(parseDateOnly(curr)));
			setStart(new Time(now.getHours(), now.getMinutes()));
			setend(new Time((now.getHours() + 1) % 24, now.getMinutes()));
			setComplete(false);
		}
	}, [isOpen]);

	useEffect(() => {
		const isValid =
			title.trim() !== "" &&
			// date instanceof Date &&
			// !isNaN(date.getTime()) &&
			start instanceof Time &&
			end instanceof Time &&
			(end.hour > start.hour || (end.hour === start.hour && end.minute > start.minute));

		setComplete(isValid);
	}, [title, description, date, start, end]);

	const handleCreate = () => {
		createEvent(dispatch, title, toISOStringWithTime(date.toString(), start), description, (end.hour - start.hour) * 60 + (end.minute - start.minute))
	}

	return (
		<Modal ref={targetRef} isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<div style={{ color: fontColor }}>
						<ModalHeader {...moveProps} style={{ backgroundColor: theme }} className="flex flex-col gap-1"></ModalHeader>
						<ModalBody style={{ backgroundColor: theme }}>
							<Input
								className="bg-white rounded-xl"
								endContent={
									<TitleIcon className="text-2xl pointer-events-none flex-shrink-0" />
								}
								value={title}
								onValueChange={setTitle}
								label={MODAL_TEXT[lang][0]}
								placeholder={MODAL_TEXT[lang][1]}
								variant="bordered"
							/>
							<div className="flex gap-4">
								<DatePicker
									value={date}
									onChange={(val) => {
										const localDate = calendarDateToLocalDate(val);
										console.log(localDate.toISOString().toString())
										setDate(parseDate(parseDateOnly(localDate.toISOString())))
									}}
									className="max-w-[284px]"
									label={MODAL_TEXT[lang][2]} />
								<TimeInput value={start} onChange={setStart} defaultValue={startTime} label={MODAL_TEXT[lang][3]} />
								<TimeInput value={end} onChange={setend} defaultValue={endTime} label={MODAL_TEXT[lang][4]} />
							</div>
							<Textarea style={{
								scrollbarWidth: 'none',
								msOverflowStyle: 'none',
							}}
								value={description}
								onValueChange={setdescription}
								className="max-w"
								label={MODAL_TEXT[lang][5]}
								placeholder={MODAL_TEXT[lang][6]}
							/>
						</ModalBody>
						<ModalFooter style={{ backgroundColor: theme }}>
							<Button color="danger" variant="flat" onPress={onClose}>
								Close
							</Button>
							<Button isDisabled={!complete} color="primary" onPress={() => { handleCreate(); onClose(); }}>
								Save
							</Button>
						</ModalFooter>
					</div>
				)}
			</ModalContent>
		</Modal>
	)
}

export default CreateModal 