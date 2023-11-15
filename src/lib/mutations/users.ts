import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@tanstack/react-query'

import { queryClient } from '@/lib/config'
import { httpClient } from '@/lib/config'
import { getCookie, setCookie } from '@/lib/utils'
import { userLogin, getMe, getUsers, createUser } from '@/lib/apis/users'
import { type UserLogin, type CreateUser } from '@/lib/interfaces/users'

export function useLogin() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['admin_login'],
		mutationFn: async (params: UserLogin) => {
			loadingToast = toast.loading('Logging In')
			const res = await userLogin(params)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('Logged In')
				setCookie('access_token', response.access_token, 30)
				httpClient.defaults.headers.common[
					'Authorization'
				] = `Bearer ${response.access_token}`
			} else {
				toast.error(`Error: ${response.message}`)
			}
		},
	})
}

export function useCreateUser() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['create_user'],
		mutationFn: async (params: CreateUser) => {
			loadingToast = toast.loading('Adding User')
			const res = await createUser(params)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('User Added')
				queryClient.invalidateQueries({ queryKey: ['get_users'] })
			} else {
				toast.error(`Error: ${response.message}`)
			}
		},
	})
}

export function useGetMe() {
	return useQuery({
		queryKey: ['get_me'],
		queryFn: () => {
			const authToken = getCookie('access_token')
			httpClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
			return getMe()
		},
	})
}

export function useGetUsers() {
	return useQuery({
		queryKey: ['get_users'],
		queryFn: () => getUsers(),
	})
}

export function useLogout() {
	return useMutation({
		mutationKey: ['admin_logout'],
		mutationFn: () => {
			setCookie('access_token', '', 0)
			delete httpClient.defaults.headers.common['Authorization']
			return new Promise((res) =>
				setTimeout(() => res({ message: 'Logged out', status: 200 }), 1000),
			)
		},
	})
}
