import { useState } from 'react'

import { useAuthedFetch } from './use-authed-fetch'
import { useEventStore } from './use-store'

export const useEventLeave = (id: string) => {
	const { del } = useAuthedFetch()
	const { updateEvent } = useEventStore(state => state)

	const [loading, setLoading] = useState(false)

	const fetch = async () => {
		setLoading(true)
		try {
			const data = await del(`events/${id}/attendees/me`)
			updateEvent(id, data)
		} finally {
			setLoading(false)
		}
	}

	return { isLeaving: loading, leaveEvent: fetch }
}
