import React, { Component } from 'react';
import { View } from 'react-native';

class Card extends Component {
	render() {
		return <View style={styles.container}>{this.props.children}</View>;
	}
}

const styles = {
	container: {
		height: '40%',
		width: '90%',
		borderWidth: 1,
		shadowColor: '#000',
		shadowOffset: { width: 2, height: 0 },
		shadowOpacity: 0.2,
		marginBottom: 10,
		elevation: 2,
		position: 'relative'
	}
};

export { Card };
