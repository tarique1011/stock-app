import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateData } from '../actions';
import { Button, Input } from '../components';

class AddStockScreen extends Component {
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
			<View>
				<Input onChangeText={text => this.setState({ text })} placeholder="Add here" value={this.state.text} />
				<Button onPress={this.updatePrice}>Add</Button>
			</View>
		);
	}

	renderEditStockPrice() {
		return (
			<View>
				<Input onChangeText={text => this.setState({ text })} value={this.state.text} placeholder="Add here" />
				<Button onPress={this.updatePrice}>Update</Button>
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
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{this.renderMainContainer()}</View>
		);
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
