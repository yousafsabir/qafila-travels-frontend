'use client'

import * as React from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'

import { useSearchQuery } from '@/lib/hooks'
import { TableHotel, Hotel, CreateHotel } from '@/lib/interfaces/hotels'
import { useGetHotels, useCreateHotel, useUpdateHotel } from '@/lib/mutations/hotels'
import { createHotelForm, searchHotelForm, updateHotelForm } from '@/components/dashboard/hotels/forms'
import { cn } from '@/lib/utils'
import { Button } from '@/components/common/ui/button'
import { Checkbox } from '@/components/common/ui/checkbox'
import { CommonForm, CommonModal, ShowDetails, CommonTable } from '@/components/common'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu'

export function HotelsTable({ className }: { className?: string }) {
	const searchQuery = useSearchQuery()

	const hotels = useGetHotels(searchQuery.queryStr)
	const createHotel = useCreateHotel()
	const updateHotel = useUpdateHotel()
	const [detailHotel, setDetailHotel] = React.useState<Hotel | null>(null)
	const [formType, setFormType] = React.useState<'create' | 'edit'>('create')
	const formRef = React.useRef<React.ElementRef<'button'>>(null)
	const detailsRef = React.useRef<React.ElementRef<'button'>>(null)

	const onSubmit = async (values: any) => {
		await createHotel.mutateAsync(values)
	}

	const onUpdate = async (values: any) => {
		await updateHotel.mutateAsync({ ...values, _id: detailHotel?._id || '' })
	}

	const viewHotelDetails = (index: number) => {
		{
			if (hotels.data?.hotels && hotels.data?.hotels[index]) {
				setDetailHotel(hotels.data?.hotels[index] as Hotel)
				detailsRef.current?.click()
			}
		}
	}
	
	const onEditHotel = (index: number) => {
		if (hotels.data?.hotels && hotels.data?.hotels[index]) {
			setFormType('edit')
			setDetailHotel(hotels.data?.hotels[index] as Hotel)
			formRef.current?.click()
		}
	}

	const columns: ColumnDef<TableHotel>[] = [
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
			accessorKey: 'hotel_name',
			header: 'Hotel Name',
			cell: ({ row }) => <div className='lowercase'>{row.getValue('hotel_name')}</div>,
		},
		{
			accessorKey: 'hotel_sr_no',
			header: () => <div className='text-center'>Hotel Sr No.</div>,
			cell: ({ row }) => (
				<div className='flex justify-center font-medium'>{row.getValue('hotel_sr_no')}</div>
			),
		},
		{
			accessorKey: 'hcn_number',
			header: () => <div className='text-center'>HCN No.</div>,
			cell: ({ row }) => (
				<div className='flex justify-center font-medium'>{row.getValue('hcn_number')}</div>
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
							<DropdownMenuItem onClick={() => viewHotelDetails(index)}>
								View Details
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => onEditHotel(index)}>
								Edit Hotel
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			},
		},
	]

	return (
		<div className={cn('w-full', className)}>
			<CommonForm
				type='form'
				defaultObj={searchQuery.filterObj}
				operationType='edit'
				formFields={searchHotelForm}
				submitText='Search'
				cancelText='Cancel'
				submitFunc={searchQuery.setQuery}
			/>
			<hr className='bg-gray-300' />
			<CommonTable
				columns={columns}
				data={hotels.data?.hotels || []}
				loading={hotels.isLoading}
				onCreate={() => {
					setFormType('create')
					formRef?.current?.click()
				}}
				page={searchQuery.pagination.page}
				limit={searchQuery.pagination.limit}
				lastPage={hotels.data?.pagination.last_page || 0}
				totalDocuments={hotels.data?.pagination.total_count || 0}
				setPage={searchQuery.setPage}
				setLimit={searchQuery.setLimit}
			/>
			<CommonModal ref={formRef}>
				<CommonForm
					type='modal'
					defaultObj={detailHotel}
					operationType={formType}
					closeModal={() => formRef.current?.click()}
					formFields={formType === 'create' ? createHotelForm : updateHotelForm}
					submitText={formType === 'create' ? 'Create' : 'Update'}
					cancelText='Cancel'
					submitFunc={(values) =>
						formType === 'create'
							? onSubmit(values as CreateHotel)
							: onUpdate(values as any)
					}
				/>
			</CommonModal>
			<CommonModal ref={detailsRef}>
				<ShowDetails
					obj={detailHotel ? detailHotel : {}}
					close={() => detailsRef.current?.click()}
				/>
			</CommonModal>
		</div>
	)
}
