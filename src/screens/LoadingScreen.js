import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Airtable from 'airtable';
import { connect } from 'react-redux';
import { updateData } from '../actions';
import { Colors } from '../res';

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

		console.disableYellowBox = true;
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.textStyle}>Stock.in</Text>
				<ActivityIndicator size={40} color={Colors.white} />
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.blue
	},
	textStyle: {
		fontSize: 40,
		color: Colors.white,
		fontWeight: '500',
		fontFamily: 'Roboto',
		marginBottom: 10
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
)(LoadingScreen);
