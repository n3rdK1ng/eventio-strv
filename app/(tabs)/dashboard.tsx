import { Button } from '@/components/button'
import { EventCard } from '@/components/event-card'
import { cn } from '@/utils/misc'
import { useState } from 'react'
import { View } from 'react-native'

export default function DashboardRoute() {
	const [selectedFilter, setSelectedFilter] = useState<
		'all' | 'future' | 'past'
	>('all')

	return (
		<View className="w-full h-full flex flex-col items-center bg-primary px-4">
			<View className="flex flex-row justify-center w-full bg-primary gap-2 mt-8 px-2">
				<Button
					text="all"
					variant="large"
					textVariant="overlineSmall"
					className={cn(
						'w-1/3 h-8',
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
						'w-1/3 h-8',
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
						'w-1/3 h-8',
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
