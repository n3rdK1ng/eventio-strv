import {
	ErrorBoundaryProps,
	useLocalSearchParams,
	useRouter,
} from 'expo-router'
import { View } from 'react-native'

import { AttendeesCard } from '#/components/attendees-card'
import { CustomErrorBoundary } from '#/components/custom-error-boundary'
import { EventCard } from '#/components/event-card'
import { useAuthContext } from '#/context/auth'
import { useEvents } from '#/hooks/use-events'

export function ErrorBoundary(props: ErrorBoundaryProps) {
	return <CustomErrorBoundary {...props} />
}

export default function EventRoute() {
	const router = useRouter()
	const { user } = useAuthContext()
	const { data } = useEvents()
	const { event: eventId } = useLocalSearchParams()

	const event = data.find(e => e.id === eventId)

	if (!event) throw new Error('Event not found')
	if (!user) {
		router.replace('/sign-in')
		return null
	}

	return (
		<View className="h-full w-full bg-primary pt-4">
			<EventCard variant="large" event={event} disabled />
			<View className="mt-2 px-4">
				<AttendeesCard event={event} user={user} />
			</View>
		</View>
	)
}
