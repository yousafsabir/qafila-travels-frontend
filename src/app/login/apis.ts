import { http } from '@/lib/config'
import { apiUrls } from '@/lib/apis'
import { UserLogin, LoginResponse } from './interfaces'

export function userLogin(data: UserLogin) {
	return http.post<LoginResponse>(apiUrls.users.login, data)
}
