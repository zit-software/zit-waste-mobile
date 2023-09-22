import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLOR_PRIMARY } from '../../constants/colors';

export enum ButtonVariant {
	contained,
	flated,
}

export interface ButtonProps {
	title: string;
	icon?: React.ReactNode;
	variant?: ButtonVariant;
	onPress?: () => void;
}

export default function Button({
	title,
	icon,
	variant = ButtonVariant.flated,
	onPress,
}: ButtonProps) {
	return (
		<TouchableOpacity
			style={{
				...styles.button,
				backgroundColor:
					variant === ButtonVariant.contained
						? COLOR_PRIMARY
						: '#00000020',
			}}
			onPress={onPress}
		>
			{icon}
			<Text
				style={[
					styles.text,
					{
						color:
							variant === ButtonVariant.contained
								? '#fff'
								: '#000',
					},
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 25,
		paddingVertical: 15,
		backgroundColor: '#00000020',
		borderRadius: 15,
		gap: 5,
	},
	text: {
		fontFamily: 'Montserrat_700Bold',
	},
});
