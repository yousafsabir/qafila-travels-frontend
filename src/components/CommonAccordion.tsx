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
		classNames?: {
			wrapper?: string
			trigger?: string
			content?: string
		}
	}>
}

export function CommonAccordion(props: IAccordion) {
	return (
		<Accordion type='single' collapsible className={cn('w-full', props.className)}>
			{props.accordions.map((accordion, i) => (
				<AccordionItem value='item-1' className={cn(accordion.classNames?.wrapper)} key={i}>
					<AccordionTrigger className={cn('flex gap-2', accordion.classNames?.trigger)}>
						{accordion.label}
					</AccordionTrigger>
					<AccordionContent className={cn(accordion.classNames?.content)}>
						{accordion.content}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
