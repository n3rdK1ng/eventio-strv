import { Slot } from 'expo-router'
import { View } from 'react-native'

import { SafeAreaView } from '#/components/safe-area-view'

export default function AuthLayout() {
	return (
		<SafeAreaView backgroundColor="secondary">
			<View className="flex h-full w-full flex-col items-center justify-between bg-secondary px-6">
				<Slot />
			</View>
		</SafeAreaView>
	)
}
