import { http } from '@/lib/config'
import { apiUrls } from '@/lib/apis'
import { HttpCommonResponse } from '@/lib/interfaces'
import {
	GetTransportationsResponse,
	GetTransportationResponse,
	CreateTransportation,
	UpdateTransportation,
} from './interfaces'

export function createTransportation(data: CreateTransportation) {
	return http.post<any>(apiUrls.transportations.create, data)
}

export function deleteTransportations(ids: string[]) {
	return http.delete<any>(apiUrls.transportations.deleteMultiple, { data: ids })
}

export function getTransportation(transportationId: string) {
	return http.post<GetTransportationResponse>(apiUrls.transportations.getAll, {
		id: transportationId,
	})
}

export function getTransportations(searchParams?: string) {
	return http.get<GetTransportationsResponse>(
		`${apiUrls.transportations.getAll}${searchParams ? searchParams : ''}`,
	)
}

export function updateTransportation(data: UpdateTransportation) {
	return http.put<GetTransportationResponse>(apiUrls.transportations.updateOne, data)
}

export function uploadTransportations(excel: File) {
	const formData = new FormData().append('file', excel)
	return http.put<HttpCommonResponse>(apiUrls.transportations.upload, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	})
}
