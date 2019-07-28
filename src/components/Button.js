import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Colors } from '../res';

class Button extends Component {
	render() {
		return (
			<TouchableOpacity onPress={this.props.onPress} style={[styles.buttonStyle, this.props.style]}>
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
		borderColor: Colors.blue,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonTextStyle: {
		fontSize: 16,
		fontFamily: 'Roboto',
		fontWeight: '500',
		color: Colors.blue
	}
};

export { Button };
