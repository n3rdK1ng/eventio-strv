import { cn } from '@/utils/misc'
import {
	TouchableOpacity,
	type TouchableOpacityProps,
	View,
} from 'react-native'

import { Button } from './button'
import { UserIcon } from './svgs/user-icon'
import { Text } from './text'

type TEventCard = TouchableOpacityProps & {
	variant: 'small' | 'large'
}

export const EventCard = ({ variant, ...props }: TEventCard) => {
	return (
		<TouchableOpacity
			style={{
				shadowColor: '#000',
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.1,
				shadowRadius: 4,
				elevation: 4,
			}}
			className="w-full p-5 bg-secondary rounded-lg shadow-event"
			{...props}
		>
			<View className="flex flex-row justify-between grow-0 items-end">
				<View className="flex flex-col">
					<Text variant="bodyXSmall" className="mb-1 text-tertiary">
						April 4, 2017 – 2:17 PM
					</Text>
					<Text variant="bodyMedium" className="mb-1 text-primary">
						How to get angry
					</Text>
					<Text
						variant="bodySmall"
						className={cn('text-secondary', variant === 'large' && 'mb-6')}
					>
						Tom Watts
					</Text>
					{variant === 'large' && (
						<Text variant="bodyMedium" className="mb-8 text-primary">
							I will show you how to get angry in a second
						</Text>
					)}
				</View>
				{variant === 'small' && (
					<Button text="JOIN" variant="large" className="bg-tertiary px-8" />
				)}
			</View>
			<View
				className={cn(
					'flex flex-row',
					variant === 'large' && 'justify-between',
					variant === 'small' && 'justify-end',
				)}
			>
				{variant === 'large' && (
					<View className="flex flex-row items-center gap-2.5">
						<UserIcon className="text-secondary" />
						<Text variant="bodySmallMedium" className="text-secondary">
							9 of 31
						</Text>
					</View>
				)}
				{variant === 'large' && (
					<Button text="JOIN" variant="large" className="bg-tertiary px-8" />
				)}
			</View>
		</TouchableOpacity>
	)
}

//TODO: remove hard coded values
