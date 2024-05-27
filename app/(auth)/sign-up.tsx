import { Button } from '@/components/button'
import EventioLogo from '@/components/svgs/eventio-logo'
import { Text } from '@/components/text'
import { TextInput } from '@/components/text-input'
import { useRouter } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'

export default function SignUpRoute() {
	const router = useRouter()

	return (
		<>
			<View className="w-full flex flex-col items-center">
				<EventioLogo className="mt-14 mb-10" />
				<Text className="mb-4" variant="titleLarge">
					Get started absolutely free.
				</Text>
				<Text className="text-secondary mb-14">Enter your details below.</Text>
				<TextInput placeholder="First name" className="mb-10" />
				<TextInput placeholder="Last name" className="mb-10" />
				<TextInput placeholder="Email" className="mb-10" />
				<TextInput placeholder="Password" className="mb-10" isPassword />
				<TextInput placeholder="Repeat password" isPassword />
			</View>
			<View className="w-full flex flex-col items-center">
				<Button text="SIGN UP" className="bg-brand-green mb-3" />
				<View className="mb-6 inline-flex gap-1 flex-row">
					<Text className="text-secondary">Already have an account?</Text>
					<TouchableOpacity onPress={() => router.replace('sign-in')}>
						<Text className="text-brand-green">Log in</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	)
}
