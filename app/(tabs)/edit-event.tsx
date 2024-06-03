import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { type ErrorBoundaryProps } from 'expo-router'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TouchableOpacity,
	View,
} from 'react-native'

import { Button } from '#/components/button'
import { CustomErrorBoundary } from '#/components/custom-error-boundary'
import { DateTimePickerController } from '#/components/datetime-picker-controller'
import { ArrowIcon } from '#/components/svgs/arrow-icon'
import { TextInput } from '#/components/text-input'
import useEventForm from '#/hooks/use-event-form'
import { cn } from '#/utils/misc'

export function ErrorBoundary(props: ErrorBoundaryProps) {
	return <CustomErrorBoundary {...props} />
}

export default function EditEventRoute() {
	const { event } = useLocalSearchParams() as { event: string }
	const router = useRouter()
	const navigation = useNavigation()

	useEffect(() => {
		if (event) {
			navigation.setOptions({
				headerLeft: () => (
					<TouchableOpacity
						onPress={() => router.replace(event)}
						className="ml-6"
					>
						<ArrowIcon className="text-primary" />
					</TouchableOpacity>
				),
			})
		} else {
			router.replace('dashboard')
		}
	}, [navigation, event, router])

	const { control, handleSubmit, errors, onSubmit, loading } = useEventForm(
		event ?? '',
	)

	if (!event) {
		return null
	}

	return (
		<KeyboardAvoidingView
			behavior="padding"
			enabled={Platform.OS === 'ios'}
			keyboardVerticalOffset={60}
		>
			<ScrollView
				className="h-full w-full bg-primary px-6 pt-8"
				contentContainerStyle={{ paddingBottom: 120 }}
			>
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
						<View className="mb-6 w-full">
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
						<View className="mb-6 w-full">
							<TextInput
								placeholder="Description"
								isDirty={isDirty}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={
									errors.description?.message?.replace(
										'String',
										'Description',
									) ?? ''
								}
							/>
						</View>
					)}
					name="description"
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
					text={!loading ? 'EDIT' : 'LOADING...'}
					className={cn('bg-brand-green', loading && 'opacity-50')}
					onPress={handleSubmit(onSubmit)}
					disabled={loading}
				/>
				<Button
					text={'CANCEL'}
					className="mt-2 bg-secondary"
					textColor="primary"
					onPress={() => router.replace(event)}
				/>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}
