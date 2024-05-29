import { useRouter } from 'expo-router'
import { View } from 'react-native'

import { Button } from '#/components/button'
import { useAuthContext } from '#/context/auth'

export default function ProfileRoute() {
	const { user, destroySession } = useAuthContext()
	const router = useRouter()

	return (
		<View className="w-full h-full flex justify-center flex-col items-center px-6 gap-4">
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
