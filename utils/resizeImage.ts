import { SaveFormat, manipulateAsync } from 'expo-image-manipulator';
import { ImageURISource } from 'react-native';

export default async function resizeImage(
	photo: ImageURISource,
	width: number = 500,
) {
	return await manipulateAsync(photo.uri!, [{ resize: { width } }], {
		compress: 0.5,
		format: SaveFormat.JPEG,
	});
}
