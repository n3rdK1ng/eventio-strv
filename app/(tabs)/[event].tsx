import {
	ErrorBoundaryProps,
	useLocalSearchParams,
	useNavigation,
	useRouter,
} from 'expo-router'
import { useEffect } from 'react'
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

export function ErrorBoundary(props: ErrorBoundaryProps) {
	return <CustomErrorBoundary {...props} />
}

export default function EventRoute() {
	const router = useRouter()
	const navigation = useNavigation()
	const { user } = useAuthContext()
	const { data } = useEvents()
	const { event: eventId } = useLocalSearchParams()
	const { deleteEvent, loading } = useDeleteEvent(eventId as string)

	const event = data.find(e => e.id === eventId)

	useEffect(() => {
		if (event && user && event.ownerId === user.id) {
			navigation.setOptions({
				headerRight: () => (
					<View className="mr-6">
						{Platform.OS === 'ios' ? (
							<ActionSheetIos
								title="Event Settings"
								options={['Edit Event', 'Delete']}
								onOptionPress={(index: number) => {
									if (index === 0) {
										router.push({
											pathname: 'edit-event',
											params: { event: event.id },
										})
									} else if (index === 1) {
										deleteEvent()
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
								destructiveFunction={() => deleteEvent()}
							/>
						)}
					</View>
				),
			})
		}
	}, [navigation, event, user])

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
