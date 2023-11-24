import { HttpCommonResponse, CommonGetAllResponse } from './http'

export interface UserLogin {
	email: string
	password: string
}

export interface User {
	_id: string
	user_name: string
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

export interface CreateUser {
	user_name: string
	name: string
	email: string
	phone: string
	password: string
	access_level: 'create' | 'create,read' | 'create,read,update' | 'create,read,update,delete'
	role: 'user' | 'admin'
}

export interface TableUser extends Omit<User, 'transactionIds' | 'updated_at' | '_id'> {}

export interface LoginResponse extends HttpCommonResponse {
	access_token: string
}

export interface GetUserResponse extends HttpCommonResponse {
	user: User
}

export interface GetUsersResponse extends CommonGetAllResponse {
	users: User[]
}
