import { Tabs, useRouter } from 'expo-router'
import { Alert, Platform, TouchableOpacity } from 'react-native'

import { ActionSheetAndroid } from '#/components/action-sheet-android'
import { ActionSheetIos } from '#/components/action-sheet-ios'
import { AddButton } from '#/components/add-button'
import { SelectCardsVariant } from '#/components/select-cards-variant'
import { CalendarIcon } from '#/components/svgs/calendar-icon'
import { UserIcon } from '#/components/svgs/user-icon'
import { Text } from '#/components/text'
import { useAuthContext } from '#/context/auth'

export default function TabLayout() {
	const router = useRouter()
	const { destroySession } = useAuthContext()

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: '#000',
				headerShown: false,
				tabBarStyle: {
					height: Platform.select({
						android: 90,
						ios: 96,
					}),
					paddingTop: Platform.select({
						android: 16,
						ios: 0,
					}),
					paddingBottom: 0,
				},
				tabBarLabel: '',
				headerStyle: {
					backgroundColor: '#F9F9FB',
					shadowColor: 'transparent',
				},
			}}
		>
			<Tabs.Screen
				name="dashboard"
				options={{
					tabBarIcon: ({ color }) => <CalendarIcon color={color} />,
					headerTitle: () => <Text variant="bodyLarge">Events</Text>,
					headerTitleAlign: 'center',
					headerShown: true,
					headerRight: () => <SelectCardsVariant />,
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					tabBarIcon: () => (
						<AddButton onPress={() => router.replace('/explore')} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarIcon: ({ color }) => <UserIcon color={color} />,
					headerTitle: () => (
						<TouchableOpacity>
							<Text variant="bodyLarge">Profile</Text>
						</TouchableOpacity>
					),
					headerTitleAlign: 'center',
					headerShown: true,
					headerRight: () => (
						<>
							{Platform.OS === 'ios' ? (
								<ActionSheetIos
									title="Settings"
									options={['Edit Profile', 'Logout']}
									onOptionPress={(index: number) => {
										if (index === 0) {
											Alert.alert('Missing design and API endpoint 😿')
										} else if (index === 1) {
											destroySession()
											router.replace('/sign-in')
										}
									}}
								/>
							) : (
								<ActionSheetAndroid
									title="Settings"
									destructiveText="Logout"
									editText="Edit profile"
									className=" text-primary"
									editFunction={() =>
										Alert.alert('Missing design and API endpoint 😿')
									}
									destructiveFunction={() => {
										destroySession()
										router.replace('/sign-in')
									}}
								/>
							)}
						</>
					),
				}}
			/>
		</Tabs>
	)
}
