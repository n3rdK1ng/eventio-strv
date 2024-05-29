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
			className="w-14 h-14 bg-brand-black rounded-full justify-center items-center"
			{...props}
		>
			<PlusIcon className="text-primary-white" />
		</TouchableOpacity>
	)
}
