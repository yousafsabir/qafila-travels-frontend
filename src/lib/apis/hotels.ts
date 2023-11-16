import { http } from '@/lib/config'
import { apiUrls } from '@/lib/apis'
import {
	GetHotelsResponse
} from '@/lib/interfaces/hotels'

// export function userLogin(data: UserLogin) {
// 	return http.post<LoginResponse>(apiUrls.users.login, data)
// }

// export function createUser(data: CreateUser) {
// 	return http.post<LoginResponse>(apiUrls.users.create, data)
// }

// export function getMe() {
// 	return http.get<GetUserResponse>(apiUrls.users.me)
// }

export function getHotels() {
	return http.get<GetHotelsResponse>(apiUrls.hotels.getAll)
}
