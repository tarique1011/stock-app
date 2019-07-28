import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Airtable from 'airtable';
import { Colors } from '../res';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}

	componentDidMount() {
		const base = new Airtable({ apiKey: 'keygK8JmWLRyCOoJb' }).base('appVgOprBCsLoWLmk');

		base('Table 1')
			.select({
				// Selecting the first 3 records in Grid view:
				view: 'Grid view'
			})
			.eachPage(
				(records, fetchNextPage) => {
					// This function (`page`) will get called for each page of records.
					const data = [];
					records.forEach(record => {
						data.push({ days: record.get('days'), id: record.getId(), stock_price: record.get('stock_price') });
					});

					this.setState({ data });

					fetchNextPage();
				},
				err => {
					if (err) {
						console.error(err);
						return;
					}
				}
			);
	}

	renderItem = ({ item }) => {
		const { id, days } = item;
		return (
			<TouchableOpacity
				style={styles.cell}
				onPress={() => this.props.navigation.navigate('Stocks', { id, msg: 'Hi', days })}
			>
				<Text>{item.days}</Text>
			</TouchableOpacity>
		);
	};

	render() {
		console.log(this.state.data);
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

export { HomeScreen };
