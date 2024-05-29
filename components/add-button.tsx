import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'

import { PlusIcon } from '#/components/svgs/plus-icon'

export const AddButton = (props: TouchableOpacityProps) => {
	return (
		<TouchableOpacity
			style={{
				shadowColor: '#000',
				shadowOffset: {
					width: 0,
					height: 6,
				},
				shadowOpacity: 0.15,
				shadowRadius: 9,
				elevation: 3,
			}}
			className="h-14 w-14 items-center justify-center rounded-full bg-brand-black"
			{...props}
		>
			<PlusIcon className="text-primary-white" />
		</TouchableOpacity>
	)
}
