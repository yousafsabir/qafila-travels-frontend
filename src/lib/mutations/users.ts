import { useMutation, useQuery } from '@tanstack/react-query'

import { httpClient } from '@/lib/config'
import { getCookie, setCookie } from '@/lib/utils'
import { userLogin, getMe } from '@/lib/apis/users'
import { type UserLogin } from '@/lib/interfaces/users'

export function useLogin() {
	return useMutation({
		mutationKey: ['admin_login'],
		mutationFn: (params: UserLogin) => userLogin(params),
		onSuccess: (response) => {
			if (response.status === 200) {
				setCookie('access_token', response.access_token, 30)
				httpClient.defaults.headers.common[
					'Authorization'
				] = `Bearer ${response.access_token}`
			}
		},
	})
}

export function useGetMe() {
	return useQuery({
		queryKey: ['admin_logout'],
		queryFn: () => {
			const authToken = getCookie('access_token')
			console.log(authToken)
			if (authToken) {
				httpClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
				return getMe()
			}
			return new Promise((res) => res({ message: 'You need to log in', status: 400 }))
		},
	})
}

export function useLogout() {
	return useMutation({
		mutationKey: ['get_me'],
		mutationFn: () => {
			setCookie('access_token', '', 0)
			delete httpClient.defaults.headers.common['Authorization']
			return new Promise((res) => res({ message: 'Logged out', status: 200 }))
		},
	})
}
