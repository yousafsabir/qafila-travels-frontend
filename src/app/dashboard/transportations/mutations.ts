import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@tanstack/react-query'

import { queryClient } from '@/lib/config'
import {
	getTransportations,
	createTransportation,
	updateTransportation,
	deleteTransportations,
	uploadTransportations,
} from './apis'
import { type Transportation, type CreateTransportation } from './interfaces'

export function useCreateTransportation() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['create_transportation'],
		mutationFn: async (params: CreateTransportation) => {
			loadingToast = toast.loading('Adding Transportation')
			const res = await createTransportation(params)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('Transportation Added')
				queryClient.invalidateQueries({ queryKey: ['get_transportations'] })
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

export function useUpdateTransportation() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['update_transportation'],
		mutationFn: async (params: Partial<Transportation>) => {
			loadingToast = toast.loading('Updating Transportation')
			const res = await updateTransportation(params)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('Transportation Updated')
				queryClient.invalidateQueries({ queryKey: ['get_transportations'] })
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

export function useUploadTransportations() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['upload_transportations'],
		mutationFn: async (param: File) => {
			loadingToast = toast.loading('Uploading Transportations')
			const res = await uploadTransportations(param)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('Transportations Uploaded')
				queryClient.invalidateQueries({ queryKey: ['get_transportations'] })
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

export function useDeleteTransportations() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['delete_transportations'],
		mutationFn: async (ids: string[]) => {
			loadingToast = toast.loading('Deleting Transportations')
			const res = await deleteTransportations(ids)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('Transportations Deleted')
				queryClient.invalidateQueries({ queryKey: ['get_transportations'] })
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

export function useGetTransportations(searchParams?: string) {
	return useQuery({
		queryKey: ['get_transportations', searchParams],
		queryFn: () => getTransportations(searchParams),
	})
}
