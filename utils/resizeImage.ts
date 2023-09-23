import { SaveFormat, manipulateAsync } from 'expo-image-manipulator';
import { ImageURISource } from 'react-native';

/**
 * Resize image
 * @param photo Image to resize
 * @param width Width to resize to
 * @returns {Promise<ImageURISource>} Resized image
 */
export default async function resizeImage(
	photo: ImageURISource,
	width: number = 500,
): Promise<ImageURISource> {
	return await manipulateAsync(photo.uri!, [{ resize: { width } }], {
		compress: 0.5,
		format: SaveFormat.JPEG,
	});
}
