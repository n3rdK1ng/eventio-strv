import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { dateRegex, isEventInFuture } from '#/utils/misc'

import { useCreateEvent } from './use-create-event'
import { useEvents } from './use-events'
import { useUpdateEvent } from './use-update-event'

const eventSchema = z.object({
	title: z.string().min(3),
	description: z.string().min(6),
	date: z
		.string()
		.regex(dateRegex, 'Date is required')
		.refine(date => {
			if (isNaN(Date.parse(date))) {
				return false
			}

			const inputDate = new Date(date).toISOString().split('T')[0]
			const today = new Date().toISOString().split('T')[0]

			return inputDate >= today
		}, 'Date must be in the future or today'),
	time: z.string().regex(dateRegex, 'Time is required'),

	capacity: z
		.string()
		.regex(/^\d+$/, 'Capacity is required number')
		.refine(capacity => parseInt(capacity) >= 1, 'Capacity must be at least 1'),
})

export type TEventSchema = z.infer<typeof eventSchema>

export default function useEventForm(eventId?: string) {
	const router = useRouter()
	const { data } = useEvents()

	const event = data.find(e => e.id === eventId)

	const { createEvent, loading: creating } = useCreateEvent()
	const { updateEvent, loading: updating } = useUpdateEvent(event?.id ?? '')

	const loading = !eventId ? creating : updating

	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<TEventSchema>({
		resolver: zodResolver(eventSchema),
		defaultValues: event
			? {
					title: event.title,
					description: event.description,
					date: event.startsAt,
					time: event.startsAt,
					capacity: event.capacity.toString(),
				}
			: {
					title: '',
					description: '',
					date: '',
					time: '',
					capacity: '',
				},
	})

	const onSubmit = async (formData: TEventSchema) => {
		const { isInFuture, dateTime } = isEventInFuture(
			formData.date,
			formData.time,
		)

		if (!isInFuture) {
			setError('date', {
				message: 'Event must be in the future',
			})
			setError('time', {
				message: 'Event must be in the future',
			})
			return
		}

		const { date, time, ...rest } = formData
		const event = {
			...rest,
			startsAt: dateTime.toISOString(),
			capacity: parseInt(formData.capacity),
		}

		try {
			const { id } = !eventId
				? await createEvent(event)
				: await updateEvent(event)

			router.replace(id)
		} catch {
			const fields = [
				'title',
				'description',
				'date',
				'time',
				'capacity',
			] as const
			fields.forEach((field, index) => {
				setError(field, {
					message:
						index === fields.length - 1
							? `Unable to ${!eventId ? 'create' : 'edit'} event, please try again`
							: ' ',
				})
			})
		}
	}

	return {
		control,
		handleSubmit,
		errors,
		setError,
		onSubmit,
		loading,
	}
}
