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
import { api } from '#/utils/api'
import { TUser } from '#/utils/api/types'
import { cn } from '#/utils/misc'

const schema = z.object({
	email: z
		.string()
		.email()
		.min(1)
		.transform(email => email.toLowerCase()),
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	password: z.string().min(6),
})

export default function SignUpRoute() {
	const { setSession } = useAuthContext()
	const router = useRouter()
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<typeof schema._type>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			password: '',
		},
	})
	const [loading, setLoading] = useState(false)

	const onSubmit = async (formData: typeof schema._type) => {
		setLoading(true)

		try {
			const response = await api.post('auth/register', formData)

			if (response.status !== 200) {
				throw Error('An unexpected error occurred')
			}

			// Login after successful sign-up
			const loginResponse = await api.post('auth/native', formData)

			await setSession(
				loginResponse.headers['authorization'],
				loginResponse.headers['refresh-token'],
				loginResponse.data as TUser,
			)

			router.replace('/dashboard')
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error(error)
				throw Error('An unexpected error occurred: ' + error.message)
			} else {
				throw error
			}
		}
	}

	return (
		<>
			<View className="flex w-full flex-col items-center">
				<EventioLogo className="mb-10 mt-14" />
				<Text variant="titleLarge" className="mb-4 ">
					Get started absolutely free.
				</Text>
				<Text className="mb-14 text-secondary ">Enter your details below.</Text>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<View className="mb-10 w-full">
							<TextInput
								placeholder="First name"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={
									errors.firstName?.message?.replace('String', 'First name') ??
									''
								}
							/>
						</View>
					)}
					name="firstName"
				/>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<View className="mb-10 w-full">
							<TextInput
								placeholder="Last name"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={
									errors.lastName?.message?.replace('String', 'Last name') ?? ''
								}
							/>
						</View>
					)}
					name="lastName"
				/>
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
			<View className="flex w-full flex-col items-center">
				<Button
					text={!loading ? 'SIGN UP' : 'LOADING...'}
					className={cn('mb-3 bg-brand-green', loading && 'opacity-50')}
					disabled={loading}
					onPress={handleSubmit(onSubmit)}
				/>
				<View className="mb-6 inline-flex flex-row gap-1">
					<Text className="text-secondary">Already have an account?</Text>
					<TouchableOpacity onPress={() => router.replace('sign-in')}>
						<Text className="text-brand-green">Log in</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	)
}
