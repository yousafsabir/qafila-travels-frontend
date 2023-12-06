import { HttpCommonResponse } from '@/lib/interfaces'
import { User } from '@/app/dashboard/users/interfaces'

export interface GetUserResponse extends HttpCommonResponse {
	user: User
}
