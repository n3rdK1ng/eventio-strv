import { cn } from '@/utils/misc'
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'

import { Text } from './text'

type Button = TouchableOpacityProps & {
	text: string
	textVariant?: Text['variant']
	variant?: 'large' | 'extraLarge'
	textColor?: 'primary-white' | 'secondary' | 'tertiary'
	className?: string
}

export const Button = ({
	text,
	textVariant = 'bodyMediumBold',
	textColor = 'primary-white',
	variant = 'extraLarge',
	className,
	...props
}: Button) => {
	return (
		<TouchableOpacity
			className={cn(className, 'flex justify-center items-center', {
				'w-full py-[18px] rounded-lg': variant === 'extraLarge',
				'py-[7px] px-[22px] rounded-[4px]': variant === 'large',
			})}
			{...props}
		>
			<Text
				className={cn({
					'text-primary-white': textColor === 'primary-white',
					'text-secondary': textColor === 'secondary',
					'text-tertiary': textColor === 'tertiary',
				})}
				variant={textVariant}
			>
				{text}
			</Text>
		</TouchableOpacity>
	)
}
