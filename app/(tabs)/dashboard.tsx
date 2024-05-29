import { useState } from 'react'
import { View } from 'react-native'

import { Button } from '#/components/button'
import { EventCard } from '#/components/event-card'
import { cn } from '#/utils/misc'

export default function DashboardRoute() {
	const [selectedFilter, setSelectedFilter] = useState<
		'all' | 'future' | 'past'
	>('all')

	return (
		<View className="flex h-full w-full flex-col items-center bg-primary px-4">
			<View className="mt-8 flex w-full flex-row justify-center gap-2 bg-primary px-2">
				<Button
					text="all"
					variant="large"
					textVariant="overlineSmall"
					className={cn(
						'h-8 w-1/3',
						selectedFilter === 'all' ? 'bg-brand-black' : 'bg-secondary',
					)}
					textColor={selectedFilter === 'all' ? 'primary-white' : 'tertiary'}
					onPress={() => setSelectedFilter('all')}
				/>
				<Button
					text="future"
					variant="large"
					textVariant="overlineSmall"
					className={cn(
						'h-8 w-1/3',
						selectedFilter === 'future' ? 'bg-brand-black' : 'bg-secondary',
					)}
					textColor={selectedFilter === 'future' ? 'primary-white' : 'tertiary'}
					onPress={() => setSelectedFilter('future')}
				/>
				<Button
					text="past"
					variant="large"
					textVariant="overlineSmall"
					className={cn(
						'h-8 w-1/3',
						selectedFilter === 'past' ? 'bg-brand-black' : 'bg-secondary',
					)}
					textColor={selectedFilter === 'past' ? 'primary-white' : 'tertiary'}
					onPress={() => setSelectedFilter('past')}
				/>
			</View>
			<View className="mt-10 w-full">
				<EventCard variant="large" />
			</View>
		</View>
	)
}

//TODO: add flashlist
