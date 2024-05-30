import { useState } from 'react'
import { View } from 'react-native'

import { cn } from '#/utils/misc'

import { Button } from './button'

export const EventFilters = () => {
	const [selectedFilter, setSelectedFilter] = useState<
		'all' | 'future' | 'past'
	>('all')

	return (
		<View className="flex w-full flex-row justify-center bg-primary pt-6 px-10">
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
					'h-8 w-1/3 mx-2',
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
	)
}
