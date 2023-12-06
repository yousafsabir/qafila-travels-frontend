import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

import { httpClient } from '@/lib/config'
import { setCookie } from '@/lib/utils'
import { userLogin } from './apis'
import { type UserLogin } from './interfaces'

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
		onError: (e) => {
			toast.dismiss(loadingToast)
			toast.error(String(e))
		},
	})
}
