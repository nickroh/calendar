import ToolBar from '../components/Toolbar/Toolbar'
import SideMenu from '../components/SideMenu/SideMenu';
import EasterButton from '../components/SideMenu/test';
import AddEventButton from '../components/AddEventButton/AddEventButton';
import WeekView from '../components/WeekView/WeekView';

function Calendar() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <AddEventButton/>
      <div className="h-16 text-white flex items-center justify-center">
        <ToolBar />
      </div>
      <div className="flex flex-1">

        <section className='mt-24'>
          <SideMenu />
        </section>

        <div className="flex-1 p-4 rounded-lg">
          <WeekView />
        </div>
      </div>
    </div>
  );
}

export default Calendar