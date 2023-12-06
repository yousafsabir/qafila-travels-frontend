import { Metadata } from 'next'

import { UmrahsTable } from './Table'

export const metadata: Metadata = {
	title: 'Manage Umrahs | Qafila Dashboard',
	description: 'Qafila Travels Dashboard',
}

export default function Hotels() {
	return (
		<div className='flex flex-1 flex-col'>
			<UmrahsTable className='flex-1' />
		</div>
	)
}
