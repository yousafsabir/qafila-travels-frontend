import { Dialog, DialogContent, DialogTrigger } from '@/components/common/ui/dialog'
import { forwardRef } from 'react'

export const CommonModal = forwardRef<
	HTMLButtonElement,
	{ closeModal?: (...args: any[]) => void; children: React.ReactNode }
>((props, triggerRef) => {
	return (
		<>
			<Dialog>
				<DialogTrigger ref={triggerRef} />
				<DialogContent className='w-auto p-0'>{props.children}</DialogContent>
			</Dialog>
		</>
	)
})

CommonModal.displayName = "CommonModal"
