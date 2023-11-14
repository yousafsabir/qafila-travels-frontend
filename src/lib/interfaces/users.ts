import { HttpCommonResponse } from './http'

export interface UserLogin {
	email: string
	password: string
}

export interface User {
	username: string
	email: string
	current_balance: number
	isBanned: boolean
	isCreator: boolean
	isVerified: boolean
	role: string
	transactionIds: string[]
	created_at: string
	updated_at: string
}

export interface LoginResponse extends HttpCommonResponse {
	access_token: string
}

export interface GetUserResponse extends HttpCommonResponse {
	user: User
}
