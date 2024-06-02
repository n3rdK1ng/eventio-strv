import { ActionSheetIOS, TouchableOpacity } from 'react-native'

import { SettingsIcon } from './svgs/settings-icon'

type TActionSheetIos = {
	title: string
	options: string[]
	onOptionPress: (index: number) => void
}

export const ActionSheetIos = ({
	title,
	options,
	onOptionPress,
}: TActionSheetIos) => {
	const onPress = () =>
		ActionSheetIOS.showActionSheetWithOptions(
			{
				title,
				options: ['Cancel', ...options],
				destructiveButtonIndex: options.length,
				cancelButtonIndex: 0,
				userInterfaceStyle: 'dark',
			},
			buttonIndex => {
				if (buttonIndex !== 0) {
					onOptionPress(buttonIndex - 1)
				}
			},
		)

	return (
		<TouchableOpacity onPress={onPress}>
			<SettingsIcon className="text-primary" />
		</TouchableOpacity>
	)
}
