import { ErrorBoundaryProps, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { View } from 'react-native'

import { CustomErrorBoundary } from '#/components/custom-error-boundary'
import { LoadingIndicator } from '#/components/loading-indicator'
import { useAuthContext } from '#/context/auth'

export function ErrorBoundary(props: ErrorBoundaryProps) {
	return <CustomErrorBoundary {...props} />
}

export default function Index() {
	const { user, isLoaded } = useAuthContext()
	const router = useRouter()

	const onLayoutRootView = useCallback(() => {
		if (isLoaded) {
			if (user) {
				router.replace('/dashboard')
			} else {
				router.replace('/sign-in')
			}
		}
	}, [isLoaded, user, router])

	if (!isLoaded) {
		return <LoadingIndicator />
	}

	return <View onLayout={onLayoutRootView} />
}
