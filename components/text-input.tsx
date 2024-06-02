import { usePathname } from 'expo-router'
import { useState } from 'react'
import {
	Platform,
	type TextInputProps,
	TextInput as TextInputRN,
	TouchableOpacity,
	View,
} from 'react-native'

import { cn } from '#/utils/misc'

import { EyeCrossedIcon } from './svgs/eye-crossed-icon'
import { EyeIcon } from './svgs/eye-icon'
import { Text } from './text'

type TTextInput = TextInputProps & {
	placeholder: string
	isDirty: boolean
	isPassword?: boolean
	error?: string
}

export const TextInput = ({
	placeholder,
	isDirty,
	isPassword,
	error,
	className,
	...props
}: TTextInput) => {
	const path = usePathname()
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	return (
		<View className="relative w-full">
			{path === '/edit' && (
				<Text variant="bodySmall" className="text-tertiary">
					{placeholder}
				</Text>
			)}
			<TextInputRN
				placeholder={placeholder}
				placeholderTextColor={'#A7A7B9'}
				secureTextEntry={isPassword && !isPasswordVisible}
				className={cn(
					'relative w-full border-b border-tertiary pb-[14px] pt-0.5 text-tertiary',
					(isDirty || props.value) && 'border-black text-primary',
					error && 'border-error',
					error !== ' ' && 'mb-2',
					className,
				)}
				style={{
					fontSize: 16,
					lineHeight: 20,
					fontWeight: '400',
					fontFamily: Platform.select({
						android: 'Inter_400Regular',
						ios: 'Inter-Regular',
					}),
				}}
				{...props}
			/>
			{error !== ' ' && (
				<Text variant="bodyXSmall" className="mt-2 text-error">
					{error}
				</Text>
			)}
			{isPassword && (
				<TouchableOpacity
					onPress={() => setIsPasswordVisible(prevState => !prevState)}
					className="absolute right-0 top-0"
				>
					{!isPasswordVisible ? <EyeIcon /> : <EyeCrossedIcon />}
				</TouchableOpacity>
			)}
		</View>
	)
}
