import { useState } from 'react'

import { useAuthedFetch } from './use-authed-fetch'
import { useEventStore } from './use-store'

export const useRefreshEvent = (eventId: string) => {
	const { get } = useAuthedFetch()
	const { updateEvent } = useEventStore(state => state)

	const [loading, setLoading] = useState(false)

	const fetch = async () => {
		setLoading(true)
		try {
			const event = await get(`events/${eventId}`)
			updateEvent(eventId, event)
		} finally {
			setLoading(false)
		}
	}

	return { loading, refreshEvent: fetch }
}
