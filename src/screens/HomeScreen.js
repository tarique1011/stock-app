import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, TouchableOpacity, Dimensions, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '../res';

class HomeScreen extends Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.state = {
			data: this.props.stock.data,
			days: [],
			stock_price: [],
			isLoading: true
		};
	}

	componentDidMount() {
		DeviceEventEmitter.addListener('updateChartView', this.updateChartView.bind(this));
		this.updateChartView();
	}

	updateChartView() {
		const days = this.props.stock.data.map(item => {
			if (item.days % 3 === 0) {
				return item.days;
			}
		});

		const stock_price = this.props.stock.data.map(item => {
			if (item.stock_price) {
				return item.stock_price;
			}
			return '0';
		});

		this.setState({ days, stock_price, isLoading: false });
	}

	renderStockPrice(item) {
		if (item.stock_price) {
			return <Text style={styles.stockTextStyle}>₹{item.stock_price}</Text>;
		}
	}

	renderItem = ({ item }) => {
		const { id, days, stock_price } = item;
		return (
			<TouchableOpacity
				style={styles.cell}
				onPress={() => this.props.navigation.navigate('Stocks', { id, stock_price, days })}
			>
				<Text style={styles.dayTextStyle}>{item.days}</Text>
				{this.renderStockPrice(item)}
			</TouchableOpacity>
		);
	};

	renderWelcomeMessage() {
		return (
			<View style={{ justifyContent: 'center', alignItems: 'center', padding: 50 }}>
				<Text style={styles.welcomeTextStyle}>Welcome to Stock.in</Text>
				<Text style={styles.welcomeSubTextStyle}>Buy and Sell Stocks in a click</Text>
			</View>
		);
	}

	renderCalendar() {
		return (
			<View style={styles.calendarContainer}>
				<View style={styles.calendarheaderStyle}>
					<Text style={styles.calendarheaderTextStyle}>June, 2019</Text>
				</View>
				<FlatList
					contentContainerStyle={{ flexGrow: 1 }}
					data={this.state.data}
					renderItem={this.renderItem}
					keyExtractor={item => item.id}
					numColumns={5}
				/>
			</View>
		);
	}

	renderGraph() {
		return (
			<View style={{ alignItems: 'center', marginTop: 20 }}>
				<Text style={styles.graphHeaderStyle}>STOCK PRICES BY DAY</Text>
				<LineChart
					data={{
						labels: this.state.days,
						datasets: [
							{
								data: this.state.stock_price
							}
						]
					}}
					width={Dimensions.get('window').width - 20}
					height={250}
					yAxisLabel={'$'}
					chartConfig={{
						backgroundColor: '#e26a00',
						backgroundGradientFrom: '#fb8c00',
						backgroundGradientTo: '#ffa726',
						decimalPlaces: 2, // optional, defaults to 2dp
						color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
						style: {
							borderRadius: 5
						}
					}}
					style={{
						marginVertical: 8,
						borderRadius: 5
					}}
				/>
			</View>
		);
	}

	renderMainContainer() {
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
				{this.renderWelcomeMessage()}
				{this.renderCalendar()}
				{this.renderGraph()}
			</ScrollView>
		);
	}

	renderSpinner() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Main Loading</Text>
			</View>
		);
	}

	render() {
		if (this.state.isLoading) {
			return this.renderSpinner();
		}
		return this.renderMainContainer();
	}
}

const styles = {
	cell: {
		width: 60,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center'
	},
	dayTextStyle: {
		fontSize: 16,
		fontWeight: '500',
		fontFamily: 'Roboto'
	},
	stockTextStyle: {
		fontSize: 11,
		color: 'green',
		position: 'absolute',
		bottom: 2
	},
	calendarContainer: {
		height: 405,
		borderRadius: 5,
		borderWidth: 1
	},
	calendarheaderStyle: {
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.blue
	},
	calendarheaderTextStyle: {
		fontSize: 16,
		fontWeight: '400',
		fontFamily: 'Roboto',
		color: Colors.white
	},
	graphHeaderStyle: {
		fontSize: 22,
		fontFamily: 'Roboto',
		fontWeight: '500',
		color: Colors.blue
	},
	welcomeTextStyle: {
		textAlign: 'center',
		fontSize: 30,
		fontWeight: '500',
		color: Colors.blue,
		fontFamily: 'Roboto'
	},
	welcomeSubTextStyle: {
		textAlign: 'center',
		fontSize: 16,
		fontWeight: '500',
		color: Colors.lightBlue,
		fontFamily: 'Roboto'
	}
};

function mapStateToProps(state) {
	return {
		stock: state.stock
	};
}

export default connect(
	mapStateToProps,
	null
)(HomeScreen);
