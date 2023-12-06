import { http } from '@/lib/config'
import { apiUrls } from '@/lib/apis'
import {
	GetUsersResponse,
	TableUser,
	CreateUser,
	User,
} from './interfaces'
import { LoginResponse } from '@/app/login/interfaces'

export function createUser(data: CreateUser) {
	return http.post<LoginResponse>(apiUrls.users.create, data)
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
