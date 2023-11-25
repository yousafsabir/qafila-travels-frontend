import { http } from '@/lib/config'
import { apiUrls } from '@/lib/apis'
import { GetUmrahResponse, GetUmrahsResponse, Umrah, CreateUmrah } from '@/lib/interfaces/umrahs'

export function createUmrah(data: CreateUmrah) {
	return http.post<any>(apiUrls.umrahs.create, data)
}

export function deleteUmrah(umrahId: string) {
	return http.delete<any>(`${apiUrls.umrahs.deleteOne}/${umrahId}`)
}

export function getUmrah(umrahId: string) {
	return http.post<GetUmrahResponse>(`${apiUrls.umrahs.getAll}/${umrahId}`, { id: umrahId })
}

export function getUmrahs(searchParams?: string) {
	return http.get<GetUmrahsResponse>(`${apiUrls.umrahs.getAll}${searchParams ? searchParams : ''}`)
}

export function updateUmrah(data: Partial<Umrah>, umrahId: string) {
	return http.put<GetUmrahResponse>(`${apiUrls.umrahs.updateOne}/${umrahId}`, data)
}
