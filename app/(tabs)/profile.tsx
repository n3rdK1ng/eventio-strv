import { ErrorBoundaryProps } from 'expo-router'
import { View } from 'react-native'

import { CustomErrorBoundary } from '#/components/custom-error-boundary'
import { EventList } from '#/components/event-list'
import { ProfileCard } from '#/components/profile-card'
import { SelectCardsVariant } from '#/components/select-cards-variant'
import { Text } from '#/components/text'

export function ErrorBoundary(props: ErrorBoundaryProps) {
	return <CustomErrorBoundary {...props} />
}

export default function ProfileRoute() {
	return (
		<View className="h-full w-full bg-primary">
			<View className="px-4">
				<ProfileCard />
			</View>
			<View className="flex flex-row items-center justify-between py-[10px] pl-6">
				<Text variant="bodyLarge">My events</Text>
				<SelectCardsVariant />
			</View>
			<EventList variant="profile" />
		</View>
	)
}
