import { View } from 'react-native'

import { Button } from '#/components/button'
import { SafeAreaView } from '#/components/safe-area-view'
import { ErrorIcon } from '#/components/svgs/error-icon'
import { Text } from '#/components/text'

export default function NotFoundScreen() {
	return (
		<SafeAreaView backgroundColor={'secondary'}>
			<View className="bg-secondary w-full h-full px-6 flex flex-col-reverse justify-between">
				<Button text="Try again" className="bg-brand-black mb-6" />
				<View className="flex flex-col items-center h-full justify-center">
					<View className="p-6 bg-primary rounded-full mb-[30px]">
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
