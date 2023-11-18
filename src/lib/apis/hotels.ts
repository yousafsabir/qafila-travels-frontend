import { http } from '@/lib/config'
import { apiUrls } from '@/lib/apis'
import {
	GetHotelsResponse,
	CreateHotel
} from '@/lib/interfaces/hotels'

// export function userLogin(data: UserLogin) {
// 	return http.post<LoginResponse>(apiUrls.users.login, data)
// }

export function createHotel(data: CreateHotel) {
	return http.post<any>(apiUrls.hotels.create, data)
}

// export function getMe() {
// 	return http.get<GetUserResponse>(apiUrls.users.me)
// }

export function getHotel() {
	return http.get<GetHotelsResponse>(apiUrls.hotels.getAll)
}

export function getHotels() {
	return http.get<GetHotelsResponse>(apiUrls.hotels.getAll)
}
