export type TUser = {
	id: string
	firstName: string
	lastName: string
	email: string
	createdAt: string
	updatedAt: string
}

export type TEvent = {
	id: string
	title: string
	description: string
	startsAt: string
	capacity: number
	ownerId: string
	createdAt: string
	updatedAt: string
	attendees: TUser[]
	owner: TUser
}
