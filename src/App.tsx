import { HeroUIProvider } from "@heroui/react";
import Calendar from './pages/CalendarView'
import type { RootState, AppDispatch } from "./store/store.ts";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
	const darkmode = useSelector((state: RootState) => state.option.darkMode);
	const dispatch = useDispatch<AppDispatch>();
  return (
    <HeroUIProvider>
      <div style={{ backgroundColor: darkmode ? '#272727' : '#f2f3f4' }}>
        <Calendar />
      </div>
    </HeroUIProvider>
  )
}

export default App
