import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}

export const dateRegex =
	/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(([+-]\d{2}:\d{2})|Z)?$/
// ISO 8601 date-time format

export const isEventInFuture = (date: string, time: string) => {
	const datePart = date.split('T')[0]
	const timePart = time.split('T')[1]

	const dateTime = new Date(`${datePart}T${timePart}`)
	const now = new Date()
	now.setMinutes(now.getMinutes() + 5)

	const isInFuture = dateTime.getTime() >= now.getTime()

	return { isInFuture, dateTime }
}
