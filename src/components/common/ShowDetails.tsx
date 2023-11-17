import { CheckCircle2, X, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export function ShowDetails({ obj, close }: { obj: Record<string, any>; close: () => void }) {
	return (
		<div className='relative rounded-sm p-8'>
			{/* close */}
			<div className='absolute right-3 top-3'>
				<X className='h-6 w-6 cursor-pointer' onClick={close} />
			</div>
			<div className='grid grid-cols-2 gap-x-2 gap-y-4'>
				{obj &&
					Object.entries(obj).map(([key, value]) => (
						<div className='flex flex-col' key={key}>
							<label className='capitalize'>
								{key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ')}
							</label>
							{typeof value === 'boolean' ? (
								<p className='flex-1 rounded bg-gray-200 p-2'>
									{value ? (
										<CheckCircle2 className='h-4 w-4 text-green-500' />
									) : (
										<XCircle className='h-4 w-4 text-red-500' />
									)}
								</p>
							) : typeof value === 'object' && value[0] ? (
								<p className='flex-1 space-y-1 rounded bg-gray-200 p-2'>
									{(value as Array<any>).map((item, i) => (
										<p className='break-words ' key={i}>
											{i}. {item}
										</p>
									))}{' '}
								</p>
							) : (
								<p
									className='break-words flex-1 rounded bg-gray-200 p-2'
									onClick={() => {
										navigator.clipboard.writeText(value)
										toast.success('Copied')
									}}>
									{value}
								</p>
							)}
						</div>
					))}
			</div>
		</div>
	)
}
