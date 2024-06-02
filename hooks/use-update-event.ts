import { useState } from 'react'

import { TEvent } from '#/utils/api/types'

import { useAuthedFetch } from './use-authed-fetch'
import { useEventStore } from './use-store'

export const useUpdateEvent = (eventId: string) => {
	const { patch } = useAuthedFetch()
	const { updateEvent } = useEventStore(state => state)

	const [loading, setLoading] = useState(false)

	const fetch = async (
		data: Partial<
			Pick<TEvent, 'startsAt' | 'title' | 'description' | 'capacity'>
		>,
	) => {
		setLoading(true)
		try {
			const updatedEvent = await patch(`events/${eventId}`, data)
			updateEvent(eventId, updatedEvent)

			return updatedEvent
		} finally {
			setLoading(false)
		}
	}

	return { loading, updateEvent: fetch }
}
