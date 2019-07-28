import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';

class Button extends Component {
	render() {
		return (
			<TouchableOpacity onPress={this.props.onPress} style={styles.buttonStyle}>
				<Text style={styles.buttonTextStyle}>{this.props.children}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = {
	buttonStyle: {
		width: 80,
		height: 40,
		backgroundColor: 'transparent',
		borderWidth: 2,
		borderRadius: 5,
		borderColor: 'blue',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonTextStyle: {
		fontSize: 16,
		fontFamily: 'Roboto',
		fontWeight: '500',
		color: 'blue'
	}
};

export { Button };
