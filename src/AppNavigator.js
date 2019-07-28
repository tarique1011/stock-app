import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import AddStockScreen from './screens/AddStockScreen';

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
