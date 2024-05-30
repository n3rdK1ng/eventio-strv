import { useGlobalSearchParams, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { cn } from '#/utils/misc'

import { GridIcon } from './svgs/grid-icon'
import { LinesIcon } from './svgs/lines-icon'

export const SelectCardsVariant = () => {
	const router = useRouter()
	const globalParams = useGlobalSearchParams()

	useEffect(() => {
		if (!globalParams.selectedCardVariant) {
			router.setParams({
				selectedCardVariant: 'large',
			})
		}
	})

	const handlePress = (variant: 'large' | 'small') => () => {
		router.setParams({
			selectedCardVariant: variant,
		})
	}

	return (
		<View className="flex flex-row gap-3 pr-6">
			<TouchableOpacity onPress={handlePress('large')}>
				<GridIcon
					className={cn(
						globalParams.selectedCardVariant === 'large'
							? 'text-primary'
							: 'text-tertiary',
					)}
				/>
			</TouchableOpacity>
			<TouchableOpacity onPress={handlePress('small')}>
				<LinesIcon
					className={cn(
						globalParams.selectedCardVariant === 'small'
							? 'text-primary'
							: 'text-tertiary',
					)}
				/>
			</TouchableOpacity>
		</View>
	)
}
