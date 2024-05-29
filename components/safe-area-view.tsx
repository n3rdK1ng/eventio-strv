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

type TSafeAreaView = ComponentProps<typeof SafeAreaViewRN> & {
	children: React.ReactNode
	backgroundColor: 'primary' | 'secondary'
}

export const SafeAreaView = ({
	children,
	backgroundColor = 'primary',
}: TSafeAreaView) => {
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
