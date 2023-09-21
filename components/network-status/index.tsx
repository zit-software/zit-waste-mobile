import { MaterialIcons } from '@expo/vector-icons';
import * as Network from 'expo-network';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function NetworkStatus() {
	const [isOnline, setIsOnline] = useState<boolean>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		Network.getNetworkStateAsync()
			.then((state) => {
				setIsOnline(state.isConnected);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<View>
			{isLoading ? (
				<ActivityIndicator size='large' />
			) : isOnline ? (
				<MaterialIcons name='wifi' color='green' size={20} />
			) : (
				<MaterialIcons name='wifi-off' color='red' size={20} />
			)}
		</View>
	);
}
