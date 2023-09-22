import { MaterialIcons } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import { forwardRef, useMemo } from 'react';
import {
	ActivityIndicator,
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

	const { width } = useWindowDimensions();

	const height = useMemo(() => Math.round(((width - 20) * 4) / 3), [width]);

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
		<Camera
			style={[
				{
					width: '100%',
					height,
					justifyContent: 'center',
				},
			]}
			type={type}
			ref={cameraRef}
			ratio='4:3'
		>
			<ActivityIndicator size={50} color='#fff' animating={loading} />
		</Camera>
	);
}

const AppCamera = forwardRef(_AppCamera);

export default AppCamera;
