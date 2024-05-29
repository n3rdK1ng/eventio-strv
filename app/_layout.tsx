import {
	Inter_100Thin,
	Inter_200ExtraLight,
	Inter_300Light,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_800ExtraBold,
	Inter_900Black,
} from '@expo-google-fonts/inter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { AuthProvider } from '#/context/auth'

import '../global.css'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded] = useFonts({
		Inter_100Thin,
		Inter_200ExtraLight,
		Inter_300Light,
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
		Inter_800ExtraBold,
		Inter_900Black,
	})

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Stack>
					<Stack.Screen
						name="(auth)"
						options={{ headerShown: false, navigationBarHidden: true }}
					/>
					<Stack.Screen
						name="(tabs)"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" options={{ headerShown: false }} />
				</Stack>
			</AuthProvider>
		</QueryClientProvider>
	)
}
