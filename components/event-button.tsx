import { useEventJoin } from '#/hooks/use-event-join'
import { useEventLeave } from '#/hooks/use-event-leave'
import { cn } from '#/utils/misc'

import { Button } from './button'

type TEventButton = {
	variant: 'join' | 'leave' | 'edit'
	eventId: string
}
export const EventButton = ({ variant, eventId }: TEventButton) => {
	const { isJoining, joinEvent } = useEventJoin(eventId)
	const { isLeaving, leaveEvent } = useEventLeave(eventId)

	const loading = isJoining || isLeaving

	return (
		<Button
			text={(!loading ? variant : 'Loading...').toUpperCase()}
			variant="large"
			className={cn(
				'w-24 px-0 text-primary-white',
				{
					'bg-brand-green': variant === 'join',
					'bg-error': variant === 'leave',
					'bg-disabled text-tertiary': variant === 'edit',
				},
				loading && 'opacity-50',
			)}
			onPress={async () => {
				switch (variant) {
					case 'join':
						await joinEvent()
						break
					case 'leave':
						await leaveEvent()
						break
					case 'edit':
						console.log('edit')
						break
				}
			}}
			disabled={loading}
		/>
	)
}
