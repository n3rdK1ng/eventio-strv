import { Tabs, useRouter } from 'expo-router'
import React from 'react'
import { Platform, TouchableOpacity, View } from 'react-native'

import { AddButton } from '#/components/add-button'
import { CalendarIcon } from '#/components/svgs/calendar-icon'
import { GridIcon } from '#/components/svgs/grid-icon'
import { LinesIcon } from '#/components/svgs/lines-icon'
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
					headerRight: () => (
						<View className="flex flex-row gap-3 pr-6">
							<TouchableOpacity>
								<GridIcon />
							</TouchableOpacity>
							<TouchableOpacity>
								<LinesIcon />
							</TouchableOpacity>
						</View>
					),
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
