import { LoadingIndicator } from '@/components/loading-indicator'
import { useAuthContext } from '@/context/auth'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { View } from 'react-native'

export default function Index() {
	const { user, isLoaded } = useAuthContext()
	const router = useRouter()

	useEffect(() => {
		if (isLoaded) {
			setTimeout(() => {
				if (user) {
					router.push('/dashboard')
				} else {
					router.push('/sign-in')
				}
			}, 0)
		}
	}, [isLoaded, user, router])

	if (!isLoaded) {
		return (
			<View className="h-full w-full flex-col items-center justify-center">
				<LoadingIndicator />
			</View>
		)
	}

	return null
}
