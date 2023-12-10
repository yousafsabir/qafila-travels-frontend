import { http } from '@/lib/config'
import { apiUrls } from '@/lib/apis'
import { Hotel, GetHotelsResponse, GetHotelResponse, CreateHotel } from './interfaces'
import { HttpCommonResponse } from '@/lib/interfaces'

export function createHotel(data: CreateHotel) {
	return http.post<any>(apiUrls.hotels.create, data)
}

export function deleteHotels(ids: string[]) {
	return http.delete<any>(apiUrls.hotels.deleteMultiple, { data: ids })
}

export function getHotel(hotelId: string) {
	return http.post<GetHotelResponse>(apiUrls.hotels.getAll, { id: hotelId })
}

export function getHotels(searchParams?: string) {
	return http.get<GetHotelsResponse>(
		`${apiUrls.hotels.getAll}${searchParams ? searchParams : ''}`,
	)
}

export function updateHotel(data: Partial<Hotel>) {
	return http.put<GetHotelResponse>(apiUrls.hotels.updateOne, data)
}

export function uploadHotels(excel: File) {
	const formData = new FormData().append('file', excel)
	return http.post<HttpCommonResponse>(apiUrls.hotels.upload, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	})
}
