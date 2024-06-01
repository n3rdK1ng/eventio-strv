import { useState } from 'react'

import { TEvent } from '#/utils/api/types'

import { useAuthedFetch } from './use-authed-fetch'
import { useEventStore } from './use-store'

export const useCreateEvent = () => {
	const { post } = useAuthedFetch()
	const { updateEvents } = useEventStore(state => state)

	const [loading, setLoading] = useState(false)

	const fetch = async (
		data: Pick<TEvent, 'startsAt' | 'title' | 'description' | 'capacity'>,
	) => {
		setLoading(true)
		try {
			const event = await post('events', data)
			updateEvents((events: TEvent[]) => [event, ...events])

			return event
		} finally {
			setLoading(false)
		}
	}

	return { loading, createEvent: fetch }
}
