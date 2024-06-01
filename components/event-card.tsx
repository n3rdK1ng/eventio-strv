import { useRouter } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'

import { useAuthContext } from '#/context/auth'
import { TEvent } from '#/utils/api/types'
import { cn } from '#/utils/misc'

import { EventButton } from './event-button'
import { type TCardVariant } from './select-cards-variant'
import { UserIcon } from './svgs/user-icon'
import { Text } from './text'

type TEventCard = {
	variant: TCardVariant
	event: TEvent
	disabled?: boolean
}

export const EventCard = ({ variant, event, disabled }: TEventCard) => {
	const { user } = useAuthContext()
	const router = useRouter()

	if (!user) {
		router.replace('/sign-in')
		return null
	}

	const handleButtonVariant = () => {
		if (event.attendees.some(attendee => attendee.id === user.id)) {
			return 'leave'
		} else if (event.ownerId === user.id) {
			return 'edit'
		} else {
			return 'join'
		}
	}

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
				elevation: 3,
			}}
			className="shadow-event mx-4 my-2 rounded-lg bg-secondary p-5"
			onPress={() => router.push('/' + event.id)}
			disabled={disabled}
		>
			<View className="flex grow-0 flex-row items-end justify-between">
				<View className="flex flex-col">
					<Text variant="bodyXSmall" className="mb-1 text-tertiary">
						{new Date(event.startsAt).toLocaleString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric',
							hour: 'numeric',
							minute: 'numeric',
						})}
					</Text>
					<Text variant="bodyMedium" className="mb-1 text-primary">
						{event.title}
					</Text>
					<Text
						variant="bodySmall"
						className={cn('text-secondary', variant === 'large' && 'mb-6')}
					>
						{event.owner.firstName} {event.owner.lastName}
					</Text>
					{variant === 'large' && (
						<Text variant="bodyMedium" className="mb-8 text-primary">
							{event.description}
						</Text>
					)}
				</View>
				{variant === 'small' && (
					<EventButton event={event} variant={handleButtonVariant()} />
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
							{event.attendees.length} of {event.capacity}
						</Text>
					</View>
				)}
				{variant === 'large' && (
					<EventButton event={event} variant={handleButtonVariant()} />
				)}
			</View>
		</TouchableOpacity>
	)
}
