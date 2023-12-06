'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import ReactLoading from 'react-loading'

import { useGetMe } from './mutations'
import useStore from '@/lib/store'

export default function Home() {
	const router = useRouter()

	const store = useStore()

	const getMe = useGetMe()

	useEffect(() => {
		if ((!getMe.isLoading && getMe.isError) || getMe.isSuccess) {
			if (getMe.data && getMe.data.user) {
				store.setAdmin(getMe.data.user)
				router.push(store.url ?? '/dashboard')
			} else {
				toast.error('You need to Login')
				router.push('/login')
			}
		}
	}, [getMe.isSuccess, getMe.isLoading, getMe.isError])

	if (getMe.isLoading)
		return (
			<main className='flex min-h-screen items-center justify-center'>
				<ReactLoading type='spin' width={40} height={40} color='#777' />
			</main>
		)

	return <main></main>
}
