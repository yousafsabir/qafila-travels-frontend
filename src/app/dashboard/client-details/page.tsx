import { Metadata } from 'next'

import { ClientsDetailsTable } from './Table'

export const metadata: Metadata = {
	title: 'Manage Umrahs | Qafila Dashboard',
	description: 'Qafila Travels Dashboard',
}

export default function Hotels() {
	return (
		<div className='flex flex-1 flex-col'>
			<ClientsDetailsTable className='flex-1' />
		</div>
	)
}
