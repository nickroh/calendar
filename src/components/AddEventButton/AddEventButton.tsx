import type { RootState, AppDispatch } from "../../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@heroui/button";
import AddIcon from '@mui/icons-material/Add';
import { useDisclosure } from "@heroui/modal";
import CreateModal from "../Modal/CreateModal.tsx";
import { CREATE_NEW_EVENT } from "../../utils/constants.ts";

const AddEventButton = () => {
	const expanded = useSelector((state: RootState) => state.option.expanded);
	const darkmode = useSelector((state: RootState) => state.option.darkMode);
	const lang = useSelector((state: RootState) => state.option.lang);
	const dispatch = useDispatch<AppDispatch>();

	const btnColor = darkmode ? "bg-zinc-600" : "bg-gradient-to-tr from-pink-500 to-yellow-500 text-white"
	const fontColor = darkmode ? "#DCDCDC" : "#FFFFFF"
	const {isOpen, onOpen, onOpenChange} = useDisclosure();


	return (
		<>
			{expanded ? (
				<Button 
					className={`${btnColor} absolute top-20 left-16 h-16 z-50`}
					startContent={<AddIcon />}
					style={{color: fontColor}}
					onPress={onOpen}
					>
					{CREATE_NEW_EVENT[lang]}
				</Button>
			) : (
				<Button 
					className={`${btnColor} absolute top-20 left-4 h-16 z-50`}
					startContent={<AddIcon />}
					style={{color: fontColor}}
					onPress={onOpen}
					>

				</Button>
			)}
			<CreateModal isOpen={isOpen} onOpenChange={onOpenChange}/>
		</>
	)
}

export default AddEventButton