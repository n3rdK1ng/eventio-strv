import { create } from 'zustand'

import { TEvent } from '#/utils/api/types'

type State = {
	events: TEvent[]
	updateEvent: (id: string, event: Partial<TEvent>) => void
	setEvents: (events: TEvent[]) => void
}

export const useEventStore = create<State>(set => ({
	events: [],
	updateEvent: (id, event) =>
		set(state => ({
			events: state.events.map(e => (e.id === id ? { ...e, ...event } : e)),
		})),
	setEvents: events => set(() => ({ events })),
}))
