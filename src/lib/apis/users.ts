import { http } from '@/lib/config'
import { apiUrls } from '@/lib/apis'
import {
	UserLogin,
	LoginResponse,
	GetUserResponse,
	GetUsersResponse,
	TableUser,
	CreateUser,
	User,
} from '@/lib/interfaces/users'

export function userLogin(data: UserLogin) {
	return http.post<LoginResponse>(apiUrls.users.login, data)
}

export function createUser(data: CreateUser) {
	return http.post<LoginResponse>(apiUrls.users.create, data)
}

export function getMe() {
	return http.get<GetUserResponse>(apiUrls.users.me)
}

export function getUsers(searchParams?: string) {
	return http.get<GetUsersResponse>(`${apiUrls.users.getAll}${searchParams ? searchParams : ''}`)
}

export function updateUser(data: User) {
	return http.put<TableUser[]>(apiUrls.users.update, data)
}

export function deleteUser(data: { user_name: string }) {
	return http.delete<TableUser[]>(apiUrls.users.delete, data)
}
