import { Button } from "@heroui/button";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
} from "@heroui/dropdown";
import { useMemo, useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLang, setViewMode } from "../../store/option/optionSlice";
import { ViewModeOption } from "../../utils/constants";

const ViewDropDown = () => {
    const lang = useSelector((state: RootState) => state.option.lang);
    const viewMode = useSelector((state: RootState) => state.option.viewMode);
    const darkmode = useSelector((state: RootState) => state.option.darkMode);
    const dispatch = useDispatch<AppDispatch>();
    const [selectedKeys, setSelectedKeys] = useState(1);

    const handleModeChange = (value: number) => {
        dispatch(setViewMode(value));
    };

    const fontColor = darkmode ? "#DCDCDC" : "#242424"

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button className="capitalize" variant="bordered" style={{ color: fontColor }}>
                    {ViewModeOption[lang][viewMode]}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="Single selection example"
                selectedKeys={ViewModeOption[lang][selectedKeys]}
                selectionMode="single"
                variant="flat"
                onSelectionChange={(keys) => {
                    console.log( Array.from(keys)[0])
                    // const selectedKey = Array.from(keys)[0] as ViewMode;
                    handleModeChange(Array.from(keys)[0] as number);
                }}
                style={{ color: "#121212" }}
            >
                {[...Array(4)].map((_, i) => (
                    <DropdownItem key={i} value={i}>
                       {ViewModeOption[lang][i]}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}

export default ViewDropDown