import {
	Actionsheet,
	ActionsheetBackdrop,
	ActionsheetContent,
	ActionsheetDragIndicator,
	ActionsheetDragIndicatorWrapper,
	Box,
} from '@gluestack-ui/themed'
import { useState } from 'react'
import {
	TouchableOpacity,
	type TouchableOpacityProps,
	View,
} from 'react-native'

import { SettingsIcon } from '#/components/svgs/settings-icon'

import { Text } from './text'

type TActionSheetAndroid = TouchableOpacityProps & {
	editFunction: () => void
	destructiveFunction: () => void
	editText?: string
	destructiveText: string
	title: string
}

export const ActionSheetAndroid = ({
	editFunction,
	destructiveFunction,
	editText,
	destructiveText,
	title,
}: TActionSheetAndroid) => {
	const [showActionsheet, setShowActionsheet] = useState(false)
	const handleClose = () => setShowActionsheet(!showActionsheet)

	return (
		<Box>
			<TouchableOpacity
				className="mr-6"
				onPress={() => {
					handleClose()
				}}
			>
				<SettingsIcon className="text-primary" />
			</TouchableOpacity>
			<Actionsheet isOpen={showActionsheet} onClose={handleClose}>
				<ActionsheetBackdrop />
				<ActionsheetContent>
					<ActionsheetDragIndicatorWrapper>
						<ActionsheetDragIndicator />
					</ActionsheetDragIndicatorWrapper>
					<View className="w-full items-center rounded-xl">
						<Text
							className="py-3 text-[#3C3C4399]"
							variant="actionSheetFootnote"
						>
							{title}
						</Text>
						{editText && (
							<TouchableOpacity
								className="w-full border-t border-[#3C3C435C] py-[18px]"
								onPress={editFunction}
							>
								<Text
									className="text-center text-[#007AFF]"
									variant="actionSheetTitle"
								>
									{editText}
								</Text>
							</TouchableOpacity>
						)}
						<TouchableOpacity
							className="w-full border-t border-[#3C3C435C] py-[18px]"
							onPress={destructiveFunction}
						>
							<Text
								className="text-center text-[#FF3B30]"
								variant="actionSheetTitle"
							>
								{destructiveText}
							</Text>
						</TouchableOpacity>
					</View>
				</ActionsheetContent>
			</Actionsheet>
		</Box>
	)
}
