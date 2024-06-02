import { useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'

import { useAuthedFetch } from './use-authed-fetch'
import { useEventStore } from './use-store'

export const useDeleteEvent = (eventId: string) => {
	const navigation = useNavigation()
	const { del } = useAuthedFetch()
	const { updateEvents } = useEventStore(state => state)

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<unknown>(null)

	const fetch = async () => {
		setLoading(true)
		try {
			await del(`events/${eventId}`)
			updateEvents(events => events.filter(({ id }) => id !== eventId))
			navigation.reset({
				index: 0,
				// @ts-ignore
				routes: [{ name: 'dashboard' }],
			})
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (error) {
			// store the error in a local variable
			// so it can be thrown after the state is cleared
			const errorToThrow = error
			setError(null)
			throw errorToThrow
		}
	}, [error])

	return { loading, deleteEvent: fetch }
}
