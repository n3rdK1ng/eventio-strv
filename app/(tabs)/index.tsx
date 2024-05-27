import { HelloWave } from '@/components/hello-wave'
import ParallaxScrollView from '@/components/parallax-scroll-view'
import { Text } from '@/components/text'
import { Link } from 'expo-router'
import { Image, Platform, StyleSheet, View } from 'react-native'

export default function HomeScreen() {
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
			headerImage={
				<Image
					source={require('@/assets/images/partial-react-logo.png')}
					style={styles.reactLogo}
				/>
			}
		>
			<View style={styles.titleContainer}>
				<Text variant="titleLarge">Welcome!</Text>
				<HelloWave />
			</View>
			<View style={styles.stepContainer}>
				<Text variant="bodyMedium">Step 1: Try it</Text>
				<Text>
					Edit <Text variant="bodyMedium">app/(tabs)/index.tsx</Text> to see
					changes. Press{' '}
					<Text variant="bodyMedium">
						{Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
					</Text>{' '}
					to open developer tools.
				</Text>
			</View>
			<View style={styles.stepContainer}>
				<Text variant="bodyMedium">Step 2: Explore</Text>
				<Text>
					Tap the Explore tab to learn more about what's included in this
					starter app.
				</Text>
			</View>
			<View style={styles.stepContainer}>
				<Text variant="bodyMedium">Step 3: Get a fresh start</Text>
				<Text>
					When you're ready, run{' '}
					<Text variant="bodyMedium">npm run reset-project</Text> to get a fresh{' '}
					<Text variant="bodyMedium">app</Text> directory. This will move the
					current <Text variant="bodyMedium">app</Text> to{' '}
					<Text variant="bodyMedium">app-example</Text>.
				</Text>
			</View>
			<Link href="/sign-in">
				<Text variant="bodyMediumBold">Sign in</Text>
			</Link>
		</ParallaxScrollView>
	)
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute',
	},
})
