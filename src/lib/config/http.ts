import ky from 'ky'

import { env } from './env'
import { HttpError } from '@/lib/interfaces'

export const httpClient = ky.create({
	prefixUrl: `${env.NEXT_PUBLIC_API_URL}/api`
})

class Http {
	constructor() {}

	private send<T>(
		type: 'get' | 'post' | 'put' | 'patch' | 'delete',
		url: string,
		data?: any | undefined,
	): Promise<T & HttpError> {
		if (['get', 'delete'].includes(type)) {
			return httpClient.get(url).json() as Promise<T & HttpError>
		}
		return httpClient[type](url, {
			json: data,
		}).json() as Promise<T & HttpError>
	}

	get<T>(url: string) {
		return this.send<T>('get', url)
	}
	post<T>(url: string, data: any) {
		return this.send<T>('post', url, data)
	}
	put<T>(url: string, data: any) {
		return this.send<T>('put', url, data)
	}
	patch<T>(url: string, data: any) {
		return this.send<T>('patch', url, data)
	}
	delete<T>(url: string) {
		return this.send<T>('delete', url)
	}
}

export const http = new Http()
