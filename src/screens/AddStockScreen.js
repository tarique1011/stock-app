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
			text: this.props.navigation.state.params.stock_price,
			error: ''
		};

		axios.defaults.headers.common['Authorization'] = `Bearer keygK8JmWLRyCOoJb`;
	}

	updatePrice = () => {
		this.setState({ error: '' });
		const regex = /^\d+(\.\d{1,2})?$/;

		if (regex.test(this.state.text)) {
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
		} else {
			this.setState({ error: 'Please input a valid price' });
		}
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

				this.setState({ text: '' });
				this.props.updateData(data);
			});
	};

	renderAddStockPrice() {
		return (
			<View style={{ margin: 10, padding: 10, width: '90%' }}>
				<Text style={styles.headerTextStyle}>Enter the Stock Price</Text>
				<View style={styles.cardStyle}>
					<Input
						style={{ width: '50%' }}
						onChangeText={text => this.setState({ text })}
						placeholder="Stock Price in ₹"
						value={this.state.text}
					/>
					<Button onPress={this.updatePrice}>Add</Button>
				</View>
				<Text style={styles.errorTextStyle}>{this.state.error}</Text>
			</View>
		);
	}

	renderEditStockPrice() {
		return (
			<View style={{ margin: 10, padding: 10, width: '90%' }}>
				<Text style={styles.headerTextStyle}>Edit the Stock Price</Text>
				<View style={styles.cardStyle}>
					<Input
						style={{ width: '50%' }}
						onChangeText={text => this.setState({ text })}
						value={this.state.text}
						placeholder="Stock Price in ₹"
					/>
					<Button onPress={this.deletePrice}>Delete</Button>
					<Button onPress={this.updatePrice}>Update</Button>
				</View>

				<Text style={styles.errorTextStyle}>{this.state.error}</Text>
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
		return <View style={styles.container}>{this.renderMainContainer()}</View>;
	}
}

const styles = {
	container: {
		flex: 1,
		alignItems: 'center',
		width: SCREEN_WIDTH
	},
	headerTextStyle: {
		fontSize: 25,
		fontFamily: 'Roboto',
		fontWeight: '500',
		color: Colors.black
	},
	cardStyle: {
		flexDirection: 'row',
		width: '100%',
		marginTop: 10,
		justifyContent: 'space-between'
	},
	errorTextStyle: {
		color: Colors.red,
		alignSelf: 'flex-start',
		marginTop: 5
	}
};

function mapStateToProps(state) {
	return {
		stock: state.stock
	};
}

export default connect(
	mapStateToProps,
	{ updateData }
)(AddStockScreen);
