import { usePathname, useRouter } from 'expo-router'

import { useEventJoin } from '#/hooks/use-event-join'
import { useEventLeave } from '#/hooks/use-event-leave'
import { TEvent } from '#/utils/api/types'
import { cn } from '#/utils/misc'

import { Button } from './button'

type TEventButton = {
	variant: 'join' | 'leave' | 'edit'
	event: TEvent
}
export const EventButton = ({ variant, event }: TEventButton) => {
	const router = useRouter()
	const path = usePathname()
	const { isJoining, joinEvent } = useEventJoin(event.id)
	const { isLeaving, leaveEvent } = useEventLeave(event.id)

	const loading = isJoining || isLeaving

	if (path !== '/dashboard' && path !== '/profile' && variant === 'edit') {
		return null
	}
	if (variant !== 'edit' && new Date(event.startsAt) < new Date()) return null

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
						router.push({
							pathname: 'edit-event',
							params: { event: event.id },
						})
						break
				}
			}}
			disabled={loading}
		/>
	)
}
