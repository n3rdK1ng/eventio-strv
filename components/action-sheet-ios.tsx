import {
	ActionSheetIOS,
	TouchableOpacity,
	TouchableOpacityProps,
} from 'react-native'

import { SettingsIcon } from './svgs/settings-icon'

type TActionSheetIos = TouchableOpacityProps & {
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
		<TouchableOpacity className="mr-6" onPress={onPress}>
			<SettingsIcon className="text-primary" />
		</TouchableOpacity>
	)
}
