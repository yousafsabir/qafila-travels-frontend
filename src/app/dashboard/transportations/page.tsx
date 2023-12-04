import { Metadata } from 'next'

import { TransportationsTable } from '@/components/dashboard/transportations'

export const metadata: Metadata = {
	title: 'Manage Transportations | Qafila Dashboard',
	description: 'Qafila Travels Dashboard',
}

export default function Transportations() {
	return (
		<div className='flex flex-1 flex-col'>
			<TransportationsTable className='flex-1' />
		</div>
	)
}
