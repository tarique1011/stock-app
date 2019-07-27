import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen, AddStockScreen } from './screens';

const MainNavigator = createStackNavigator({
	Home: {
		screen: HomeScreen
	},
	Stocks: {
		screen: AddStockScreen
	}
});

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;
