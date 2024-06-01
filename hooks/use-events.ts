import { useCallback, useEffect, useState } from 'react'

import { useAuthedFetch } from './use-authed-fetch'
import { useEventStore } from './use-store'

export const useEvents = () => {
	const { get } = useAuthedFetch()
	const events = useEventStore(state => state.events)
	const eventsFetched = useEventStore(state => state.eventsFetched)
	const setEvents = useEventStore(state => state.setEvents)
	const retryEventsCount = useEventStore(state => state.retryEventsCount)
	const incrementRetryEventsCount = useEventStore(
		state => state.incrementRetryEventsCount,
	)

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<unknown>(null)

	const fetchEvents = useCallback(async () => {
		if (retryEventsCount > 2) {
			return
		}

		setLoading(true)
		try {
			const data = await get('events')

			setEvents(data)
			setLoading(false)
		} catch (error) {
			incrementRetryEventsCount()
			setError(error)
		}
	}, [get, setEvents, incrementRetryEventsCount, retryEventsCount])

	useEffect(() => {
		if (!eventsFetched) {
			fetchEvents()
		}
	}, [])

	useEffect(() => {
		if (error) {
			// store the error in a local variable
			// so it can be thrown after the state is cleared
			const errorToThrow = error
			setError(null)
			throw errorToThrow
		}
	}, [error])

	return { loading, data: events || [] }
}
