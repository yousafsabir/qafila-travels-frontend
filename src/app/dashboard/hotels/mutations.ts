import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@tanstack/react-query'

import { queryClient } from '@/lib/config'
import { getHotels, createHotel, updateHotel, deleteHotels, uploadHotels } from './apis'
import { type Hotel, type CreateHotel } from './interfaces'

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

export function useUploadHotels() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['upload_hotels'],
		mutationFn: async (param: File) => {
			loadingToast = toast.loading('Uploading Hotels')
			const res = await uploadHotels(param)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('Hotels Uploaded')
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

export function useDeleteHotels() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['delete_hotels'],
		mutationFn: async (ids: string[]) => {
			loadingToast = toast.loading('Deleting Hotels')
			const res = await deleteHotels(ids)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('Hotels Deleted')
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
