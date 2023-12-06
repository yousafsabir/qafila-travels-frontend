import { http } from '@/lib/config'
import { apiUrls } from '@/lib/apis'
import { GetUserResponse } from './interfaces'

export function getMe() {
	return http.get<GetUserResponse>(apiUrls.users.me)
}
