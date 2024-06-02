import { AxiosRequestConfig } from 'axios'
import { useCallback, useState } from 'react'

import { decodeToken, useAuthContext } from '#/context/auth'
import { api } from '#/utils/api'
import { tokenCache } from '#/utils/cache'

export const useAuthedFetch = () => {
	const { refreshSession } = useAuthContext()
	const [token, setToken] = useState<string | null>(null)

	const refreshToken = useCallback(async () => {
		let authToken = await tokenCache.getToken('accessToken')
		if (authToken) {
			const payload = await decodeToken(authToken)
			if ((payload.exp - 5) * 1000 < Date.now()) {
				await refreshSession()
				authToken = await tokenCache.getToken('accessToken')
			}
		}
		setToken(authToken)
		return authToken
	}, [refreshSession])

	const fetch = async (
		method: 'get' | 'post' | 'delete' | 'patch',
		url: string,
		data?: {},
		config: AxiosRequestConfig = {},
	) => {
		let currentToken = token
		if (!currentToken) {
			currentToken = await refreshToken()
		}

		const headers = {
			...config,
			headers: { Authorization: currentToken },
		}

		const response =
			method === 'get' || method === 'delete'
				? await api[method](url, headers)
				: await api[method](url, data, headers)

		// clear the token after the request is done
		setToken(null)

		return response.data
	}

	const get = (url: string, config: AxiosRequestConfig = {}) =>
		fetch('get', url, undefined, config)
	const post = (url: string, data?: {}, config: AxiosRequestConfig = {}) =>
		fetch('post', url, data, config)
	const del = (url: string, config: AxiosRequestConfig = {}) =>
		fetch('delete', url, undefined, config)
	const patch = (url: string, data?: {}, config: AxiosRequestConfig = {}) =>
		fetch('patch', url, data, config)

	return { get, post, del, patch }
}
