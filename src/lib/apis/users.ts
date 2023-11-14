import { http } from '@/lib/config'
import { apiUrls } from '@/lib/apis'
import { UserLogin, LoginResponse, GetUserResponse, TableUser } from '@/lib/interfaces/users'

export function userLogin(data: UserLogin) {
	return http.post<LoginResponse>(apiUrls.users.login, data)
}

export function getMe() {
	return http.get<GetUserResponse>(apiUrls.users.me)
}

export function getUsers() {
	return http.get<TableUser[]>(apiUrls.users.getAll)
}
