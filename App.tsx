import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import loadFonts from './utils/loadFonts';
import MainView from './views/main';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		loadFonts().then(() => {
			setIsReady(true);
			SplashScreen.hideAsync();
		});
	}, []);

	if (!isReady) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<MainView />
		</SafeAreaProvider>
	);
}
