'use client'

import * as React from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Filter } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

import { useSearchQuery } from '@/lib/hooks'
import {
	TransportationTable,
	Transportation,
	CreateTransportation,
} from '@/lib/interfaces/transportations'
import {
	useGetTransportations,
	useCreateTransportation,
	useUpdateTransportation,
} from '@/lib/mutations/transportations'
import {
	createTransportationForm,
	searchTransportationForm,
	updateTransportationForm,
} from '@/components/dashboard/transportations/forms'
import { cn } from '@/lib/utils'
import { Button } from '@/components/common/ui/button'
import { Checkbox } from '@/components/common/ui/checkbox'
import {
	CommonForm,
	CommonModal,
	ShowDetails,
	CommonTable,
	CommonAccordion,
} from '@/components/common'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu'

export function TransportationsTable({ className }: { className?: string }) {
	const searchQuery = useSearchQuery()

	const transportations = useGetTransportations(searchQuery.queryStr)
	const createTransportation = useCreateTransportation()
	const updateTransportation = useUpdateTransportation()
	const [detailTransportation, setDetailTransportation] = React.useState<Transportation | null>(
		null,
	)
	const [formType, setFormType] = React.useState<'create' | 'edit'>('create')
	const formRef = React.useRef<React.ElementRef<'button'>>(null)
	const detailsRef = React.useRef<React.ElementRef<'button'>>(null)

	const onSubmit = async (values: any) => {
		await createTransportation.mutateAsync(values)
	}

	const onUpdate = async (values: any) => {
		await updateTransportation.mutateAsync({ ...values, _id: detailTransportation?._id || '' })
	}

	const viewTransportationDetails = (index: number) => {
		{
			if (
				transportations.data?.transportations &&
				transportations.data?.transportations[index]
			) {
				setDetailTransportation(
					transportations.data?.transportations[index] as Transportation,
				)
				detailsRef.current?.click()
			}
		}
	}

	const onEditTransportation = (index: number) => {
		if (transportations.data?.transportations && transportations.data?.transportations[index]) {
			setFormType('edit')
			setDetailTransportation(transportations.data?.transportations[index] as Transportation)
			formRef.current?.click()
		}
	}

	const columns: ColumnDef<TransportationTable>[] = [
		{
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllPageRowsSelected()}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label='Select all'
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label='Select row'
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: 'client_name',
			header: 'Client Name',
			cell: ({ row }) => <div>{row.getValue('client_name')}</div>,
		},
		{
			accessorKey: 'date_of_entry',
			header: 'Date Of Entry',
			cell: ({ row }) => <div className='lowercase'>{row.getValue('date_of_entry')}</div>,
		},
		{
			accessorKey: 'no_of_pax',
			header: () => <div className='text-center'>No Of Pax</div>,
			cell: ({ row }) => (
				<div className='flex justify-center font-medium'>{row.getValue('no_of_pax')}</div>
			),
		},
		{
			accessorKey: 'total_cost',
			header: () => <div className='text-center'>Total Cost</div>,
			cell: ({ row }) => (
				<div className='flex justify-center font-medium'>{row.getValue('total_cost')}</div>
			),
		},
		{
			id: 'actions',
			enableHiding: false,
			cell: ({ row }) => {
				const user = row.original
				const index = row.index

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='h-8 w-8 p-0'>
								<span className='sr-only'>Open menu</span>
								<DotsHorizontalIcon className='h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => viewTransportationDetails(index)}>
								View Details
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => onEditTransportation(index)}>
								Edit Transportation
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			},
		},
	]

	return (
		<div className={cn('w-full', className)}>
			<CommonAccordion
				accordions={[
					{
						label: (
							<div className='flex gap-2'>
								<Filter className='h-6 w-6' />
								Filters
							</div>
						),
						content: (
							<CommonForm
								type='form'
								defaultObj={searchQuery.filterObj}
								operationType='edit'
								formFields={searchTransportationForm}
								submitText='Search'
								cancelText='Cancel'
								submitFunc={searchQuery.setQuery}
							/>
						),
					},
				]}
			/>
			<hr className='bg-gray-300' />
			<CommonTable
				columns={columns}
				data={transportations.data?.transportations || []}
				loading={transportations.isLoading}
				onCreate={() => {
					setFormType('create')
					formRef?.current?.click()
				}}
				page={searchQuery.pagination.page}
				limit={searchQuery.pagination.limit}
				lastPage={transportations.data?.pagination.last_page || 0}
				totalDocuments={transportations.data?.pagination.total_count || 0}
				setPage={searchQuery.setPage}
				setLimit={searchQuery.setLimit}
			/>
			<CommonModal ref={formRef}>
				<CommonForm
					type='modal'
					defaultObj={detailTransportation}
					operationType={formType}
					closeModal={() => formRef.current?.click()}
					formFields={
						formType === 'create' ? createTransportationForm : updateTransportationForm
					}
					submitText={formType === 'create' ? 'Create' : 'Update'}
					cancelText='Cancel'
					submitFunc={(values) =>
						formType === 'create'
							? onSubmit(values as CreateTransportation)
							: onUpdate(values as any)
					}
				/>
			</CommonModal>
			<CommonModal ref={detailsRef}>
				<ShowDetails
					obj={detailTransportation ? detailTransportation : {}}
					close={() => detailsRef.current?.click()}
				/>
			</CommonModal>
		</div>
	)
}
