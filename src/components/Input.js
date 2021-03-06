import React, { Component } from 'react';
import { TextInput } from 'react-native';

class Input extends Component {
	render() {
		return (
			<TextInput
				onChangeText={this.props.onChangeText}
				placeholder={this.props.placeholder}
				value={this.props.value}
				style={[styles.inputStyle, this.props.style]}
			/>
		);
	}
}

const styles = {
	inputStyle: {
		height: 40,
		width: 150,
		borderWidth: 1,
		borderRadius: 5,
		fontSize: 16
	}
};

export { Input };
