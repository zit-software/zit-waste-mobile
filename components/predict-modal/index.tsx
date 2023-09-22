import { MaterialIcons } from '@expo/vector-icons';
import {
	ActivityIndicator,
	Image,
	ImageSourcePropType,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { getLabel } from '../../constants/labels';
import { DetectionResponse } from '../../services/waste.service';
import Button, { ButtonVariant } from '../button';
import { COLOR_PRIMARY } from '../../constants/colors';

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
								fontFamily: 'Montserrat_800ExtraBold',
								color: COLOR_PRIMARY,
							}}
						>
							{getLabel(prediected?.id).name}
						</Text>
					</Text>

					<View style={styles.predictPercent}>
						<Text
							style={{
								color: '#00601B',
								fontFamily: 'Montserrat_800ExtraBold',
							}}
						>
							{(prediected?.one_hot[prediected.id] * 100).toFixed(
								0,
							)}
							%
						</Text>
					</View>

					<View style={styles.buttons}>
						<Button
							title='Báo cáo'
							icon={
								<MaterialIcons
									name='bug-report'
									size={24}
									color='#000'
								/>
							}
							onPress={onOpenReportModal}
						/>
						<Button
							variant={ButtonVariant.contained}
							title='Đóng'
							icon={
								<MaterialIcons
									name='close'
									size={24}
									color='#fff'
								/>
							}
							onPress={onClosePredictModal}
						/>
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
		fontFamily: 'Montserrat_300Light',
	},
	buttons: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 5,
	},
	predictPercent: {
		alignSelf: 'center',
		width: 64,
		height: 64,
		borderRadius: 100,
		backgroundColor: '#00FF4730',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 20,
	},
});
