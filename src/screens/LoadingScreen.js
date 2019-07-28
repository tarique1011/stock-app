import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Airtable from 'airtable';
import { connect } from 'react-redux';
import { updateData } from '../actions';

class LoadingScreen extends Component {
	componentDidMount() {
		const base = new Airtable({ apiKey: 'keygK8JmWLRyCOoJb' }).base('appVgOprBCsLoWLmk');

		base('Table 1')
			.select({
				view: 'Grid view'
			})
			.eachPage(
				(records, fetchNextPage) => {
					const data = [];
					records.forEach(record => {
						data.push({ days: record.get('days'), id: record.getId(), stock_price: record.get('stock_price') });
					});

					this.props.updateData(data);
					this.props.navigation.navigate('HomeStack');

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

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Loading</Text>
			</View>
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
)(LoadingScreen);
