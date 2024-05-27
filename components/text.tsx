import {
	Platform,
	StyleSheet,
	type TextProps,
	Text as TextRN,
} from 'react-native'

export type Text = TextProps & {
	variant?:
		| 'titleLarge'
		| 'titleMedium'
		| 'bodyLarge'
		| 'bodyMedium'
		| 'bodyMediumBold'
		| 'bodySmall'
		| 'bodyXSmall'
		| 'overlineSmall'
}

export const Text = ({ style, variant = 'bodyMedium', ...rest }: Text) => {
	return (
		<TextRN
			style={[
				variant === 'bodyMedium' ? styles.bodyMedium : undefined,
				variant === 'titleLarge' ? styles.titleLarge : undefined,
				variant === 'titleMedium' ? styles.titleMedium : undefined,
				variant === 'bodyLarge' ? styles.bodyLarge : undefined,
				variant === 'bodyMediumBold' ? styles.bodyMediumBold : undefined,
				variant === 'bodySmall' ? styles.bodySmall : undefined,
				variant === 'bodyXSmall' ? styles.bodyXSmall : undefined,
				variant === 'overlineSmall' ? styles.overlineSmall : undefined,
				style,
			]}
			{...rest}
		/>
	)
}

const styles = StyleSheet.create({
	titleLarge: {
		fontSize: 24,
		lineHeight: 28,
		fontWeight: '400',
		fontFamily: Platform.select({
			android: 'Inter_400Regular',
			ios: 'Inter-Regular',
		}),
	},
	titleMedium: {
		fontSize: 20,
		lineHeight: 24,
		fontWeight: '500',
		fontFamily: Platform.select({
			android: 'Inter_500Medium',
			ios: 'Inter-Medium',
		}),
	},
	bodyLarge: {
		fontSize: 18,
		lineHeight: 24,
		fontWeight: '400',
		fontFamily: Platform.select({
			android: 'Inter_400Regular',
			ios: 'Inter-Regular',
		}),
	},
	bodyMedium: {
		fontSize: 16,
		lineHeight: 20,
		fontWeight: '400',
		fontFamily: Platform.select({
			android: 'Inter_400Regular',
			ios: 'Inter-Regular',
		}),
	},
	bodyMediumBold: {
		fontSize: 16,
		lineHeight: 20,
		fontWeight: '700',
		fontFamily: Platform.select({
			android: 'Inter_700Bold',
			ios: 'Inter-Bold',
		}),
	},
	bodySmall: {
		fontSize: 14,
		lineHeight: 18,
		fontWeight: '400',
		fontFamily: Platform.select({
			android: 'Inter_400Regular',
			ios: 'Inter-Regular',
		}),
	},
	bodyXSmall: {
		fontSize: 12,
		lineHeight: 16,
		fontWeight: '400',
		fontFamily: Platform.select({
			android: 'Inter_400Regular',
			ios: 'Inter-Regular',
		}),
	},
	overlineSmall: {
		fontSize: 12,
		lineHeight: 16,
		fontWeight: '700',
		fontFamily: Platform.select({
			android: 'Inter_700Bold',
			ios: 'Inter-Bold',
		}),
		letterSpacing: 0.48,
		textTransform: 'uppercase',
	},
})
