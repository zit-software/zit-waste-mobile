import { MaterialIcons } from '@expo/vector-icons';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import * as Network from 'expo-network';
import { useRef, useState } from 'react';
import {
	Button,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import wasteService from './services/waste.service';

Network.getIpAddressAsync().then((ip) => {
	console.log(ip);
});

Network.getNetworkStateAsync().then((state) => {
	console.log(state);
});

export default function App() {
	const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const [photo, setPhoto] = useState<CameraCapturedPicture | null>();
	const cameraRef = useRef<Camera | null>();

	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: 'center' }}>
					We need your permission to show the camera
				</Text>
				<Button onPress={requestPermission} title='grant permission' />
			</View>
		);
	}

	function toggleCameraType() {
		setType((current) =>
			current === CameraType.back ? CameraType.front : CameraType.back,
		);
	}

	const takePicture = async () => {
		if (!cameraRef.current) {
			return;
		}

		try {
			const photo = await cameraRef.current.takePictureAsync();
			setPhoto(photo);

			const img = {
				type: 'image/jpeg',
				uri: photo.uri,
				name: 'photo.jpg',
			};

			const res = await wasteService.detect(img as unknown as Blob);

			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.cameraWrapper}>
				<Camera style={styles.camera} type={type} ref={cameraRef} />
			</SafeAreaView>

			<View style={styles.bottom}>
				<View></View>

				<TouchableOpacity
					style={styles.submitButton}
					onPress={takePicture}
				>
					<View style={styles.submmitButtonInner}></View>
				</TouchableOpacity>

				<Pressable>
					<MaterialIcons
						name='flip-camera-android'
						size={24}
						color='#000'
						onPress={toggleCameraType}
					/>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cameraWrapper: {
		flex: 1,
		width: '100%',
	},
	camera: {
		flex: 1,
	},
	bottom: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#fff',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 20,
		margin: 10,
		borderRadius: 10,
	},
	submitButton: {
		width: 80,
		height: 80,
		backgroundColor: 'transparent',
		borderRadius: 100,
		borderColor: '#000',
		borderWidth: 5,
	},
	submmitButtonInner: {
		flex: 1,
		margin: 5,
		backgroundColor: '#000',
		borderRadius: 100,
	},
});
