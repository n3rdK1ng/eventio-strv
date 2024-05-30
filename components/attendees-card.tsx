import { View } from 'react-native'

import { Text } from '#/components/text'
import { type TEvent, type TUser } from '#/utils/api/types'
import { cn } from '#/utils/misc'

type TAttendeesCard = {
	event: TEvent
	user: TUser
}

export const AttendeesCard = ({ event, user }: TAttendeesCard) => {
	const compareAttendees = (a: TUser, b: TUser) => {
		if (a.id === user.id) {
			return -1
		}
		if (b.id === user.id) {
			return 1
		}
		return 0
	}

	const sortedAttendees = [...event.attendees].sort(compareAttendees)

	return (
		<View
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
			className="rounded-lg bg-secondary p-5"
		>
			<Text variant="titleMedium" className="mb-6">
				Attendees
			</Text>
			<View className="flex w-[258px] flex-row flex-wrap gap-2">
				{sortedAttendees.map(attendee => (
					<View
						key={attendee.id}
						className={cn(
							'rounded-full bg-disabled px-3 py-[7px]',
							attendee.id === user.id && 'border border-tertiary bg-secondary',
						)}
					>
						<Text variant="bodySmall" className="text-secondary">
							{attendee.id !== user.id
								? `${attendee.firstName} ${attendee.lastName}`
								: 'You'}
						</Text>
					</View>
				))}
			</View>
		</View>
	)
}
