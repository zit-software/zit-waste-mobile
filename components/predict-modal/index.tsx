import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import {
	ActivityIndicator,
	Animated,
	Image,
	ImageSourcePropType,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { COLOR_DANGER, COLOR_PRIMARY } from '../../constants/colors';
import { getLabel } from '../../constants/labels';
import { DetectionResponse } from '../../services/waste.service';
import Button, { ButtonVariant } from '../button';

export interface PredictModalProps {
	photo: ImageSourcePropType;
	loading?: boolean;
	prediected: DetectionResponse | null;
	error?: string;
	onOpenReportModal?: () => void;
	onClosePredictModal?: () => void;
}

export default function PredictModal({
	photo,
	loading,
	prediected,
	error,
	onOpenReportModal,
	onClosePredictModal,
}: PredictModalProps) {
	const marginTopAnimate = useRef(new Animated.Value(1)).current;

	const marginTop = marginTopAnimate.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 100],
	});

	useEffect(() => {
		loading
			? Animated.spring(marginTopAnimate, {
					toValue: 1,
					useNativeDriver: true,
			  }).start()
			: Animated.spring(marginTopAnimate, {
					toValue: 0,
					useNativeDriver: true,
			  }).start();
	}, [loading]);

	return (
		<Animated.View
			style={{
				transform: [
					{
						translateY: marginTop,
					},
				],
			}}
		>
			{photo && <Image style={styles.predictImg} source={photo} />}

			{loading ? (
				<ActivityIndicator size='large' color='#000' />
			) : (
				<>
					{error ? (
						<View>
							<Text style={styles.error}>{error}</Text>
						</View>
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
									{(
										prediected?.one_hot[prediected.id] * 100
									).toFixed(0)}
									%
								</Text>
							</View>
						</>
					)}
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
		</Animated.View>
	);
}

const styles = StyleSheet.create({
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
	error: {
		color: COLOR_DANGER,
		fontFamily: 'Montserrat_500Medium',
		textAlign: 'center',
		justifyContent: 'center',
		fontSize: 20,
		marginBottom: 20,
	},
});
