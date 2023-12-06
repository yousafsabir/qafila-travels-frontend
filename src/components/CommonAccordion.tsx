import { cn } from '@/lib/utils'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

interface IAccordion {
	className?: string
	accordions: Array<{
		label: React.ReactNode
		content: React.ReactNode
		wrapperClassName?: string
		triggerClassName?: string
		contentClassName?: string
	}>
}

export function CommonAccordion(props: IAccordion) {
	return (
		<Accordion type='single' collapsible className={cn('w-full', props.className)}>
			{props.accordions.map((accordion, i) => (
				<AccordionItem value='item-1' className={cn(accordion.wrapperClassName)} key={i}>
					<AccordionTrigger className={cn('flex gap-2', accordion.triggerClassName)}>
						{accordion.label}
					</AccordionTrigger>
					<AccordionContent className={cn(accordion.contentClassName)}>
						{accordion.content}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
