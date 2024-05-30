import { useRouter } from 'expo-router'
import { View } from 'react-native'

import { Button } from '#/components/button'
import { SafeAreaView } from '#/components/safe-area-view'
import { ErrorIcon } from '#/components/svgs/error-icon'
import { Text } from '#/components/text'

export default function NotFoundScreen() {
	const router = useRouter()

	return (
		<SafeAreaView backgroundColor={'secondary'}>
			<View className="flex h-full w-full flex-col-reverse justify-between bg-secondary px-6">
				<Button
					text="Try again"
					className="mb-6 bg-brand-black"
					onPress={() => router.replace('/')}
				/>
				<View className="flex h-full flex-col items-center justify-center">
					<View className="mb-[30px] rounded-full bg-primary p-6">
						<ErrorIcon />
					</View>
					<Text variant="titleLarge" className="mb-3">
						Something went wrong
					</Text>
					<Text>Something went wrong, please try it again.</Text>
				</View>
			</View>
		</SafeAreaView>
	)
}
