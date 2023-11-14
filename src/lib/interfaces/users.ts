import { HttpCommonResponse } from './http'

export interface UserLogin {
	email: string
	password: string
}

export interface UserInResponse extends HttpCommonResponse {
	access_token: string
}
