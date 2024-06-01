import { useState } from 'react'

import { useAuthedFetch } from './use-authed-fetch'
import { useEventStore } from './use-store'

export const useEventJoin = (id: string) => {
	const { post } = useAuthedFetch()
	const { updateEvent } = useEventStore(state => state)

	const [loading, setLoading] = useState(false)

	const fetch = async () => {
		setLoading(true)
		try {
			const data = await post(`events/${id}/attendees/me`)
			updateEvent(id, data)
		} finally {
			setLoading(false)
		}
	}

	return { isJoining: loading, joinEvent: fetch }
}
