import { Slot } from 'expo-router'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'

import { SafeAreaView } from '#/components/safe-area-view'

export default function AuthLayout() {
	return (
		<SafeAreaView backgroundColor="secondary">
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<ScrollView
					className="h-full w-full bg-secondary px-6"
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: 'flex-end',
					}}
					keyboardShouldPersistTaps="always"
				>
					<View className="h-full justify-between">
						<Slot />
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
