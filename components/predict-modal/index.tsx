import { MaterialIcons } from '@expo/vector-icons';
import {
	ActivityIndicator,
	Image,
	ImageSourcePropType,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { COLOR_PRIMARY } from '../../constants/colors';
import { getLabel } from '../../constants/labels';
import { DetectionResponse } from '../../services/waste.service';
import Button from '../button';

export interface PredictModalProps {
	photo: ImageSourcePropType;
	loading?: boolean;
	prediected: DetectionResponse | null;
	onOpenReportModal?: () => void;
	onClosePredictModal?: () => void;
}

export default function PredictModal({
	photo,
	loading,
	prediected,
	onOpenReportModal,
	onClosePredictModal,
}: PredictModalProps) {
	return (
		<View style={styles.predictModal}>
			{photo && <Image style={styles.predictImg} source={photo} />}

			{loading ? (
				<ActivityIndicator size='large' color='#000' />
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

					<View style={styles.predictPercent}>
						<Text
							style={{
								color: '#00601B',
								fontWeight: 'bold',
							}}
						>
							{(prediected?.one_hot[prediected.id] * 100).toFixed(
								0,
							)}
							%
						</Text>
					</View>

					<View style={styles.buttons}>
						<Button onPress={onOpenReportModal}>
							<MaterialIcons
								name='bug-report'
								size={24}
								color='#000'
							/>
							<Text>Báo cáo</Text>
						</Button>
						<Button
							backgroundColor={COLOR_PRIMARY}
							onPress={onClosePredictModal}
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
	);
}

const styles = StyleSheet.create({
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
	predictPercent: {
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
