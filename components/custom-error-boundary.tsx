import { ErrorBoundaryProps } from 'expo-router'
import { View } from 'react-native'

import { Button } from './button'
import { SafeAreaView } from './safe-area-view'
import { ErrorIcon } from './svgs/error-icon'
import { Text } from './text'

export const CustomErrorBoundary = (props: ErrorBoundaryProps) => (
	<SafeAreaView backgroundColor={'secondary'}>
		<View className="flex h-full w-full flex-col-reverse justify-between bg-secondary px-6">
			<Button
				text="Try again"
				className="mb-6 bg-brand-black"
				onPress={props.retry}
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
