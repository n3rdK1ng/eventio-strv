import { FlashList } from '@shopify/flash-list'
import { useGlobalSearchParams, useRouter } from 'expo-router'
import { memo } from 'react'
import { View } from 'react-native'

import { useAuthContext } from '#/context/auth'
import { useEvents } from '#/hooks/use-events'
import { cn } from '#/utils/misc'

import { EventCard } from './event-card'
import { LoadingIndicator } from './loading-indicator'

type TEventList = {
	variant: 'all' | 'profile'
}

export const EventListComponent = ({ variant }: TEventList) => {
	const router = useRouter()
	const { selectedCardVariant } = useGlobalSearchParams() as {
		selectedCardVariant: 'large' | 'small'
	}
	const { user } = useAuthContext()
	const { loading, data } = useEvents()

	if (!user) {
		router.replace('/sign-in')
		return null
	}

	if (loading) {
		return <LoadingIndicator />
	}

	const handleVariantFilter = () => {
		if (variant === 'all') {
			return data.toReversed()
		} else {
			return data
				.toReversed()
				.filter(event =>
					event.attendees.some(attendee => attendee.id === user.id),
				)
		}
	}

	return (
		<View
			className={cn(
				'h-full w-full',
				variant === 'all' && 'mt-4 pb-24',
				variant === 'profile' && 'pb-80',
			)}
		>
			<FlashList
				data={handleVariantFilter()}
				renderItem={({ item }) => (
					<EventCard key={item.id} variant={selectedCardVariant} event={item} />
				)}
				estimatedItemSize={selectedCardVariant === 'large' ? 240 : 122}
			/>
		</View>
	)
}

export const EventList = memo(EventListComponent)
