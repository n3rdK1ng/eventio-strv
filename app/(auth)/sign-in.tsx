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
	password: z.string().min(6),
})

type TSchema = z.infer<typeof schema>

export default function SignInRoute() {
	const { setSession } = useAuthContext()
	const router = useRouter()
	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<TSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			password: '',
		},
	})
	const [loading, setLoading] = useState(false)

	const handleErrors = (error: unknown) => {
		setError('email', { message: ' ' })

		const defaultMessage = { message: 'An unexpected error occurred' }

		if (!axios.isAxiosError(error)) {
			setError('password', defaultMessage)
			return
		}

		switch (error.response?.status) {
			case 404:
			case 401:
				setError('password', {
					message: 'Oops! That email and password combination is not valid.',
				})
				break
			default:
				setError('password', defaultMessage)
		}
	}

	const onSubmit = async (formData: TSchema) => {
		setLoading(true)

		try {
			const response = await api.post('auth/native', formData)

			await setSession(
				response.headers['authorization'],
				response.headers['refresh-token'],
				response.data as TUser,
			)

			router.replace('/dashboard')
		} catch (error) {
			handleErrors(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<View className="w-full items-center">
				<EventioLogo className="mb-10 mt-14" />
				<Text className="mb-4" variant="titleLarge">
					Sign in to Eventio.
				</Text>
				<Text className="mb-14 text-secondary">Enter your details below.</Text>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					render={({
						field: { onChange, onBlur, value },
						formState: { isDirty },
					}) => (
						<View className="mb-10 w-full">
							<TextInput
								placeholder="Email"
								isDirty={isDirty}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={errors.email?.message?.replace('String', 'Email') ?? ''}
								autoCapitalize="none"
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
					render={({
						field: { onChange, onBlur, value },
						formState: { isDirty },
					}) => (
						<TextInput
							placeholder="Password"
							isDirty={isDirty}
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
			<View className="w-full items-center">
				<Button
					text={!loading ? 'SIGN IN' : 'LOADING...'}
					className={cn('mb-3 bg-brand-green', loading && 'opacity-50')}
					disabled={loading}
					onPress={handleSubmit(onSubmit)}
				/>
				<View className="mb-6 inline-flex flex-row gap-1">
					<Text className="text-secondary">Don't have an account?</Text>
					<TouchableOpacity onPress={() => router.replace('sign-up')}>
						<Text className="text-brand-green">Sign up</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	)
}
