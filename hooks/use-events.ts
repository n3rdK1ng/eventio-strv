import { useEffect, useState } from 'react'

import { useAuthedFetch } from './use-authed-fetch'
import { useEventStore } from './use-store'

export const useEvents = () => {
	const { get } = useAuthedFetch()
	const events = useEventStore(state => state.events)
	const setEvents = useEventStore(state => state.setEvents)

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchEvents = async () => {
			if (events.length === 0) {
				setLoading(true)
				try {
					const data = await get('events')
					setEvents(data)
				} catch (err) {
					throw err
				} finally {
					setLoading(false)
				}
			}
		}

		fetchEvents()
	}, [events.length, get, setEvents])

	return { loading, data: events }
}
