import { Slot } from 'expo-router'
import { View } from 'react-native'

import { SafeAreaView } from '#/components/safe-area-view'

export default function AuthLayout() {
	return (
		<SafeAreaView backgroundColor="secondary">
			<View className="w-full px-6 h-full flex flex-col justify-between items-center bg-secondary">
				<Slot />
			</View>
		</SafeAreaView>
	)
}
