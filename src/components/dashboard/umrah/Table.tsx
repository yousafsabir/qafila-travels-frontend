'use client'

import * as React from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Filter } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

import { useSearchQuery } from '@/lib/hooks'
import { TableUmrah, Umrah } from '@/lib/interfaces/umrahs'
import { useGetUmrahs, useCreateUmrah, useUpdateUmrah } from '@/lib/mutations/umrahs'
import {
	createUmrahForm,
	searchUmrahForm,
	updateUmrahForm,
} from '@/components/dashboard/umrah/forms'
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

export function UmrahsTable({ className }: { className?: string }) {
	const searchQuery = useSearchQuery()

	const umrahs = useGetUmrahs()
	const createUmrah = useCreateUmrah()
	const updateUmrah = useUpdateUmrah()
	const [detailUmrah, setDetailUmrah] = React.useState<Umrah | null>(null)
	const [formType, setFormType] = React.useState<'create' | 'edit'>('create')
	const formRef = React.useRef<React.ElementRef<'button'>>(null)
	const detailsRef = React.useRef<React.ElementRef<'button'>>(null)

	const onSubmit = async (values: any) => {
		await createUmrah.mutateAsync(values)
	}

	const onUpdate = async (values: any) => {
		await updateUmrah.mutateAsync({ ...values, _id: detailUmrah?._id || '' })
	}

	const viewUmrahDetails = (index: number) => {
		{
			if (umrahs.data?.umrahs && umrahs.data?.umrahs[index]) {
				setDetailUmrah(umrahs.data?.umrahs[index] as Umrah)
				detailsRef.current?.click()
			}
		}
	}

	const onEditUmrah = (index: number) => {
		if (umrahs.data?.umrahs && umrahs.data?.umrahs[index]) {
			setFormType('edit')
			setDetailUmrah(umrahs.data?.umrahs[index] as Umrah)
			formRef.current?.click()
		}
	}

	const columns: ColumnDef<TableUmrah>[] = [
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
			accessorKey: 'invoice_number',
			header: 'Invoice Number',
			cell: ({ row }) => <div>{row.getValue('invoice_number')}</div>,
		},
		{
			accessorKey: 'no_of_visas',
			header: 'No Of Visas',
			cell: ({ row }) => <div className='lowercase'>{row.getValue('no_of_visas')}</div>,
		},
		{
			accessorKey: 'cost_per_visa',
			header: 'Cost Per Visa',
			cell: ({ row }) => <div className='lowercase'>{row.getValue('cost_per_visa')}</div>,
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
							<DropdownMenuItem onClick={() => viewUmrahDetails(index)}>
								View Details
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => onEditUmrah(index)}>
								Edit Umrah
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
								formFields={searchUmrahForm}
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
				data={umrahs.data?.umrahs || []}
				loading={umrahs.isLoading}
				onCreate={() => {
					setFormType('create')
					formRef?.current?.click()
				}}
				page={searchQuery.pagination.page}
				limit={searchQuery.pagination.limit}
				lastPage={umrahs.data?.pagination.last_page || 0}
				totalDocuments={umrahs.data?.pagination.total_count || 0}
				setPage={searchQuery.setPage}
				setLimit={searchQuery.setLimit}
			/>
			<CommonModal ref={formRef}>
				<CommonForm
					type='modal'
					defaultObj={detailUmrah}
					operationType={formType}
					closeModal={() => formRef.current?.click()}
					formFields={formType === 'create' ? createUmrahForm : updateUmrahForm}
					submitText={formType === 'create' ? 'Create' : 'Update'}
					cancelText='Cancel'
					submitFunc={(values) =>
						formType === 'create' ? onSubmit(values) : onUpdate(values)
					}
				/>
			</CommonModal>
			<CommonModal ref={detailsRef}>
				<ShowDetails
					obj={detailUmrah ? detailUmrah : {}}
					close={() => detailsRef.current?.click()}
				/>
			</CommonModal>
		</div>
	)
}
