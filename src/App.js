import React, { Component } from 'react';
import { View } from 'react-native';
import AppNavigator from './AppNavigator';

export default class App extends Component {
	render() {
		return (
			<View style={styles.container}>
				<AppNavigator />
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1
	}
};
