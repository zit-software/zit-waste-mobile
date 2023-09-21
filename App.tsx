import { MaterialIcons } from '@expo/vector-icons';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	Image,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Button from './components/button';
import NetworkStatus from './components/network-status';
import { getLabel } from './constants/labels';
import wasteService, { DetectionResponse } from './services/waste.service';

export default function App() {
	const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const [photo, setPhoto] = useState<CameraCapturedPicture | null>();
	const [isOpenPredictModal, setIsOpenPredictModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [prediected, setPredicted] = useState<DetectionResponse | null>();

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
				<Button
					onPress={requestPermission}
					icon={<MaterialIcons name='camera' />}
				>
					<Text>grant permission</Text>
				</Button>
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

			setIsLoading(true);
			setIsOpenPredictModal(true);
			setPhoto(photo);

			const img = {
				type: 'image/jpeg',
				uri: photo.uri,
				name: 'photo.jpg',
			};

			const res = await wasteService.detect(img as unknown as Blob);

			setPredicted(res);
		} catch (error) {
			Alert.alert('Lỗi', error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.cameraWrapper}>
				<Camera style={styles.camera} type={type} ref={cameraRef} />
			</SafeAreaView>

			<View style={styles.bottom}>
				<NetworkStatus />
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

			{isOpenPredictModal && (
				<View style={styles.predictModal}>
					{isLoading ? (
						<>
							<ActivityIndicator size='large' color='#000' />
						</>
					) : (
						<>
							<Image style={styles.predictImg} source={photo} />
							<Image
								style={styles.predictIcon}
								source={getLabel(prediected.id).img}
							/>

							<Text style={styles.predictText}>
								Có thể đây là{' '}
								<Text
									style={{
										fontWeight: 'bold',
									}}
								>
									{getLabel(prediected.id).name}
								</Text>
							</Text>

							<View
								style={{
									alignSelf: 'center',
									width: 50,
									height: 50,
									borderRadius: 100,
									backgroundColor: '#00FF4720',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									marginVertical: 10,
								}}
							>
								<Text
									style={{
										color: '#00601B',
										fontWeight: 'bold',
									}}
								>
									{(
										prediected.one_hot[prediected.id] * 100
									).toFixed(0)}
									%
								</Text>
							</View>

							<View style={styles.buttons}>
								<Button>
									<MaterialIcons
										name='bug-report'
										size={24}
										color='#000'
									/>
									<Text>Báo lỗi</Text>
								</Button>
								<Button
									backgroundColor='#000'
									onPress={() => setIsOpenPredictModal(false)}
								>
									<MaterialIcons
										name='close'
										size={24}
										color='#fff'
									/>
									<Text style={{ color: '#fff' }}>Đóng</Text>
								</Button>
							</View>
						</>
					)}
				</View>
			)}
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
		alignItems: 'center',
		padding: 20,
		margin: 10,
		borderRadius: 20,
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
	predictModal: {
		position: 'absolute',
		left: 0,
		right: 0,
		padding: 20,
		backgroundColor: '#fff',
		margin: 10,
		borderRadius: 20,
		bottom: 0,
		zIndex: 1,
		minHeight: 300,
	},
	predictImg: {
		width: 200,
		height: 200,
		objectFit: 'cover',
		alignSelf: 'center',
		borderRadius: 20,
		marginVertical: 10,
	},
	predictIcon: {
		width: 100,
		height: 100,
		alignSelf: 'center',
		objectFit: 'contain',
	},
	predictText: {
		textAlign: 'center',
		fontSize: 20,
		marginVertical: 10,
	},
	buttons: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 5,
	},
});
