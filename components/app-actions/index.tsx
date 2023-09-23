import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import {
	Animated,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { COLOR_PRIMARY } from '../../constants/colors';
import NetworkStatus from '../network-status';

export interface AppActionsProps {
	loading?: boolean;
	takePicture?: () => void;
	toggleCameraType?: () => void;
}

export default function AppActions({
	loading,
	takePicture,
	toggleCameraType,
}: AppActionsProps) {
	const rotationAnimate = useRef(new Animated.Value(0)).current;

	const rotate = rotationAnimate.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '180deg'],
	});

	const handleFlipCamera = () => {
		Animated.spring(rotationAnimate, {
			toValue: 1,
			useNativeDriver: true,
		}).start(() => {
			rotationAnimate.setValue(0);
		});
		toggleCameraType?.();
	};

	const translateYAnimate = useRef(new Animated.Value(0)).current;

	const translateY = translateYAnimate.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 100],
	});

	useEffect(() => {
		loading
			? Animated.spring(translateYAnimate, {
					toValue: 1,
					useNativeDriver: true,
			  }).start()
			: Animated.spring(translateYAnimate, {
					toValue: 0,
					useNativeDriver: true,
			  }).start();
	}, [loading]);

	return (
		<Animated.View
			style={[
				styles.container,
				{
					transform: [
						{
							translateY,
						},
					],
				},
			]}
		>
			<NetworkStatus />
			<TouchableOpacity style={styles.submitButton} onPress={takePicture}>
				<View style={styles.submmitButtonInner}>
					<MaterialIcons
						name='search'
						color={COLOR_PRIMARY}
						size={40}
					/>
				</View>
			</TouchableOpacity>

			<Animated.View style={{ transform: [{ rotate }] }}>
				<Pressable
					style={[styles.flipCameraButton]}
					onPress={handleFlipCamera}
				>
					<MaterialIcons
						name='flip-camera-android'
						size={24}
						color={COLOR_PRIMARY}
					/>
				</Pressable>
			</Animated.View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		padding: 20,
		borderRadius: 20,
		width: '100%',
	},
	submitButton: {
		width: 80,
		height: 80,
		backgroundColor: 'transparent',
		borderRadius: 100,
		borderColor: COLOR_PRIMARY,
		borderWidth: 5,
	},
	submmitButtonInner: {
		flex: 1,
		margin: 5,
		backgroundColor: `${COLOR_PRIMARY}20`,
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	flipCameraButton: {
		backgroundColor: `${COLOR_PRIMARY}20`,
		padding: 10,
		borderRadius: 100,
	},
});
