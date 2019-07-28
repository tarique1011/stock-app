import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import { HomeScreen, AddStockScreen, LoadingScreen } from './screens';

const StackNavigator = createStackNavigator({
	Home: {
		screen: HomeScreen
	},
	Stocks: {
		screen: AddStockScreen
	}
});

const MainNavigator = createSwitchNavigator({
	Loading: {
		screen: LoadingScreen
	},
	HomeStack: {
		screen: StackNavigator
	}
});

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;
