import Ionicons from '@expo/vector-icons/Ionicons'
import { Image, Platform, StyleSheet, View } from 'react-native'

import { ExternalLink } from '#/components/external-link'
import ParallaxScrollView from '#/components/parallax-scroll-view'
import { Text } from '#/components/text'

export default function TabTwoScreen() {
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
			headerImage={
				<Ionicons size={310} name="code-slash" style={styles.headerImage} />
			}
		>
			<View style={styles.titleContainer}>
				<Text variant="titleLarge">Explore</Text>
			</View>
			<Text>This app includes example code to help you get started.</Text>
			<View>
				<Text>
					This app has two screens: <Text>app/(tabs)/index.tsx</Text> and{' '}
					<Text>app/(tabs)/explore.tsx</Text>
				</Text>
				<Text>
					The layout file in <Text>app/(tabs)/_layout.tsx</Text> sets up the tab
					navigator.
				</Text>
				<ExternalLink href="https://docs.expo.dev/router/introduction">
					<Text variant="titleLarge">Learn more</Text>
				</ExternalLink>
			</View>
			<View>
				<Text>
					You can open this project on Android, iOS, and the web. To open the
					web version, press <Text>w</Text> in the terminal running this
					project.
				</Text>
			</View>
			<View>
				<Text>
					For static images, you can use the <Text>@2x</Text> and{' '}
					<Text>@3x</Text> suffixes to provide files for different screen
					densities
				</Text>
				<Image
					source={require('#/assets/images/react-logo.png')}
					style={{ alignSelf: 'center' }}
				/>
				<ExternalLink href="https://reactnative.dev/docs/images">
					<Text variant="bodyMediumBold">Learn more</Text>
				</ExternalLink>
			</View>
			<View>
				<Text>
					Open <Text>app/_layout.tsx</Text> to see how to load{' '}
					<Text style={{ fontFamily: 'SpaceMono' }}>
						custom fonts such as this one.
					</Text>
				</Text>
				<ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
					<Text variant="bodyMediumBold">Learn more</Text>
				</ExternalLink>
			</View>
			<View>
				<Text>
					This template has light and dark mode support. The{' '}
					<Text>useColorScheme()</Text> hook lets you inspect what the user's
					current color scheme is, and so you can adjust UI colors accordingly.
				</Text>
				<ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
					<Text variant="overlineSmall">Learn more</Text>
				</ExternalLink>
			</View>
			<View>
				<Text>
					This template includes an example of an animated component. The{' '}
					<Text>components/HelloWave.tsx</Text> component uses the powerful{' '}
					<Text>react-native-reanimated</Text> library to create a waving hand
					animation.
				</Text>
				{Platform.select({
					ios: (
						<Text>
							The <Text>components/ParallaxScrollView.tsx</Text> component
							provides a parallax effect for the header image.
						</Text>
					),
				})}
			</View>
		</ParallaxScrollView>
	)
}

const styles = StyleSheet.create({
	headerImage: {
		color: '#808080',
		bottom: -90,
		left: -35,
		position: 'absolute',
	},
	titleContainer: {
		flexDirection: 'row',
		gap: 8,
	},
})
