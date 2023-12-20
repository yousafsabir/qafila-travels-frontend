import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@tanstack/react-query'

import { queryClient } from '@/lib/config'
import {
	createClientDetails,
	updateClientDetails,
	getClientsDetails,
	deleteClientsDetails,
	uploadClientDetails,
} from './apis'
import { type ClientDetails, type CreateClientDetails } from './interfaces'

export function useCreateClientDetails() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['create_client_details'],
		mutationFn: async (params: CreateClientDetails) => {
			loadingToast = toast.loading('Adding ')
			const res = await createClientDetails(params)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('Client Details Added')
				queryClient.invalidateQueries({ queryKey: ['get_clients_details'] })
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

export function useUpdateClientDetails() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['update_client_details'],
		mutationFn: async (params: { data: Partial<ClientDetails>; id: string }) => {
			loadingToast = toast.loading('Updating Client Details')
			const res = await updateClientDetails(params.data, params.id)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('Client Details Updated')
				queryClient.invalidateQueries({ queryKey: ['get_clients_details'] })
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

export function useUploadClientsDetails() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['upload_clients_details'],
		mutationFn: async (param: File) => {
			loadingToast = toast.loading('Uploading Client Details')
			const res = await uploadClientDetails(param)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('Client Details Uploaded')
				queryClient.invalidateQueries({ queryKey: ['get_clients_details'] })
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

export function useDeleteClientsDetails() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['delete_clients_details'],
		mutationFn: async (ids: string[]) => {
			loadingToast = toast.loading('Deleting Client Details')
			const res = await deleteClientsDetails(ids)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('Client Details Deleted')
				queryClient.invalidateQueries({ queryKey: ['get_clients_details'] })
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

export function useGetClientsDetails(searchParams?: string) {
	return useQuery({
		queryKey: ['get_clients_details', searchParams],
		queryFn: () => getClientsDetails(searchParams),
	})
}
