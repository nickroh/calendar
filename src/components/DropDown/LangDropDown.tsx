import { Button } from "@heroui/button";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownSection,
	DropdownItem
} from "@heroui/dropdown";
import { useMemo, useState } from "react";
import { languageLabels } from "../../utils/util";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Lang } from "../../store/option/option";
import { setSelectedLang } from "../../store/option/optionSlice";

const LangDropDown = () => {
	const lang = useSelector((state: RootState) => state.option.lang);
	const darkmode = useSelector((state: RootState) => state.option.darkMode);
	const dispatch = useDispatch<AppDispatch>();
	const [selectedKeys, setSelectedKeys] = useState(languageLabels[lang]);

	const handleLangChange = (key: React.Key) => {
		const lang = key as Lang;
		dispatch(setSelectedLang(lang));
		setSelectedKeys(languageLabels[lang])
	};

	const fontColor = darkmode ? "#DCDCDC" : "#242424"

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button className="capitalize" variant="bordered" style={{ color: fontColor }}>
					{selectedKeys}
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				disallowEmptySelection
				aria-label="Single selection example"
				selectedKeys={selectedKeys}
				selectionMode="single"
				variant="flat"
				onSelectionChange={(keys) => {
					const selectedKey = Array.from(keys)[0];
					handleLangChange(selectedKey);
				}}
				style={{ color: "#121212" }}
			>
				{Object.values(Lang).map((langCode) => (
					<DropdownItem key={langCode} value={langCode}>
						{languageLabels[langCode]}
					</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	)
}

export default LangDropDown