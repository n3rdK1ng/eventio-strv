import { FlashList } from '@shopify/flash-list'
import { useGlobalSearchParams, usePathname } from 'expo-router'
import { useMemo } from 'react'
import { View } from 'react-native'

import { useAuthContext } from '#/context/auth'
import { useEvents } from '#/hooks/use-events'
import { cn } from '#/utils/misc'

import { EventCard } from './event-card'
import { type TFilter } from './event-filters'
import { LoadingIndicator } from './loading-indicator'
import { type TCardVariant } from './select-cards-variant'

export const EventList = () => {
	const path = usePathname()
	const { selectedCardVariant, eventFilter } = useGlobalSearchParams() as {
		selectedCardVariant: TCardVariant
		eventFilter: TFilter
	}
	const { user } = useAuthContext()
	const { loading, data } = useEvents()

	const filteredData = useMemo(() => {
		// sort the data by date
		const sortedData = [...data].sort(
			(a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
		)

		if (path === '/profile') {
			return sortedData.filter(
				event =>
					event.attendees.some(attendee => attendee.id === user?.id) ||
					event.ownerId === user?.id,
			)
		}

		switch (eventFilter) {
			case 'all':
				return sortedData
			case 'future':
				return sortedData.filter(
					event => new Date(event.startsAt).getTime() > new Date().getTime(),
				)
			case 'past':
				return sortedData.filter(
					event => new Date(event.startsAt).getTime() < new Date().getTime(),
				)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, path, eventFilter, selectedCardVariant, user])

	if (!user) {
		return null
	}

	if (loading) {
		return <LoadingIndicator />
	}

	return (
		<View className={cn('h-full w-full', path !== '/profile' && 'mt-4')}>
			<FlashList
				contentContainerStyle={{
					paddingBottom: path !== '/profile' ? 100 : 350,
				}}
				data={filteredData}
				renderItem={({ item }) => (
					<EventCard key={item.id} variant={selectedCardVariant} event={item} />
				)}
				estimatedItemSize={selectedCardVariant === 'large' ? 240 : 122}
			/>
		</View>
	)
}
