import { Image, StyleSheet, Text, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants/colors';

export default function AppHeader() {
	return (
		<View style={styles.container}>
			<View style={styles.inner}>
				<Image
					style={styles.logo}
					source={require('../../assets/icon.png')}
				/>
				<Text style={styles.text}>Zit Waste</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
	},
	inner: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 15,
	},
	logo: {
		width: 45,
		height: 45,
		objectFit: 'contain',
	},
	text: {
		fontSize: 24,
		color: COLOR_PRIMARY,
		fontFamily: 'Montserrat_800ExtraBold',
	},
});
