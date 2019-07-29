import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, TouchableOpacity, Dimensions, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
import { Button, Input } from '../components';
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
			xAxis: [],
			yAxis: [],
			isLoading: true,
			stocksBought: false,
			buyDate: null,
			sellDate: null,
			error: '',
			units: '-',
			selldate: '-',
			buydate: '-',
			profit: '-',
			profitColor: Colors.black
		};
	}

	componentDidMount() {
		DeviceEventEmitter.addListener('updateChartView', this.updateChartView.bind(this));
		this.updateChartView();
	}

	updateChartView() {
		const days = this.props.stock.data.map(item => {
			return item.days;
		});

		const xAxis = this.props.stock.data.map(item => {
			if (item.days % 3 === 0) {
				return item.days;
			}
		});

		const stock_price = this.props.stock.data.map(item => {
			if (item.stock_price) {
				return item.stock_price;
			}
			return null;
		});

		const yAxis = [...stock_price];

		this.setState({ days, stock_price, xAxis, yAxis, isLoading: false });
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
			<View style={{ alignItems: 'center', marginTop: 40 }}>
				<Text style={styles.graphHeaderStyle}>Sock Prices By Day</Text>
				<LineChart
					data={{
						labels: this.state.xAxis,
						datasets: [
							{
								data: this.state.yAxis
							}
						]
					}}
					width={Dimensions.get('window').width - 20}
					height={250}
					yAxisLabel={'₹'}
					chartConfig={{
						backgroundColor: '#e26a00',
						backgroundGradientFrom: '#fb8c00',
						backgroundGradientTo: '#ffa726',
						color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
						style: {
							borderRadius: 5
						}
					}}
					style={{
						margin: 20,
						borderRadius: 2
					}}
				/>
			</View>
		);
	}

	buyStock = () => {
		const buyDate = this.state.buyDate;
		this.setState({ error: '' });

		if (this.state.days.includes(buyDate)) {
			this.setState({
				stocksBought: true,
				buydate: `${buyDate} June 2019`,
				units: '10',
				selldate: '-',
				profit: '-',
				sellDate: null,
				profitColor: Colors.black
			});
		} else {
			this.setState({ error: 'Please enter a valid date' });
		}
	};

	sellStock = () => {
		this.setState({ error: '' });
		const { buyDate, sellDate, days, stock_price } = this.state;

		if (days.includes(sellDate) && (parseInt(sellDate) >= parseInt(buyDate) && parseInt(sellDate) <= 30)) {
			const profit = 10 * (stock_price[sellDate - 1] - stock_price[buyDate - 1]);
			if (parseInt(profit) > 0) {
				this.setState({ profitColor: Colors.green, profit: `+${profit}` });
			} else if (parseInt(profit) < 0) {
				this.setState({ profitColor: Colors.brickRed, profit });
			}

			this.setState({
				stocksBought: false,
				selldate: `${sellDate} June 2019`,
				units: '-',
				buydate: '-',
				buyDate: null
			});
		} else {
			this.setState({ error: 'Please enter a valid date' });
		}
	};

	renderTable() {
		const { units, selldate, buydate, profit } = this.state;
		return (
			<View style={{ marginVertical: 10 }}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
					<Text style={styles.tableHeaderStyle}>Stock Units</Text>
					<Text style={styles.tableHeaderStyle}>Buy Date</Text>
					<Text style={styles.tableHeaderStyle}>Sell Date</Text>
					<Text style={styles.tableHeaderStyle}>Profit(₹)</Text>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Text style={styles.tableContentStyle}>{units}</Text>
					<Text style={styles.tableContentStyle}>{buydate}</Text>
					<Text style={styles.tableContentStyle}>{selldate}</Text>
					<Text style={[styles.tableContentStyle, { color: this.state.profitColor }]}>{profit}</Text>
				</View>
			</View>
		);
	}

	renderLowerDashboard() {
		if (!this.state.stocksBought) {
			return (
				<View>
					{this.renderTable()}
					<Text style={{ fontSize: 16, color: Colors.black, marginTop: 10, marginBottom: 5 }}>Select Buy Date:</Text>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Input
							onChangeText={buyDate => this.setState({ buyDate })}
							value={this.state.buyDate}
							placeholder="Enter 1-30"
						/>
						<Button onPress={this.buyStock}>Buy</Button>
					</View>
				</View>
			);
		}

		return (
			<View>
				{this.renderTable()}
				<Text style={{ fontSize: 16, color: Colors.black, marginTop: 10, marginBottom: 5 }}>Select Sell Date:</Text>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Input
						onChangeText={sellDate => this.setState({ sellDate })}
						value={this.state.sellDate}
						placeholder="Enter 1-30"
					/>
					<Button onPress={this.sellStock}>Sell</Button>
				</View>
			</View>
		);
	}

	renderDashboard() {
		return (
			<View style={{ flex: 1, marginTop: 20, marginBottom: 50, width: '90%' }}>
				<Text style={styles.dashboardHeaderStyle}>Your Dashboard</Text>
				{this.renderLowerDashboard()}
				<Text style={styles.errorTextStyle}>{this.state.error}</Text>
			</View>
		);
	}

	renderMainContainer() {
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
				{this.renderWelcomeMessage()}
				{this.renderCalendar()}
				{this.renderGraph()}
				{this.renderDashboard()}
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
		color: Colors.green,
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
	},
	dashboardHeaderStyle: {
		textAlign: 'center',
		fontSize: 30,
		fontWeight: '500',
		color: Colors.blue,
		fontFamily: 'Roboto'
	},
	tableHeaderStyle: {
		fontSize: 16,
		fontFamily: 'Roboto',
		fontWeight: '500',
		textAlign: 'center',
		flex: 1
	},
	tableContentStyle: {
		fontSize: 14,
		textAlign: 'center',
		flex: 1
	},
	errorTextStyle: {
		color: Colors.brickRed,
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
	null
)(HomeScreen);
