import React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Typography from "@mui/material/Typography";
import type { RootState, AppDispatch } from "../../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { setExpandedMode, setSelectedDate } from "../../store/option/optionSlice.ts";
import DarkModeSwitch from "../Switches/Switches.tsx";
import { parseDateOnly, addDaysToISODate } from "../../utils/util.ts";
import LangDropDown from "../DropDown/LangDropDown.tsx";
import { ViewMode } from "../../store/option/option.ts";
import ViewModeDropDown from "../DropDown/ViewModeDropDown.tsx";

interface Props {
  label: string;
}

const AppBarLabel: React.FC<Props> = ({ label }) => {
  const dispatch = useDispatch<AppDispatch>();
	const date = useSelector((state: RootState) => state.option.selectedDate);
  const mode = useSelector((state: RootState) => state.option.viewMode);
  const handleExpandedMode = () => {
    dispatch(setExpandedMode());
  };

  const incrementDate = () => {
    console.log(mode)
    const jump = mode === ViewMode.week ? 7: 30; 
    dispatch(setSelectedDate(addDaysToISODate(date,jump)))
  }

  const decrementDate = () => {
    const jump = mode === ViewMode.week ? 7: 30; 
    dispatch(setSelectedDate(addDaysToISODate(date,-jump)))
  }

  return (
    <Toolbar>
      <IconButton
        onClick={handleExpandedMode}
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ mr: 10 }}>
        {label}
      </Typography>
      <IconButton
        onClick={decrementDate}
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 0.5 }}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      <IconButton
        onClick={incrementDate}
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        { parseDateOnly(date)}
      </Typography>
      <ViewModeDropDown/>
      <div className="p-2" />
      <LangDropDown/>
      <div className="p-2" />
      <DarkModeSwitch/>
    </Toolbar>
  );
};

export default AppBarLabel;
