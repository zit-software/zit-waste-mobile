import { MaterialIcons } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import { forwardRef, useEffect, useMemo, useRef } from 'react';
import {
	ActivityIndicator,
	Animated,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import Button from '../button';

export type AppCameraRef = Camera;

export interface AppCameraProps {
	type?: CameraType;
	loading?: boolean;
}

export function _AppCamera(
	{ type = CameraType.back, loading }: AppCameraProps,
	cameraRef: React.Ref<AppCameraRef>,
) {
	const [permission, requestPermission] = Camera.useCameraPermissions();

	const flipAnimate = useRef(new Animated.Value(0)).current;
	const flip = flipAnimate.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	const scaleAnimate = useRef(new Animated.Value(0)).current;
	const scale = scaleAnimate.interpolate({
		inputRange: [0, 1],
		outputRange: [1, 0.8],
	});

	const { width: windowWidth } = useWindowDimensions();

	const cameraWidth = useMemo(() => windowWidth - 20, [windowWidth]);

	const cameraHeight = useMemo(
		() => Math.round((cameraWidth * 4) / 3),
		[cameraWidth],
	);

	useEffect(() => {
		Animated.spring(flipAnimate, {
			toValue: 1,
			useNativeDriver: true,
		}).start(() => {
			flipAnimate.setValue(0);
		});
	}, [type]);

	useEffect(() => {
		if (loading) {
			Animated.spring(scaleAnimate, {
				toValue: 1,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.spring(scaleAnimate, {
				toValue: 0,
				useNativeDriver: true,
			}).start();
		}
	}, [loading]);

	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return (
			<View>
				<Text
					style={{
						textAlign: 'center',
						marginBottom: 10,
					}}
				>
					Chúng tôi cần sử dụng camera của bạn
				</Text>
				<Button
					onPress={requestPermission}
					icon={<MaterialIcons name='camera' />}
					title='Cho phép '
				/>
			</View>
		);
	}

	return (
		<Animated.View
			style={[
				{
					transform: [
						{
							rotateY: flip,
						},
					],
				},
			]}
		>
			<Animated.View
				style={[
					styles.camera,
					{
						transform: [{ scale }],
					},
				]}
			>
				<Camera
					style={[
						{
							width: cameraWidth,
							height: cameraHeight,
							justifyContent: 'center',
						},
					]}
					type={type}
					ref={cameraRef}
					ratio='4:3'
				>
					<ActivityIndicator
						size={50}
						color='#fff'
						animating={loading}
					/>
				</Camera>
			</Animated.View>
		</Animated.View>
	);
}

const AppCamera = forwardRef(_AppCamera);

export default AppCamera;

const styles = StyleSheet.create({
	camera: {
		borderRadius: 20,
		overflow: 'hidden',
		objectFit: 'cover',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
