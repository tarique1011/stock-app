import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

class AddStockScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		}
	}
	render() {
		const id = this.props.navigation.state.params.id;
		const { days } = this.props.navigation.getParam('days', 'no-days');
		const { msg } = this.props.navigation.getParam('msg', 'no-msg');
		console.warn(id);
		// const { stock_price } = this.props.navigation.getParam('stock_price', 'No Price');

		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<TextInput onChangeText={(text) => this.state.text} value={this.state.value} style={{ width: 60, height: 40 }} />
				<TouchableOpacity 
			</View>
		);
	}
}

export { AddStockScreen };
