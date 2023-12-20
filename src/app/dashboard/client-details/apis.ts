import { http } from '@/lib/config'
import { apiUrls } from '@/lib/apis'
import { HttpCommonResponse } from '@/lib/interfaces'
import {
	GetClientDetailsResponse,
	GetClientsDetailsResponse,
	ClientDetails,
	CreateClientDetails,
} from './interfaces'

export function createClientDetails(data: CreateClientDetails) {
	return http.post<any>(apiUrls.clientDetails.create, data)
}

export function deleteClientsDetails(ids: string[]) {
	return http.delete<any>(apiUrls.clientDetails.deleteMultiple, { data: ids })
}

export function getClientDetails(clientDetailId: string) {
	return http.post<GetClientDetailsResponse>(
		`${apiUrls.clientDetails.getAll}/${clientDetailId}`,
		{
			id: clientDetailId,
		},
	)
}

export function getClientsDetails(searchParams?: string) {
	return http.get<GetClientsDetailsResponse>(
		`${apiUrls.clientDetails.getAll}${searchParams ? searchParams : ''}`,
	)
}

export function updateClientDetails(data: Partial<ClientDetails>, clientDetailId: string) {
	return http.put<GetClientDetailsResponse>(
		`${apiUrls.clientDetails.updateOne}/${clientDetailId}`,
		data,
	)
}

export function uploadClientDetails(excel: File) {
	const formData = new FormData().append('file', excel)
	return http.post<HttpCommonResponse>(apiUrls.clientDetails.upload, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	})
}
