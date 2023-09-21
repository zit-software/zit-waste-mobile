import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export interface ButtonProps {
	children: React.ReactNode;
	onPress?: () => void;
	icon?: React.ReactNode;
	backgroundColor?: string;
}

export default function Button({
	children,
	icon,
	backgroundColor,
	onPress,
}: ButtonProps) {
	return (
		<TouchableOpacity
			style={{
				...styles.button,
				backgroundColor:
					backgroundColor || styles.button.backgroundColor,
			}}
			onPress={onPress}
		>
			{icon}
			{children}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: '#00000020',
		borderRadius: 20,
		gap: 5,
	},
});
