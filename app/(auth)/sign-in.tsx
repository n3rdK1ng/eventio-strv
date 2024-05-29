import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TouchableOpacity, View } from 'react-native'
import { z } from 'zod'

import { Button } from '#/components/button'
import { EventioLogo } from '#/components/svgs/eventio-logo'
import { Text } from '#/components/text'
import { TextInput } from '#/components/text-input'
import { useAuthContext } from '#/context/auth'
import { headers } from '#/utils/api'
import { TUser } from '#/utils/api/types'
import { cn } from '#/utils/misc'

const schema = z.object({
	email: z
		.string()
		.email()
		.min(1)
		.transform(email => email.toLowerCase()),
	password: z.string().min(6),
})

export default function SignInRoute() {
	const { setSession } = useAuthContext()
	const router = useRouter()
	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<typeof schema._type>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			password: '',
		},
	})
	const [loading, setLoading] = useState(false)

	const onSubmit = async (formData: typeof schema._type) => {
		setLoading(true)

		try {
			const response = await axios.post(
				process.env.EXPO_PUBLIC_API_URL + 'auth/native',
				formData,
				{
					headers,
				},
			)

			await setSession(
				response.headers['authorization'],
				response.headers['refresh-token'],
				response.data as TUser,
			)

			router.replace('/dashboard')
		} catch (error) {
			if (axios.isAxiosError(error)) {
				switch (error.response?.status) {
					case 404:
					case 401:
						setError('email', {
							message: ' ',
						})
						setError('password', {
							message:
								'Oops! That email and password combination is not valid.',
						})
						setLoading(false)
						break

					default:
						console.error(error)
						throw Error('An unexpected error occurred: ' + error.message)
				}
			} else {
				throw error
			}
		}
	}

	return (
		<>
			<View className="w-full flex flex-col items-center">
				<EventioLogo className="mt-14 mb-10" />
				<Text className="mb-4" variant="titleLarge">
					Sign in to Eventio.
				</Text>
				<Text className="text-secondary mb-14">Enter your details below.</Text>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<View className="mb-10 w-full">
							<TextInput
								placeholder="Email"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={errors.email?.message?.replace('String', 'Email') ?? ''}
							/>
						</View>
					)}
					name="email"
				/>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							placeholder="Password"
							isPassword
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={
								errors.password?.message?.replace('String', 'Password') ?? ''
							}
						/>
					)}
					name="password"
				/>
			</View>
			<View className="w-full flex flex-col items-center">
				<Button
					text={!loading ? 'SIGN IN' : 'LOADING...'}
					className={cn('bg-brand-green mb-3', loading && 'opacity-50')}
					disabled={loading}
					onPress={handleSubmit(onSubmit)}
				/>
				<View className="mb-6 inline-flex gap-1 flex-row">
					<Text className="text-secondary">Don't have an account?</Text>
					<TouchableOpacity onPress={() => router.replace('sign-up')}>
						<Text className="text-brand-green">Sign up</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	)
}
