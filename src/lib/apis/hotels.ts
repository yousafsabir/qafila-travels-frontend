import { http } from '@/lib/config'
import { apiUrls } from '@/lib/apis'
import { Hotel } from '@/lib/interfaces/hotels'
import { GetHotelsResponse, GetHotelResponse, CreateHotel } from '@/lib/interfaces/hotels'

// export function userLogin(data: UserLogin) {
// 	return http.post<LoginResponse>(apiUrls.users.login, data)
// }

export function createHotel(data: CreateHotel) {
	return http.post<any>(apiUrls.hotels.create, data)
}

export function deleteHotel() {
	return http.delete<any>(apiUrls.users.me)
}

export function getHotel(hotelId: string) {
	return http.post<GetHotelResponse>(apiUrls.hotels.getAll, { id: hotelId })
}

export function getHotels() {
	return http.get<GetHotelsResponse>(apiUrls.hotels.getAll)
}

export function updateHotel(data: Partial<Hotel>) {
	return http.put<GetHotelResponse>(apiUrls.hotels.updateOne, data)
}
