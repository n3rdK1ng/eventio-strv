import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'

import { cn } from '#/utils/misc'

import { type TText, Text } from './text'

type TButton = TouchableOpacityProps & {
	text: string
	textVariant?: TText['variant']
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
}: TButton) => {
	return (
		<TouchableOpacity
			className={cn(className, 'flex items-center justify-center', {
				'w-full rounded-lg py-[18px]': variant === 'extraLarge',
				'rounded-[4px] px-[22px] py-[7px]': variant === 'large',
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
