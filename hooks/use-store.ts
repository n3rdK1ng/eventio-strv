import { create } from 'zustand'

import { TEvent } from '#/utils/api/types'

type State = {
	events: TEvent[]
	eventsFetched: boolean
	retryEventsCount: number
	setEvents: (events: TEvent[]) => void
	updateEvents: (updateFunction: (prevEvents: TEvent[]) => TEvent[]) => void
	incrementRetryEventsCount: () => void
	updateEvent: (id: string, event: Partial<TEvent>) => void
}

export const useEventStore = create<State>(set => ({
	events: [],
	eventsFetched: false,
	retryEventsCount: 0,
	setEvents: events => set({ events, eventsFetched: true }),
	updateEvents: updateFunction =>
		set(state => ({ events: updateFunction(state.events) })),
	incrementRetryEventsCount: () =>
		set(state => ({ retryEventsCount: state.retryEventsCount + 1 })),
	updateEvent: (id, event) =>
		set(state => ({
			events: state.events.map(e => (e.id === id ? { ...e, ...event } : e)),
		})),
}))
