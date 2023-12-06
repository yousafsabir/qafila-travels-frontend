import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@tanstack/react-query'

import { queryClient } from '@/lib/config'
import { getUsers, createUser, updateUser, deleteUser } from './apis'
import { type CreateUser, type User } from './interfaces'

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
		onError: (e) => {
			toast.dismiss(loadingToast)
			toast.error(String(e))
		},
	})
}

export function useGetUsers(searchParams?: string) {
	return useQuery({
		queryKey: ['get_users', searchParams],
		queryFn: () => getUsers(searchParams),
	})
}

export function useUpdateUser() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['update_user'],
		mutationFn: async (params: User) => {
			loadingToast = toast.loading('Updating User')
			const res = await updateUser(params)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('User Updated')
				queryClient.invalidateQueries({ queryKey: ['get_users'] })
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

export function useDeleteUser() {
	let loadingToast: any
	return useMutation({
		mutationKey: ['delete_user'],
		mutationFn: async (params: { user_name: string }) => {
			loadingToast = toast.loading('Deleting User')
			const res = await deleteUser(params)
			return res
		},
		onSuccess: (response) => {
			toast.dismiss(loadingToast)
			if (response.status === 200) {
				toast.success('User Deleted')
				queryClient.invalidateQueries({ queryKey: ['get_users'] })
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
