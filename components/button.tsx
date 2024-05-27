import { cn } from '@/utils/misc'
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'

import { Text } from './text'

type Button = TouchableOpacityProps & {
	text: string
	variant?: 'large' | 'extraLarge'
	className?: string
}

export const Button = ({
	text,
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
			<Text className="text-primary-white" variant="bodyMediumBold">
				{text}
			</Text>
		</TouchableOpacity>
	)
}
