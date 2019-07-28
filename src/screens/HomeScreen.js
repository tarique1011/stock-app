import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '../res';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.stock.data,
			xAxis: ['0'],
			yAxis: [1]
		};
	}

	componentDidMount() {
		const xAxis = this.props.stock.data.map(item => {
			if (item.days % 3 === 0) {
				return item.days;
			}
		});

		const yAxis = this.props.stock.data.map(item => {
			if (item.stock_price) {
				return item.stock_price;
			}
			return '0';
		});

		this.setState({ xAxis, yAxis });
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

	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
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
