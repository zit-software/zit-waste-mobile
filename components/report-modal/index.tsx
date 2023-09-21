import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { CameraCapturedPicture } from 'expo-camera';
import { useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { COLOR_PRIMARY } from '../../constants/colors';
import { Label, labels } from '../../constants/labels';
import wasteService from '../../services/waste.service';
import Button from '../button';

export interface ReportModalProps {
	visible: boolean;
	photo: CameraCapturedPicture;
	onClose: () => void;
}

export default function ReportModal({
	visible,
	photo,
	onClose,
}: ReportModalProps) {
	const [selectedLabel, setSelectedLabel] = useState<Label>(labels[0]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		try {
			setIsLoading(true);
			const img = {
				uri: photo.uri,
				type: 'image/jpeg',
				name: 'photo.jpg',
			};

			const res = await wasteService.report(
				img as unknown as Blob,
				selectedLabel.id,
			);

			Alert.alert('Thành công', res.message);

			onClose();
		} catch (error) {
			Alert.alert('Lỗi', error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		visible && (
			<View style={styles.modal}>
				<View style={styles.container}>
					<Text style={styles.heading}>Báo cáo</Text>

					<Image style={styles.img} source={photo} />

					<ActivityIndicator
						animating={isLoading}
						size='large'
						color='#000'
					/>

					<Text style={styles.whatIsThis}>Đây là gì?</Text>

					<FlatList
						style={styles.items}
						horizontal
						data={labels}
						renderItem={({ item }) => {
							const style: any[] = [styles.item];

							if (item.id === selectedLabel.id) {
								style.push(styles.selected);
							}

							return (
								<Pressable
									style={style}
									key={item.id}
									onPress={() => setSelectedLabel(item)}
								>
									<Text
										style={{
											color: COLOR_PRIMARY,
											fontWeight: '700',
										}}
									>
										{item.name}
									</Text>
								</Pressable>
							);
						}}
					/>

					<Button
						icon={
							<MaterialCommunityIcons
								name='send'
								color='#fff'
								size={20}
							/>
						}
						backgroundColor={COLOR_PRIMARY}
						onPress={handleSubmit}
					>
						<Text style={{ color: '#fff' }}>Gửi</Text>
					</Button>

					<Button
						icon={<MaterialCommunityIcons name='close' size={20} />}
						backgroundColor='#00000020'
						onPress={onClose}
					>
						<Text>Đóng</Text>
					</Button>
				</View>
			</View>
		)
	);
}

const styles = StyleSheet.create({
	modal: {
		backgroundColor: '#fff',
		position: 'absolute',
		borderRadius: 20,
		bottom: 0,
		right: 0,
		left: 0,
		top: 0,
		padding: 10,
	},
	container: {
		gap: 10,
	},
	heading: {
		fontSize: 20,
		fontWeight: 'bold',
		borderBottomColor: '#ddd',
		borderBottomWidth: 1,
		paddingTop: 40,
		paddingBottom: 10,
		paddingHorizontal: 10,
		margin: -10,
	},
	img: {
		width: 250,
		height: 250,
		alignSelf: 'center',
		marginVertical: 20,
		objectFit: 'cover',
		borderRadius: 20,
	},
	whatIsThis: {
		fontSize: 18,
		fontWeight: '500',
		fontStyle: 'italic',
		marginBottom: 10,
	},
	items: {},
	item: {
		marginRight: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: `${COLOR_PRIMARY}20`,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: 'transparent',
	},
	selected: {
		borderColor: COLOR_PRIMARY,
	},
});
