import { RootState } from '../../store/store';
import { useSelector } from "react-redux";
import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from "../../utils/colors/colors";
import AppBarLabel from './AppBarLabel';


const ToolBar = () => {
	const darkMode = useSelector((state: RootState) => state.option.darkMode);

	return (
		<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
			<AppBar position="static" color="primary" elevation={0}>
				<AppBarLabel label={'calendar'} />
			</AppBar>
		</ThemeProvider>
	)
}


export default ToolBar