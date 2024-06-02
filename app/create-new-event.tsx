import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { type ErrorBoundaryProps } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, StatusBar, View } from 'react-native'
import { z } from 'zod'

import { Button } from '#/components/button'
import { CustomErrorBoundary } from '#/components/custom-error-boundary'
import { DateTimePickerController } from '#/components/datetime-picker-controller'
import { TextInput } from '#/components/text-input'
import { useCreateEvent } from '#/hooks/use-create-event'
import { cn, dateRegex, isEventInFuture } from '#/utils/misc'

export function ErrorBoundary(props: ErrorBoundaryProps) {
	return <CustomErrorBoundary {...props} />
}

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

export default function CreateNewEventRoute() {
	const router = useRouter()
	const { createEvent, loading } = useCreateEvent()
	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<TEventSchema>({
		resolver: zodResolver(eventSchema),
		defaultValues: {
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
			const { id } = await createEvent(event)
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
							? 'Unable to create event, please try again'
							: ' ',
				})
			})
		}
	}

	return (
		<ScrollView
			className="h-full w-full bg-secondary px-6 pt-8"
			contentContainerStyle={{ paddingBottom: 120 }}
		>
			<StatusBar barStyle={'light-content'} />
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({
					field: { onChange, onBlur, value },
					formState: { isDirty },
				}) => (
					<View className="mb-10 w-full">
						<TextInput
							placeholder="Title"
							isDirty={isDirty}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors.title?.message?.replace('String', 'Title') ?? ''}
						/>
					</View>
				)}
				name="title"
			/>
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({
					field: { onChange, onBlur, value },
					formState: { isDirty },
				}) => (
					<View className="mb-10 w-full">
						<TextInput
							placeholder="Description"
							isDirty={isDirty}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={
								errors.description?.message?.replace('String', 'Description') ??
								''
							}
						/>
					</View>
				)}
				name="description"
			/>
			<DateTimePickerController
				control={control}
				name={'date'}
				placeholder={'Date'}
				variant={'date'}
				error={errors.date?.message ?? ''}
			/>
			<DateTimePickerController
				control={control}
				name={'time'}
				placeholder={'Time'}
				variant={'time'}
				error={errors.time?.message ?? ''}
			/>
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({
					field: { onChange, onBlur, value },
					formState: { isDirty },
				}) => (
					<View className="mb-10 w-full">
						<TextInput
							placeholder="Capacity"
							isDirty={isDirty}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors.capacity?.message ?? ''}
							keyboardType="number-pad"
						/>
					</View>
				)}
				name="capacity"
			/>

			<Button
				text={!loading ? 'SUBMIT' : 'LOADING...'}
				className={cn('bg-brand-green', loading && 'opacity-50')}
				onPress={handleSubmit(onSubmit)}
				disabled={loading}
			/>
		</ScrollView>
	)
}
