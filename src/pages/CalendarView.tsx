import ToolBar from '../components/Toolbar/Toolbar'
import SideMenu from '../components/SideMenu/SideMenu';
import AddEventButton from '../components/AddEventButton/AddEventButton';
import WeekView from '../components/WeekView/WeekView';
import type { RootState, AppDispatch } from "../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { ViewMode } from '../store/option/option.ts';
import MonthView from '../components/MonthView/MonthView.tsx';

function Calendar() {
  const viewMode = useSelector((state: RootState) => state.option.viewMode);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <AddEventButton />
      <div className="h-16 text-white flex items-center justify-center">
        <ToolBar />
      </div>
      <div className="flex flex-1">

        <section className='mt-24'>
          <SideMenu />
        </section>

        <div className="flex-1 p-4 rounded-lg">
          {viewMode == ViewMode.week ? <WeekView /> : <MonthView />}
        </div>
      </div>
    </div>
  );
}

export default Calendar