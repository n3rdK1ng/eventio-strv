import { Tabs, useRouter } from 'expo-router'
import { Alert, Platform, TouchableOpacity, View } from 'react-native'

import { ActionSheetAndroid } from '#/components/action-sheet-android'
import { ActionSheetIos } from '#/components/action-sheet-ios'
import { AddButton } from '#/components/add-button'
import { SelectCardsVariant } from '#/components/select-cards-variant'
import { ArrowIcon } from '#/components/svgs/arrow-icon'
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
					shadowColor: '#000',
					shadowOffset: { width: 0, height: -2 },
					shadowOpacity: 0.1,
					shadowRadius: 20,
					elevation: 20,
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
				name="create-new-event-placeholder"
				listeners={() => ({
					tabPress: e => {
						e.preventDefault()
					},
				})}
				options={{
					tabBarIcon: () => (
						<AddButton onPress={() => router.push('/create-new-event')} />
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
						<View className="mr-6">
							{Platform.OS === 'ios' ? (
								<ActionSheetIos
									title="Settings"
									options={['Edit Profile', 'Logout']}
									onOptionPress={(index: number) => {
										if (index === 0) {
											Alert.alert('Missing design and API endpoint 😿')
										} else if (index === 1) {
											destroySession()
										}
									}}
								/>
							) : (
								<ActionSheetAndroid
									title="Settings"
									destructiveText="Logout"
									editText="Edit profile"
									editFunction={() =>
										Alert.alert('Missing design and API endpoint 😿')
									}
									destructiveFunction={() => {
										destroySession()
									}}
								/>
							)}
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="[event]"
				options={{
					headerTitle: () => <Text variant="bodyLarge">Event Details</Text>,
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()} className="ml-6">
							<ArrowIcon className="text-primary" />
						</TouchableOpacity>
					),
					headerTitleAlign: 'center',
					headerShown: true,
					tabBarButton: () => null,
				}}
			/>
			<Tabs.Screen
				name="edit-event"
				options={{
					headerTitle: () => <Text variant="bodyLarge">Event Details</Text>,
					headerTitleAlign: 'center',
					headerShown: true,
					tabBarButton: () => null,
				}}
			/>
		</Tabs>
	)
}
