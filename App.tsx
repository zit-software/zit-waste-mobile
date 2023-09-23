import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import loadFonts from './utils/loadFonts';
import MainView from './views/main';
import { COLOR_PRIMARY } from './constants/colors';

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
			<StatusBar animated />
			<MainView />
		</SafeAreaProvider>
	);
}
