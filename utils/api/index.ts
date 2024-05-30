import axios from 'axios'

const headers = {
	'Content-Type': 'application/json',
	// store the API key in the headers so it can be accessed by the client
	// without exposing it in the client code itself
	// although this is not a secure way to store the API key
	ApiKey: process.env.EXPO_PUBLIC_API_KEY,
}

export const api = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	headers,
})
