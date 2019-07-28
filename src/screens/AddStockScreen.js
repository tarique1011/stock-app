import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateData } from '../actions';
import { Button, Input, Card } from '../components';
import { Colors } from '../res';

const SCREEN_WIDTH = Dimensions.get('window').width;

class AddStockScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: `${navigation.state.params.days} June, 2019`,
			headerStyle: {
				backgroundColor: Colors.yellow
			},
			headerTitleStyle: {
				fontFamily: 'Roboto'
			}
		};
	};

	constructor(props) {
		super(props);
		this.state = {
			text: this.props.navigation.state.params.stock_price
		};

		axios.defaults.headers.common['Authorization'] = `Bearer keygK8JmWLRyCOoJb`;
	}

	updatePrice = () => {
		axios
			.patch(`https://api.airtable.com/v0/appVgOprBCsLoWLmk/Table%201/${this.props.navigation.state.params.id}`, {
				fields: {
					stock_price: this.state.text
				}
			})
			.then(res => {
				const data = [...this.props.stock.data];

				for (const item of data) {
					if (item.id === this.props.navigation.state.params.id) {
						item.stock_price = this.state.text;
					}
				}

				this.props.updateData(data);
			});
	};

	deletePrice = () => {
		axios
			.patch(`https://api.airtable.com/v0/appVgOprBCsLoWLmk/Table%201/${this.props.navigation.state.params.id}`, {
				fields: {
					stock_price: ''
				}
			})
			.then(res => {
				const data = [...this.props.stock.data];

				for (const item of data) {
					if (item.id === this.props.navigation.state.params.id) {
						item.stock_price = '';
					}
				}

				this.props.updateData(data);
			});
	};

	renderAddStockPrice() {
		return (
			<View style={{ margin: 10, padding: 10, width: '90%' }}>
				<Text style={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: '500', color: Colors.black }}>
					Enter the Stock Price
				</Text>
				<View style={{ flexDirection: 'row', width: '100%', marginTop: 10, justifyContent: 'space-between' }}>
					<Input
						style={{ width: '50%' }}
						onChangeText={text => this.setState({ text })}
						placeholder="Stock Price in ₹"
						value={this.state.text}
					/>
					<Button onPress={this.updatePrice}>Add</Button>
				</View>
			</View>
		);
	}

	renderEditStockPrice() {
		return (
			<View style={{ margin: 10, padding: 10, width: '90%' }}>
				<Text style={{ fontSize: 25, fontFamily: 'Roboto', fontWeight: '500', color: Colors.black }}>
					Edit the Stock Price
				</Text>
				<View style={{ flexDirection: 'row', width: '100%', marginTop: 10, justifyContent: 'space-between' }}>
					<Input
						style={{ width: '50%' }}
						onChangeText={text => this.setState({ text })}
						value={this.state.text}
						placeholder="Stock Price in ₹"
					/>
					<Button onPress={this.updatePrice}>Update</Button>
				</View>
				<Button onPress={this.deletePrice}>Delete</Button>
			</View>
		);
	}

	renderMainContainer() {
		if (this.props.navigation.state.params.stock_price) {
			return this.renderEditStockPrice();
		} else {
			return this.renderAddStockPrice();
		}
	}

	render() {
		return <View style={{ flex: 1, alignItems: 'center', width: SCREEN_WIDTH }}>{this.renderMainContainer()}</View>;
	}
}

function mapStateToProps(state) {
	return {
		stock: state.stock
	};
}

export default connect(
	mapStateToProps,
	{ updateData }
)(AddStockScreen);
