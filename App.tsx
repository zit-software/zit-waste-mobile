import { MaterialIcons } from '@expo/vector-icons';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { useMemo, useRef, useState } from 'react';
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
	useWindowDimensions,
} from 'react-native';
import AppHeader from './components/app-header';
import Button from './components/button';
import NetworkStatus from './components/network-status';
import ReportModal from './components/report-modal';
import { getLabel } from './constants/labels';
import wasteService, { DetectionResponse } from './services/waste.service';
import { COLOR_PRIMARY } from './constants/colors';

export default function App() {
	const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const [photo, setPhoto] = useState<CameraCapturedPicture | null>();
	const [isOpenPredictModal, setIsOpenPredictModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [prediected, setPredicted] = useState<DetectionResponse | null>();
	const [isOpenReportModal, setIsOpenReportModal] = useState(false);
	const [isTakingPicture, setIsTakingPicture] = useState(false);

	const { width } = useWindowDimensions();

	const height = useMemo(() => Math.round(((width - 20) * 4) / 3), [width]);

	const cameraRef = useRef<Camera | null>();

	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return (
			<View style={styles.container}>
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
				>
					<Text>Cho phép</Text>
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
			setIsTakingPicture(true);
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
			setIsTakingPicture(false);
		}
	};

	return (
		<SafeAreaView style={[styles.container]}>
			<AppHeader />

			{isOpenPredictModal ? (
				<View style={styles.predictModal}>
					{photo && (
						<Image style={styles.predictImg} source={photo} />
					)}

					{isLoading ? (
						<>
							<ActivityIndicator size='large' color='#000' />
						</>
					) : (
						<>
							<Image
								style={styles.predictIcon}
								source={getLabel(prediected?.id).img}
							/>

							<Text style={styles.predictText}>
								Có thể đây là{' '}
								<Text
									style={{
										fontWeight: 'bold',
									}}
								>
									{getLabel(prediected?.id).name}
								</Text>
							</Text>

							<View style={styles.predicPercent}>
								<Text
									style={{
										color: '#00601B',
										fontWeight: 'bold',
									}}
								>
									{(
										prediected?.one_hot[prediected.id] * 100
									).toFixed(0)}
									%
								</Text>
							</View>

							<View style={styles.buttons}>
								<Button
									onPress={() => setIsOpenReportModal(true)}
								>
									<MaterialIcons
										name='bug-report'
										size={24}
										color='#000'
									/>
									<Text>Báo cáo</Text>
								</Button>
								<Button
									backgroundColor={COLOR_PRIMARY}
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
			) : (
				<>
					<View style={[styles.cameraWrapper]}>
						<View style={styles.camera}>
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
								<ActivityIndicator
									size={50}
									color='#fff'
									animating={isTakingPicture}
								/>
							</Camera>
						</View>
					</View>
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
								color={COLOR_PRIMARY}
								onPress={toggleCameraType}
							/>
						</Pressable>
					</View>
				</>
			)}

			<ReportModal
				visible={isOpenReportModal}
				photo={photo}
				onClose={() => setIsOpenReportModal(false)}
			></ReportModal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingHorizontal: 10,
	},
	cameraWrapper: {
		width: '100%',
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
	},
	camera: {
		width: '100%',
		overflow: 'hidden',
		borderRadius: 20,
	},
	bottom: {
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
		backgroundColor: COLOR_PRIMARY,
		borderRadius: 100,
	},
	predictModal: {
		paddingVertical: 40,
	},
	predictImg: {
		width: 250,
		height: 250,
		objectFit: 'cover',
		alignSelf: 'center',
		borderRadius: 20,
		marginVertical: 20,
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
	predicPercent: {
		alignSelf: 'center',
		width: 50,
		height: 50,
		borderRadius: 100,
		backgroundColor: '#00FF4720',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10,
	},
});
