import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Airtable from 'airtable';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		const base = new Airtable({ apiKey: 'keygK8JmWLRyCOoJb' }).base('appVgOprBCsLoWLmk');

		base('Table 1')
			.select({
				// Selecting the first 3 records in Grid view:
				view: 'Grid view'
			})
			.eachPage(
				function page(records, fetchNextPage) {
					// This function (`page`) will get called for each page of records.

					records.forEach(function(record) {
						console.warn('Retrieved', record.get('days'), record.getId(), record.get('stock_price'));
					});

					// To fetch the next page of records, call `fetchNextPage`.
					// If there are more records, `page` will get called again.
					// If there are no more records, `done` will get called.
					fetchNextPage();
				},
				function done(err) {
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
				<Text>HomeScreen</Text>
			</View>
		);
	}
}

export { HomeScreen };
