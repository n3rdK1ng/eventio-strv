import { type ErrorBoundaryProps } from 'expo-router'
import { Controller } from 'react-hook-form'
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StatusBar,
	View,
} from 'react-native'

import { Button } from '#/components/button'
import { CustomErrorBoundary } from '#/components/custom-error-boundary'
import { DateTimePickerController } from '#/components/datetime-picker-controller'
import { TextInput } from '#/components/text-input'
import useEventForm from '#/hooks/use-event-form'
import { cn } from '#/utils/misc'

export function ErrorBoundary(props: ErrorBoundaryProps) {
	return <CustomErrorBoundary {...props} />
}

export default function CreateNewEventRoute() {
	const { control, handleSubmit, errors, onSubmit, loading } = useEventForm()

	return (
		<KeyboardAvoidingView
			behavior="padding"
			enabled={Platform.OS === 'ios'}
			keyboardVerticalOffset={90}
		>
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
		</KeyboardAvoidingView>
	)
}
