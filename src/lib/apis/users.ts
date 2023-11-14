import { http } from '@/lib/config'
import { apiUrls } from '@/lib/apis'
import { UserLogin, UserInResponse } from '@/lib/interfaces/users'

export function userLogin(data: UserLogin) {
	return http.post<UserInResponse>(apiUrls.users.login, data)
}
