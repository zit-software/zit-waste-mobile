import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants/colors';
import NetworkStatus from '../network-status';

export interface AppActionsProps {
	takePicture?: () => void;
	toggleCameraType?: () => void;
}

export default function AppActions({
	takePicture,
	toggleCameraType,
}: AppActionsProps) {
	return (
		<View style={styles.container}>
			<NetworkStatus />
			<TouchableOpacity style={styles.submitButton} onPress={takePicture}>
				<View style={styles.submmitButtonInner}></View>
			</TouchableOpacity>

			<Pressable onPress={toggleCameraType}>
				<MaterialIcons
					name='flip-camera-android'
					size={24}
					color={COLOR_PRIMARY}
				/>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
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
});
