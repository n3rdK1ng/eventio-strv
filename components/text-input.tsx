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
	isPassword?: boolean
	error?: string
	focused?: boolean
}

export const TextInput = ({
	placeholder,
	isPassword,
	error,
	className,
	...props
}: TTextInput) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const [isFocused, setIsFocused] = useState(false)

	return (
		<View className="relative w-full">
			<TextInputRN
				placeholder={placeholder}
				placeholderTextColor={'#A7A7B9'}
				secureTextEntry={isPassword && !isPasswordVisible}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				className={cn(
					'w-full border-b border-tertiary pt-0.5 pb-[13px] relative',
					isFocused && 'border-brand-black',
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
				<Text variant="bodyXSmall" className="text-error mt-2">
					{error}
				</Text>
			)}
			{isPassword && (
				<TouchableOpacity
					onPress={() => setIsPasswordVisible(prevState => !prevState)}
					className="absolute right-0 top-0"
				>
					{isPasswordVisible ? <EyeIcon /> : <EyeCrossedIcon />}
				</TouchableOpacity>
			)}
		</View>
	)
}
