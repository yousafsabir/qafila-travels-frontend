import { Metadata } from 'next'

import { HotelsTable } from './Table'

export const metadata: Metadata = {
	title: 'Manage Hotels | Qafila Dashboard',
	description: 'Qafila Travels Dashboard',
}

export default function Hotels() {
	return (
		<div className='flex flex-1 flex-col'>
			<HotelsTable className='flex-1' />
		</div>
	)
}
