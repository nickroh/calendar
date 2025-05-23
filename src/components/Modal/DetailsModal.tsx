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
import { CreateModalProps, DetailsModalProps } from "./createmodal.types";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setSelectedDate, setSelectedEvent } from "../../store/option/optionSlice";
import { removeEvent } from "../../store/event/eventsSlice";
import { parseISO } from "date-fns";


const DetailsModal = ({ isOpen, onOpenChange }: DetailsModalProps) => {
	const selectedEvent = useSelector((state: RootState) => state.option.selectedEvent);
	const dispatch = useDispatch<AppDispatch>();
	const darkmode = useSelector((state: RootState) => state.option.darkMode);


	const theme = darkmode ? "#DEDEDE" : "#c1c5ca"
	const fontColor = darkmode ? "#121212" : "#FFFFFF"
	// if (!selectedEvent?.date) {
	// 	console.error("selectedEvent.date is null");
	// 	return;
	// }
	// const start = parseISO(selectedEvent.date);
	// const end = new Date(start.getTime() + selectedEvent.timeRange * 60000);
	const handleRemove = () => {
		dispatch(removeEvent(selectedEvent.id))
	}

	const targetRef = useRef(null);
	const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen }); return (
		<Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader {...moveProps} style={{ backgroundColor: theme }} className="flex flex-col gap-1 text-black" >
							{selectedEvent.name}
						</ModalHeader>
						<ModalBody style={{ backgroundColor: theme }} className="flex flex-col gap-1 text-black">
							<p>
								{parseISO(selectedEvent.date).toTimeString().slice(0, 5) + "-" + new Date(parseISO(selectedEvent.date).getTime() + selectedEvent.timeRange * 60000).toTimeString().slice(0, 5)}
							</p>
							<p>
								{selectedEvent.description}
							</p>
						</ModalBody>
						<ModalFooter style={{ backgroundColor: theme }}>
							<Button color="danger" variant="light" onPress={onClose}>
								Close
							</Button>
							<Button color="warning" onPress={() => { handleRemove(); onClose() }}>
								Remove
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default DetailsModal