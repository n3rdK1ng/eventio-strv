import {
	ErrorBoundaryProps,
	useFocusEffect,
	useLocalSearchParams,
	useNavigation,
	useRouter,
} from 'expo-router'
import { useCallback, useEffect } from 'react'
import { Platform, View } from 'react-native'

import { ActionSheetAndroid } from '#/components/action-sheet-android'
import { ActionSheetIos } from '#/components/action-sheet-ios'
import { AttendeesCard } from '#/components/attendees-card'
import { CustomErrorBoundary } from '#/components/custom-error-boundary'
import { EventCard } from '#/components/event-card'
import { LoadingIndicator } from '#/components/loading-indicator'
import { useAuthContext } from '#/context/auth'
import { useDeleteEvent } from '#/hooks/use-delete-event'
import { useEvents } from '#/hooks/use-events'
import { useRefreshEvent } from '#/hooks/use-refresh-event'

export function ErrorBoundary(props: ErrorBoundaryProps) {
	return <CustomErrorBoundary {...props} />
}

export default function EventRoute() {
	const router = useRouter()
	const navigation = useNavigation()
	const { event: eventId } = useLocalSearchParams()
	const { user } = useAuthContext()
	const { data } = useEvents()
	const { refreshEvent } = useRefreshEvent(eventId as string)
	const { deleteEvent, loading } = useDeleteEvent(eventId as string)

	const event = data.find(e => e.id === eventId)

	useFocusEffect(
		useCallback(() => {
			refreshEvent()
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []),
	)

	useEffect(() => {
		if (event && user && event.ownerId === user.id) {
			navigation.setOptions({
				headerRight: () => (
					<View className="mr-6">
						{Platform.OS === 'ios' ? (
							<ActionSheetIos
								title="Event Settings"
								options={['Edit Event', 'Delete']}
								onOptionPress={async (index: number) => {
									if (index === 0) {
										router.push({
											pathname: 'edit-event',
											params: { event: event.id },
										})
									} else if (index === 1) {
										await deleteEvent()
									}
								}}
							/>
						) : (
							<ActionSheetAndroid
								title="Event Settings"
								destructiveText="Delete"
								editText="Edit event"
								editFunction={() =>
									router.push({
										pathname: 'edit-event',
										params: { event: event.id },
									})
								}
								destructiveFunction={async () => await deleteEvent()}
							/>
						)}
					</View>
				),
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigation, event, user, router])

	useEffect(() => {
		if (!event) {
			router.replace('/dashboard')
		} else if (!user) {
			router.replace('/sign-in')
		}
	}, [event, user, router])

	if (!event || !user) {
		return null
	}

	if (loading) {
		return <LoadingIndicator />
	}

	return (
		<View className="h-full w-full bg-primary pt-4">
			<View>
				<EventCard variant="large" event={event} disabled />
				{event.attendees.length > 0 && (
					<View className="mt-2 px-4">
						<AttendeesCard event={event} user={user} />
					</View>
				)}
			</View>
		</View>
	)
}
