import { CameraCapturedPicture, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppActions from '../../components/app-actions';
import AppCamera, { AppCameraRef } from '../../components/app-camera';
import AppHeader from '../../components/app-header';
import PredictModal from '../../components/predict-modal';
import ReportModal from '../../components/report-modal';
import wasteService, { DetectionResponse } from '../../services/waste.service';

export default function MainView() {
	const [cameraType, setCameraType] = useState(CameraType.back);
	const [photo, setPhoto] = useState<CameraCapturedPicture | null>();
	const [isOpenPredictModal, setIsOpenPredictModal] = useState(false);
	const [isPrediction, setIsPrediction] = useState(false);
	const [prediected, setPredicted] = useState<DetectionResponse | null>();
	const [isOpenReportModal, setIsOpenReportModal] = useState(false);
	const [isTakingPicture, setIsTakingPicture] = useState(false);

	const cameraRef = useRef<AppCameraRef | null>();

	function toggleCameraType() {
		setCameraType((current) =>
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

			return photo;
		} catch (error) {
			Alert.alert('Lỗi chụp hình', error.message);
		} finally {
			setIsTakingPicture(false);
		}
	};

	const hanleSubmit = async () => {
		try {
			const photo = await takePicture();
			setPhoto(photo);

			setIsPrediction(true);
			setIsOpenPredictModal(true);

			const img = {
				type: 'image/jpeg',
				uri: photo.uri,
				name: 'photo.jpg',
			};

			const res = await wasteService.detect(img as unknown as Blob);

			setPredicted(res);
		} catch (error) {
			Alert.alert('Lỗi dự đoán', error.message);
		} finally {
			setIsPrediction(false);
		}
	};

	return (
		<SafeAreaView style={[styles.container]}>
			<AppHeader />

			<View
				style={[
					styles.cameraWrapper,
					{
						display: isOpenPredictModal ? 'none' : 'flex',
					},
				]}
			>
				<View style={styles.camera}>
					<AppCamera
						ref={cameraRef}
						loading={isTakingPicture}
						type={cameraType}
					/>
				</View>
			</View>

			{isOpenPredictModal ? (
				<PredictModal
					photo={photo}
					prediected={prediected}
					loading={isPrediction}
					onClosePredictModal={() => setIsOpenPredictModal(false)}
					onOpenReportModal={() => setIsOpenReportModal(true)}
				/>
			) : (
				<AppActions
					takePicture={hanleSubmit}
					toggleCameraType={toggleCameraType}
				/>
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
});