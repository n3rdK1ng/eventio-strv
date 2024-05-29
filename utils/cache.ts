import * as SecureStore from 'expo-secure-store'

export const saveToken = async (key: string, value: string) => {
	await SecureStore.setItemAsync(key, value)
}

export const getToken = async (key: string) => {
	try {
		const value = await SecureStore.getItemAsync(key)
		return value
	} catch (e) {
		await SecureStore.deleteItemAsync(key)
		throw e
	}
}

export const tokenCache = { getToken, saveToken }
