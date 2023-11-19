import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@tanstack/react-query'

import { queryClient } from '@/lib/config'
import { httpClient } from '@/lib/config'
import { getHotels, createHotel, updateHotel } from '@/lib/apis/hotels'
import { type Hotel, type CreateHotel } from '@/lib/interfaces/hotels'

// export function useLogin() {
// 	let loadingToast: any
// 	return useMutation({
// 		mutationKey: ['admin_login'],
// 		mutationFn: async (params: UserLogin) => {
// 			loadingToast = toast.loading('Logging In')
// 			const res = await userLogin(params)
// 			return res
// 		},
// 		onSuccess: (response) => {
// 			toast.dismiss(loadingToast)
// 			if (response.status === 200) {
// 				toast.success('Logged In')
// 				// setCookie('access_token', response.access_token, 30)
// 				httpClient.defaults.headers.common[
// 					'Authorization'
// 				] = `Bearer ${response.access_token}`
// 			} else {
// 				toast.error(`Error: ${response.message}`)
// 			}
// 		},
// 	})
// }

export function useCreateHotel() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['create_hotel'],
		mutationFn: async (params: CreateHotel) => {
			loadingToast = toast.loading('Adding Hotel')
			const res = await createHotel(params)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('Hotel Added')
				queryClient.invalidateQueries({ queryKey: ['get_hotels'] })
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

export function useUpdateHotel() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['update_hotel'],
		mutationFn: async (params: Partial<Hotel>) => {
			loadingToast = toast.loading('Updating Hotel')
			const res = await updateHotel(params)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('Hotel Updated')
				queryClient.invalidateQueries({ queryKey: ['get_hotels'] })
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

// export function useGetMe() {
// 	return useQuery({
// 		queryKey: ['get_me'],
// 		queryFn: () => {
// 			const authToken = getCookie('access_token')
// 			httpClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
// 			return getMe()
// 		},
// 	})
// }

export function useGetHotels() {
	return useQuery({
		queryKey: ['get_hotels'],
		queryFn: () => getHotels(),
	})
}

// export function useLogout() {
// 	return useMutation({
// 		mutationKey: ['admin_logout'],
// 		mutationFn: () => {
// 			setCookie('access_token', '', 0)
// 			delete httpClient.defaults.headers.common['Authorization']
// 			return new Promise((res) =>
// 				setTimeout(() => res({ message: 'Logged out', status: 200 }), 1000),
// 			)
// 		},
// 	})
// }
