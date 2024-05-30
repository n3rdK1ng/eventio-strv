import { ErrorBoundaryProps } from 'expo-router'
import { View } from 'react-native'

import { CustomErrorBoundary } from '#/components/custom-error-boundary'
import { EventFilters } from '#/components/event-filters'
import { EventList } from '#/components/event-list'

export function ErrorBoundary(props: ErrorBoundaryProps) {
	return <CustomErrorBoundary {...props} />
}

export default function DashboardRoute() {
	return (
		<View className="h-full w-full bg-primary">
			<EventFilters />
			<EventList variant="all" />
		</View>
	)
}
