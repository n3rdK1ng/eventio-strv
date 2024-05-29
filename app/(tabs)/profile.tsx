import { useRouter } from 'expo-router'
import { View } from 'react-native'

import { Button } from '#/components/button'
import { useAuthContext } from '#/context/auth'

export default function ProfileRoute() {
	const { user, destroySession } = useAuthContext()
	const router = useRouter()

	return (
		<View className="flex h-full w-full flex-col items-center justify-center gap-4 px-6">
			<Button
				onPress={() => {
					console.log(user)
				}}
				text={'Details'}
				className="w-full bg-brand-green"
			/>
			<Button
				onPress={() => {
					destroySession()
					router.push('/sign-in')
				}}
				text={'Sign Out'}
				className="w-full bg-brand-black"
			/>
		</View>
	)
}
