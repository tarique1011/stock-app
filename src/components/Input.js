import React, { Component } from 'react';
import { TextInput } from 'react-native';

class Input extends Component {
	render() {
		return (
			<TextInput
				onChangeText={this.props.onChangeText}
				placeholder={this.props.placeholder}
				value={this.props.value}
				style={styles.inputStyle}
			/>
		);
	}
}

const styles = {
	inputStyle: {
		height: 40,
		width: 100,
		borderWidth: 1,
		borderRadius: 5
	}
};

export { Input };
