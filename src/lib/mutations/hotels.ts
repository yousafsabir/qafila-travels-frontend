import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@tanstack/react-query'

import { queryClient } from '@/lib/config'
import { getHotels, createHotel, updateHotel } from '@/lib/apis/hotels'
import { type Hotel, type CreateHotel } from '@/lib/interfaces/hotels'

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

export function useGetHotels(searchParams?: string) {
	return useQuery({
		queryKey: ['get_hotels', searchParams],
		queryFn: () => getHotels(searchParams),
	})
}
