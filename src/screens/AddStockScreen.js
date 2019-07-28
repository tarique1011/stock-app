import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-native-modal';
import { updateData } from '../actions';
import { Button, Input, Card } from '../components';
import { Colors, Images } from '../res';

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
			error: '',
			modalVisible: false
		};

		axios.defaults.headers.common['Authorization'] = `Bearer keygK8JmWLRyCOoJb`;
	}

	updatePrice = () => {
		this.setState({ error: '' });
		const regex = /^\d+(\.\d{1,2})?$/;

		if (this.state.text === this.props.navigation.state.params.stock_price) {
			this.setState({ error: 'Please enter a price' });
			return;
		}

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
					this.setState({ modalVisible: true });
					DeviceEventEmitter.emit('updateChartView');
				});
		} else {
			this.setState({ error: 'Please enter a valid input' });
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
				DeviceEventEmitter.emit('updateChartView');
			});
	};

	renderAddStockPrice() {
		return (
			<View style={{ margin: 10, padding: 10, width: '90%' }}>
				<Text style={styles.headerTextStyle}>Enter the Stock Price</Text>
				<View style={styles.cardStyle}>
					<Input
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
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Input
							onChangeText={text => this.setState({ text })}
							value={this.state.text}
							placeholder="Stock Price in ₹"
						/>
						<TouchableOpacity onPress={this.deletePrice}>
							<Image source={Images.delete} style={styles.deleteImage} />
						</TouchableOpacity>
					</View>
					<Button onPress={this.updatePrice}>Update</Button>
				</View>

				<Text style={styles.errorTextStyle}>{this.state.error}</Text>
			</View>
		);
	}

	renderModal() {
		return (
			<View style={styles.modalContainerStyle}>
				<Modal
					isVisible={this.state.modalVisible}
					onBackdropPress={() => {
						this.setState({ modalVisible: false }), this.props.navigation.navigate('Home');
					}}
				>
					<View style={styles.modalStyle}>
						<Text style={styles.modalTextStyle}>Success</Text>
						<Image source={Images.success} style={styles.modalImageStyle} />
					</View>
				</Modal>
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
			<View style={styles.container}>
				{this.renderMainContainer()}
				{this.renderModal()}
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		alignItems: 'center',
		width: '100%'
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
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	errorTextStyle: {
		color: Colors.brickRed,
		alignSelf: 'flex-start',
		marginTop: 5
	},
	modalContainerStyle: {
		flex: 1
	},
	modalStyle: {
		backgroundColor: Colors.white,
		height: 200,
		width: 300,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalTextStyle: {
		fontSize: 20,
		fontFamily: 'Roboto',
		fontWeight: '500',
		marginBottom: 10
	},
	modalImageStyle: {
		marginTop: 10,
		height: 70,
		width: 70
	},
	deleteImage: {
		height: 25,
		width: 15,
		margin: 5
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
