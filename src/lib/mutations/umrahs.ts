import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@tanstack/react-query'

import { queryClient } from '@/lib/config'
import { createUmrah, updateUmrah, getUmrahs } from '@/lib/apis/umrahs'
import { type Umrah, type CreateUmrah } from '@/lib/interfaces/umrahs'

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

export function useGetUmrahs(searchParams?: string) {
	return useQuery({
		queryKey: ['get_umrahs', searchParams],
		queryFn: () => getUmrahs(searchParams),
	})
}
