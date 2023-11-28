import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/common/ui/accordion'

interface IAccordion {
	label: React.ReactNode
	content: React.ReactNode
}

export function CommonAccordion(props: IAccordion) {
	return (
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='item-1'>
				<AccordionTrigger className='flex gap-2'>{props.label}</AccordionTrigger>
				<AccordionContent>{props.content}</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
