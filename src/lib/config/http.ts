import axios from 'axios'

import { env } from './env'
import { HttpError } from '@/lib/interfaces'

// export const httpClient = ky.create({
// 	prefixUrl: `${env.NEXT_PUBLIC_API_URL}/api`
// })
export const httpClient = axios.create({
	baseURL: `${env.NEXT_PUBLIC_API_URL}/api`,
})

class Http {
	constructor() {}

	private async send<T>(
		type: 'get' | 'post' | 'put' | 'patch' | 'delete',
		url: string,
		data?: any | undefined,
	): Promise<T & HttpError> {
		if (['get', 'delete'].includes(type)) {
			return (await httpClient.get(url)).data as Promise<T & HttpError>
		}
		return (await httpClient[type](url, data)).data as Promise<T & HttpError>
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
