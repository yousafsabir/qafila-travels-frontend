import { http } from '@/lib/config'
import { apiUrls } from '@/lib/apis'
import { HttpCommonResponse } from '@/lib/interfaces'
import { GetUmrahResponse, GetUmrahsResponse, Umrah, CreateUmrah } from './interfaces'

export function createUmrah(data: CreateUmrah) {
	return http.post<any>(apiUrls.umrahs.create, data)
}

export function deleteUmrahs(ids: string[]) {
	return http.delete<any>(apiUrls.umrahs.deleteMultiple, { data: ids })
}

export function getUmrah(umrahId: string) {
	return http.post<GetUmrahResponse>(`${apiUrls.umrahs.getAll}/${umrahId}`, { id: umrahId })
}

export function getUmrahs(searchParams?: string) {
	return http.get<GetUmrahsResponse>(
		`${apiUrls.umrahs.getAll}${searchParams ? searchParams : ''}`,
	)
}

export function updateUmrah(data: Partial<Umrah>, umrahId: string) {
	return http.put<GetUmrahResponse>(`${apiUrls.umrahs.updateOne}/${umrahId}`, data)
}

export function uploadUmrahs(excel: File) {
	const formData = new FormData().append('file', excel)
	return http.put<HttpCommonResponse>(apiUrls.umrahs.upload, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	})
}
