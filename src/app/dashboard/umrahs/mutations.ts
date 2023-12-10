import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@tanstack/react-query'

import { queryClient } from '@/lib/config'
import { createUmrah, updateUmrah, getUmrahs, deleteUmrahs, uploadUmrahs } from './apis'
import { type Umrah, type CreateUmrah } from './interfaces'

export function useCreateUmrah() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['create_umrah'],
		mutationFn: async (params: CreateUmrah) => {
			loadingToast = toast.loading('Adding Umrah')
			const res = await createUmrah(params)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('Umrah Added')
				queryClient.invalidateQueries({ queryKey: ['get_umrahs'] })
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

export function useUpdateUmrah() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['update_umrah'],
		mutationFn: async (params: { data: Partial<Umrah>; id: string }) => {
			loadingToast = toast.loading('Updating Umrah')
			const res = await updateUmrah(params.data, params.id)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('Umrah Updated')
				queryClient.invalidateQueries({ queryKey: ['get_umrahs'] })
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

export function useUploadUmrahs() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['upload_umrahs'],
		mutationFn: async (param: File) => {
			loadingToast = toast.loading('Uploading Umrahs')
			const res = await uploadUmrahs(param)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('Umrahs Uploaded')
				queryClient.invalidateQueries({ queryKey: ['get_umrahs'] })
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

export function useDeleteUmrahs() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['delete_umrahs'],
		mutationFn: async (ids: string[]) => {
			loadingToast = toast.loading('Deleting Umrahs')
			const res = await deleteUmrahs(ids)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('Umrahs Deleted')
				queryClient.invalidateQueries({ queryKey: ['get_umrahs'] })
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

export function useGetUmrahs(searchParams?: string) {
	return useQuery({
		queryKey: ['get_umrahs', searchParams],
		queryFn: () => getUmrahs(searchParams),
	})
}
