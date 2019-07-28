import React, { Component } from 'react';
import { View, Text } from 'react-native';

class AddStockScreen extends Component {
	render() {
		const id = this.props.navigation.state.params.id;
		const { days } = this.props.navigation.getParam('days', 'no-days');
		const { msg } = this.props.navigation.getParam('msg', 'no-msg');
		console.warn(id);
		// const { stock_price } = this.props.navigation.getParam('stock_price', 'No Price');

		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>{id}</Text>
				<Text>{days}</Text>
				<Text>AddStockScreen</Text>
			</View>
		);
	}
}

export { AddStockScreen };
