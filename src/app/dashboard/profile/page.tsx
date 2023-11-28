'use client'

import useStore from '@/lib/store'
import { ShowDetails } from '@/components/common'

export default function Profile() {
	const { admin } = useStore()
	return (
		<main className='flex-1'>
			<h2 className='mb-5 text-center text-4xl font-semibold'>Profile Info</h2>
			<ShowDetails obj={admin || {}} className='max-w-3xl mx-auto' />
		</main>
	)
}
