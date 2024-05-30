import { useRouter } from 'expo-router'
import { useCallback } from 'react'
import { View } from 'react-native'

import { LoadingIndicator } from '#/components/loading-indicator'
import { useAuthContext } from '#/context/auth'

export default function Index() {
	const { user, isLoaded } = useAuthContext()
	const router = useRouter()

	const onLayoutRootView = useCallback(() => {
		if (isLoaded) {
			if (user) {
				router.push('/dashboard')
			} else {
				router.push('/sign-in')
			}
		}
	}, [isLoaded, user, router])

	if (!isLoaded) {
		return <LoadingIndicator />
	}

	return <View onLayout={onLayoutRootView} />
}
