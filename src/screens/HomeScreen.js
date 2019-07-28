import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Colors } from '../res';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.stock.data
		};
	}

	renderItem = ({ item }) => {
		const { id, days } = item;
		return (
			<TouchableOpacity
				style={styles.cell}
				onPress={() => this.props.navigation.navigate('Stocks', { id, msg: 'Hi', days })}
			>
				<Text>{item.days}</Text>
				<Text>{item.stock}</Text>
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
			</View>
		);
	}
}

const styles = {
	cell: {
		width: 60,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		margin: 1
	},
	calendarContainer: {
		height: 415,
		borderRadius: 4,
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
