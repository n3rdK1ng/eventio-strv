import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Platform, TouchableOpacity } from 'react-native'

import { Button } from './button'
import { TextInput } from './text-input'

type TDateTimePickerController = {
	control: any
	name: string
	placeholder: string
	variant: 'date' | 'time'
	error: string
}

export const DateTimePickerController = ({
	control,
	name,
	placeholder,
	variant,
	error,
}: TDateTimePickerController) => {
	const [show, setShow] = useState(false)
	return (
		<Controller
			control={control}
			render={({
				field: { onChange, onBlur, value },
				formState: { isDirty },
			}) => (
				<TouchableOpacity
					className="mb-10 w-full"
					onPress={() => {
						Platform.OS === 'android' && setShow(show => !show)
					}}
				>
					<TextInput
						placeholder={placeholder}
						value={((value, variant) => {
							if (!value) return ''
							const dateValue = new Date(value)
							return variant === 'date'
								? dateValue.toLocaleDateString('en-US', {
										month: 'long',
										day: 'numeric',
										year: 'numeric',
									})
								: dateValue.toLocaleTimeString('en-US', {
										hour: 'numeric',
										minute: 'numeric',
										hour12: true,
									})
						})(value, variant)}
						onPress={() => {
							Platform.OS === 'ios' && setShow(show => !show)
						}}
						editable={false}
						onBlur={onBlur}
						error={error}
						isDirty={isDirty}
					/>
					{show && (
						<>
							<DateTimePicker
								value={new Date(value || Date.now())}
								mode={variant}
								is24Hour={false}
								display="spinner"
								textColor="black"
								onChange={(_event, selectedDate) => {
									Platform.OS === 'android' && setShow(false)
									const currentDate = selectedDate || new Date(value)
									onChange(currentDate.toISOString())
								}}
							/>
							{Platform.OS === 'ios' && (
								<Button
									text={'CONFIRM'}
									className="bg-secondary"
									textColor="primary"
									onPress={() => setShow(false)}
								/>
							)}
						</>
					)}
				</TouchableOpacity>
			)}
			name={name}
		/>
	)
}
