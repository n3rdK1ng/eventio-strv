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
import { config } from '@gluestack-ui/config'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Stack, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import 'react-native-reanimated'

import { ArrowIcon } from '#/components/svgs/arrow-icon'
import { Text } from '#/components/text'
import { AuthProvider } from '#/context/auth'

import '../global.css'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const router = useRouter()
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
		<GluestackUIProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<StatusBar style="dark" />
					<Stack
						screenOptions={{
							headerShadowVisible: false,
							headerStyle: {
								backgroundColor: '#F9F9FB',
							},
						}}
					>
						<Stack.Screen
							name="(auth)"
							options={{
								headerShown: false,
								navigationBarHidden: true,
								gestureEnabled: false,
							}}
						/>
						<Stack.Screen
							name="(tabs)"
							options={{
								headerShown: false,
								gestureEnabled: false,
							}}
						/>
						<Stack.Screen
							name="[event]"
							options={{
								headerTitle: () => (
									<Text variant="bodyLarge">Event Details</Text>
								),
								headerLeft: () => {
									return (
										<TouchableOpacity
											onPress={() => router.back()}
											className="pl-0"
										>
											<ArrowIcon className="text-primary" />
										</TouchableOpacity>
									)
								},
								headerTitleAlign: 'center',
								headerShown: true,
								headerBackVisible: false,
							}}
						/>
						<Stack.Screen name="index" options={{ headerShown: false }} />
						<Stack.Screen name="+not-found" options={{ headerShown: false }} />
					</Stack>
				</AuthProvider>
			</QueryClientProvider>
		</GluestackUIProvider>
	)
}
