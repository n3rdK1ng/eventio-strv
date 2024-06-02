import { useGlobalSearchParams, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { View } from 'react-native'

import { cn } from '#/utils/misc'

import { Button } from './button'

type TFilterButton = {
	filter: 'all' | 'future' | 'past'
	currentFilter: 'all' | 'future' | 'past'
	onPress: () => void
}

export type TFilter = 'all' | 'future' | 'past'

const FilterButton = ({ filter, currentFilter, onPress }: TFilterButton) => (
	<Button
		text={filter}
		variant="large"
		textVariant="overlineSmall"
		className={cn(
			filter === 'future' ? 'mx-2 h-8 w-1/3' : 'h-8 w-1/3',
			currentFilter === filter ? 'bg-brand-black' : 'bg-secondary',
		)}
		textColor={currentFilter === filter ? 'primary-white' : 'tertiary'}
		onPress={onPress}
	/>
)

export const EventFilters = () => {
	const router = useRouter()
	const { eventFilter } = useGlobalSearchParams() as {
		eventFilter: TFilter
	}

	useEffect(() => {
		if (!eventFilter) {
			router.setParams({
				eventFilter: 'all',
			})
		}
	}, [])

	const handlePress = (filter: TFilter) => () => {
		router.setParams({
			eventFilter: filter,
		})
	}

	return (
		<View className="flex w-full flex-row justify-center bg-primary px-10 pt-6">
			{(['all', 'future', 'past'] as const).map(filter => (
				<FilterButton
					key={filter}
					filter={filter}
					currentFilter={eventFilter}
					onPress={handlePress(filter)}
				/>
			))}
		</View>
	)
}
