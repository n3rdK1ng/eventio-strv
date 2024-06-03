import { View } from 'react-native'

import { useAuthContext } from '#/context/auth'

import { Text } from './text'

export const ProfileCard = () => {
	const { user } = useAuthContext()

	if (!user) {
		return null
	}

	const userInitials = (user.firstName[0] + user.lastName[0]).toUpperCase()
	return (
		<View
			style={{
				shadowColor: '#000',
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.1,
				shadowRadius: 4,
				elevation: 3,
			}}
			className="mb-6 mt-[92px] h-[164px] w-full items-center justify-between rounded-lg bg-secondary p-8"
		>
			<View className="-mt-[92px] flex h-[120px] w-[120px] justify-center rounded-full bg-disabled">
				<Text className="text-center text-tertiary" variant="profileInitials">
					{userInitials}
				</Text>
			</View>
			<View>
				<Text className="text-center" variant="bodyLarge">
					{user.firstName} {user.lastName}
				</Text>
				<Text className="mt-1 text-center text-tertiary" variant="bodyMedium">
					{user.email}
				</Text>
			</View>
		</View>
	)
}
