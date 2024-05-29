import { tokenCache } from '../cache'

export const headers = {
	'Content-Type': 'application/json',
	// store the API key in the headers so it can be accessed by the client
	// without exposing it in the client code itself
	// although this is not a secure way to store the API key
	ApiKey: process.env.EXPO_PUBLIC_API_KEY,
}

export const getAuthedHeaders = async () => {
	const accessToken = await tokenCache.getToken('accessToken')
	return {
		...headers,
		Authorization: accessToken,
	}
}
