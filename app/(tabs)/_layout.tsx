import { Tabs, useRouter } from 'expo-router'
import { Platform } from 'react-native'

import { AddButton } from '#/components/add-button'
import { SelectCardsVariant } from '#/components/select-cards-variant'
import { CalendarIcon } from '#/components/svgs/calendar-icon'
import { UserIcon } from '#/components/svgs/user-icon'
import { Text } from '#/components/text'

export default function TabLayout() {
	const router = useRouter()

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
					headerTitle: 'Profile',
				}}
			/>
		</Tabs>
	)
}
