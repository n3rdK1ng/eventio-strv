import { cn } from '@/utils/misc'
import { useState } from 'react'
import {
	Platform,
	type TextInputProps,
	TextInput as TextInputRN,
	TouchableOpacity,
	View,
} from 'react-native'

import { EyeCrossedIcon } from './svgs/eye-crossed-icon'
import { EyeIcon } from './svgs/eye-icon'

type TextInput = TextInputProps & {
	placeholder: string
	isPassword?: boolean
	className?: string
}

export const TextInput = ({
	placeholder,
	isPassword,
	className,
	...props
}: TextInput) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	return (
		<View className="relative w-full">
			<TextInputRN
				placeholder={placeholder}
				placeholderTextColor={'#A7A7B9'}
				secureTextEntry={isPassword && !isPasswordVisible}
				className={cn(
					'w-full border-b border-tertiary pt-0.5 pb-[13px] relative',
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
