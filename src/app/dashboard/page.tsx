import { Metadata } from 'next'

import { DataTableDemo } from '@/components/dashboard/users/Table'

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Qafila Travels Dashboard',
}

export default function Dashboard() {
	return (
		<div className='flex flex-1 flex-col'>
			<DataTableDemo className='flex-1' />
		</div>
	)
}
