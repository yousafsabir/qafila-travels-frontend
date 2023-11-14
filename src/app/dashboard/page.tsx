'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import useStore from '@/lib/store'
import { DataTableDemo } from '@/components/dashboard'

export default function Dashboard() {
	const router = useRouter()

	const store = useStore()
	useEffect(() => {
		if (!store.admin) return router.push('/')
	}, [])
	return (
		<div className='flex flex-1'>
			<DataTableDemo className='flex-1' />
		</div>
	)
}
