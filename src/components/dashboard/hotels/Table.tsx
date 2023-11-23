'use client'

import * as React from 'react'
import { ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import Loading from 'react-loading'

import { TableHotel, Hotel, CreateHotel } from '@/lib/interfaces/hotels'
import { useGetHotels, useCreateHotel, useUpdateHotel } from '@/lib/mutations/hotels'
import { createHotelForm, updateHotelForm } from '@/components/dashboard/hotels/forms'
import { cn } from '@/lib/utils'
import { Button } from '@/components/common/ui/button'
import { Checkbox } from '@/components/common/ui/checkbox'
import { CommonForm, CommonModal, ShowDetails } from '@/components/common'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu'
import { Input } from '@/components/common/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/common/ui/table'
import { getUsers } from '@/lib/apis/users'

export function HotelsTable({ className }: { className?: string }) {
	const hotels = useGetHotels()
	const createHotel = useCreateHotel()
	const updateHotel = useUpdateHotel()
	const [detailHotel, setDetailHotel] = React.useState<Hotel | null>(null)
	const [formType, setFormType] = React.useState<'create' | 'edit'>('create')

	const onSubmit = async (values: any) => {
		await createHotel.mutateAsync(values)
	}

	const onUpdate = async (values: any) => {
		await updateHotel.mutateAsync({ ...values, _id: detailHotel?._id || '' })
	}

	const onEditUser = (index: number) => {
		if (hotels.data?.hotels && hotels.data?.hotels[index]) {
			setFormType('edit')
			setDetailHotel(hotels.data?.hotels[index] as Hotel)
			formRef.current?.click()
		}
	}

	const viewHotelDetails = (index: number) => {
		{
			if (hotels.data?.hotels && hotels.data?.hotels[index]) {
				setDetailHotel(hotels.data?.hotels[index] as Hotel)
				detailsRef.current?.click()
			}
		}
	}

	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})
	const formRef = React.useRef<React.ElementRef<'button'>>(null)
	const detailsRef = React.useRef<React.ElementRef<'button'>>(null)

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
							<DropdownMenuItem onClick={() => onEditUser(index)}>
								Edit Hotel
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			},
		},
	]

	const table = useReactTable({
		data: hotels.data?.hotels || [],
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	})

	return (
		<div className={cn('w-full', className)}>
			<div className='flex items-center py-4'>
				<Input
					placeholder='Filter emails...'
					value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('email')?.setFilterValue(event.target.value)
					}
					className='max-w-sm'
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='ml-auto'>
							Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className='capitalize'
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}>
										{column.id}
									</DropdownMenuCheckboxItem>
								)
							})}
					</DropdownMenuContent>
				</DropdownMenu>
				<Button
					variant={'outline'}
					onClick={() => formRef?.current?.click()}
					className='ml-4'>
					Create
				</Button>
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{hotels.isLoading ? (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									<Loading
										type='spin'
										className='mx-auto'
										width={20}
										height={20}
										color='#777'
									/>
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='mt-auto flex items-center justify-end space-x-2 py-4'>
				<div className='text-muted-foreground flex-1 text-sm'>
					{table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className='space-x-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div>
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
