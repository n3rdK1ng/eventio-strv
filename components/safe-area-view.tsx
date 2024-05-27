import { cn } from '@/utils/misc'
import { useHeaderHeight } from '@react-navigation/elements'
import { ComponentProps } from 'react'
import {
	Platform,
	SafeAreaView as SafeAreaViewRN,
	StatusBar,
	StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
	AndroidSafeArea: {
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
})

export const SafeAreaView = ({
	children,
	backgroundColor = 'primary',
}: {
	children: React.ReactNode
	backgroundColor: 'primary' | 'secondary'
} & ComponentProps<typeof SafeAreaViewRN>) => {
	const headerHeight = useHeaderHeight()
	const backgroundColorValue =
		backgroundColor === 'primary' ? '#F9F9FB' : 'white'
	return (
		<SafeAreaViewRN
			style={[
				headerHeight > 0 ? {} : styles.AndroidSafeArea,
				{ backgroundColor: backgroundColorValue },
			]}
		>
			{children}
		</SafeAreaViewRN>
	)
}
