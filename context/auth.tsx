import { useRouter } from 'expo-router'
import { jwtDecode } from 'jwt-decode'
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'

import { api } from '#/utils/api'
import { TUser } from '#/utils/api/types'
import { tokenCache } from '#/utils/cache'

export const accessTokenKey = 'accessToken'
export const refreshTokenKey = 'refreshToken'

type TAuthContext = {
	user: TUser | null | undefined
	isLoaded: boolean
	isLoggingOut: boolean
	setSession: (
		accessToken: string,
		refreshToken: string,
		user: TUser,
	) => Promise<void>
	destroySession: () => Promise<void>
	refreshSession: () => Promise<void>
}

type TDecodedJWT = {
	user: TUser
	iat: number
	exp: number
}

export const AuthContext = createContext<TAuthContext>({
	user: undefined,
	isLoaded: false,
	isLoggingOut: false,
	setSession: () => {
		throw new Error('setSession was not initialized')
	},
	destroySession: () => {
		throw new Error('destroySession was not initialized')
	},
	refreshSession: () => {
		throw new Error('refreshSession was not initialized')
	},
})

export const decodeToken = async (token: string) => {
	const payload: TDecodedJWT = await jwtDecode(token)
	return payload
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter()

	const [isLoaded, setIsLoaded] = useState(false)
	const [isLoggingOut, setIsLoggingOut] = useState(false)
	const [user, setUser] = useState<TUser | null>()

	const setSession = useCallback(
		async (accessToken: string, refreshToken: string, user: TUser) => {
			await tokenCache.saveToken(accessTokenKey, accessToken)
			await tokenCache.saveToken(refreshTokenKey, refreshToken)
			setUser(user)
			setIsLoaded(true)
		},
		[],
	)

	const destroySession = useCallback(async () => {
		try {
			setIsLoggingOut(true)
			await tokenCache.saveToken(accessTokenKey, '')
			await tokenCache.saveToken(refreshTokenKey, '')
			setUser(null)
			setIsLoaded(true)

			router.replace('/sign-in')
		} finally {
			setIsLoggingOut(false)
		}
	}, [])

	const refreshSession = useCallback(async () => {
		const refreshToken = await tokenCache.getToken(refreshTokenKey)

		if (!refreshToken) return await destroySession()

		const payload = await decodeToken(refreshToken)

		const isExpired = payload.exp * 1000 < Date.now()

		if (isExpired) {
			alert('Your session has expired, please log in again')
			return await destroySession()
		}

		const response = await api.post('auth/native', { refreshToken })

		// Refresh token is invalid or expired
		if (response.status !== 200) return await destroySession()

		await setSession(
			response.headers['authorization'],
			refreshToken,
			payload.user,
		)

		setIsLoaded(true)
	}, [destroySession, setSession])

	useEffect(() => void refreshSession(), [refreshSession])

	const value = useMemo(
		() => ({
			refreshSession,
			user,
			isLoaded,
			isLoggingOut,
			setSession,
			destroySession,
		}),
		[refreshSession, user, isLoaded, isLoggingOut, setSession, destroySession],
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
