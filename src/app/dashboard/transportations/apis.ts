import { http } from '@/lib/config'
import { apiUrls } from '@/lib/apis'
import {
	GetTransportationsResponse,
	GetTransportationResponse,
	CreateTransportation,
	UpdateTransportation,
} from './interfaces'

export function createTransportation(data: CreateTransportation) {
	return http.post<any>(apiUrls.transportations.create, data)
}

export function deleteTransportation() {
	return http.delete<any>(apiUrls.users.me)
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
