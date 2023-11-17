'use client'

import * as React from 'react'
import { format } from 'fecha'
import { CheckCircle2, XCircle, X } from 'lucide-react'
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
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
import toast from 'react-hot-toast'

import { TableUser, User } from '@/lib/interfaces/users'
import { useGetUsers } from '@/lib/mutations/users'
import { FormModal } from '@/components/dashboard/users/FormModal'
import { cn } from '@/lib/utils'
import { Button } from '@/components/common/ui/button'
import { Checkbox } from '@/components/common/ui/checkbox'
import { CommonModal } from '@/components/common/Dialog'
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

export function DataTableDemo({ className }: { className?: string }) {
	const users = useGetUsers()

	const [sorting, setSorting] = React.useState<SortingState>([])
	const [detailUser, setDetailUser] = React.useState<User | null>(null)
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})
	const formRef = React.useRef<React.ElementRef<'button'>>(null)
	const detailsRef = React.useRef<React.ElementRef<'button'>>(null)

	const viewCustomerDetails = (index: number) => {
		{
			if (users.data && users.data[index]) {
				setDetailUser(users.data[index] as User)
			}
		}
	}

	React.useEffect(() => {
		if (detailUser) {
			detailsRef.current?.click()
		}
	}, [detailUser])

	const columns: ColumnDef<TableUser>[] = [
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
			accessorKey: 'username',
			header: 'Username',
			cell: ({ row }) => <div>{row.getValue('username')}</div>,
		},
		{
			accessorKey: 'email',
			header: ({ column }) => {
				return (
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Email
						<CaretSortIcon className='ml-2 h-4 w-4' />
					</Button>
				)
			},
			cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
		},
		{
			accessorKey: 'isVerified',
			header: () => <div className='text-center'>Is Verified</div>,
			cell: ({ row }) => (
				<div className='flex justify-center font-medium'>
					{row.getValue('isVerified') ? (
						<CheckCircle2 className='h-4 w-4 text-green-500' />
					) : (
						<XCircle className='h-4 w-4 text-red-500' />
					)}
				</div>
			),
		},
		{
			accessorKey: 'isCreator',
			header: () => <div className='text-center'>Is Creator</div>,
			cell: ({ row }) => (
				<div className='flex justify-center font-medium'>
					{row.getValue('isCreator') ? (
						<CheckCircle2 className='h-4 w-4 text-green-500' />
					) : (
						<XCircle className='h-4 w-4 text-red-500' />
					)}
				</div>
			),
		},
		{
			accessorKey: 'isBanned',
			header: () => <div className='text-center'>Is Banned</div>,
			cell: ({ row }) => (
				<div className='flex justify-center font-medium'>
					{row.getValue('isBanned') ? (
						<CheckCircle2 className='h-4 w-4 text-green-500' />
					) : (
						<XCircle className='h-4 w-4 text-red-500' />
					)}
				</div>
			),
		},
		{
			accessorKey: 'role',
			header: 'Role',
			cell: ({ row }) => <div className='font-medium'>{row.getValue('role')}</div>,
		},
		{
			accessorKey: 'created_at',
			header: () => <div className='text-right'>Created At</div>,
			cell: ({ row }) => (
				<div className='text-right font-medium'>{row.getValue('created_at')}</div>
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
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText(user.email)}>
								Copy User Email
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => viewCustomerDetails(index)}>
								View customer
							</DropdownMenuItem>
							<DropdownMenuItem>View payment details</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			},
		},
	]

	const table = useReactTable({
		data: users.data || [],
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
						{table.getRowModel().rows?.length ? (
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
				<FormModal closeModal={() => formRef.current?.click()} />
			</CommonModal>
			<CommonModal ref={detailsRef}>
				<div className='relative rounded-sm p-8'>
					{/* close */}
					<div className='absolute right-2 top-2'>
						<X
							className='h-4 w-4 cursor-pointer'
							onClick={() => detailsRef.current?.click()}
						/>
					</div>
					<div className='grid grid-cols-2 gap-x-2 gap-y-4'>
						{detailUser &&
							Object.entries(detailUser).map(([key, value]) => (
								<div className='flex flex-col'>
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
												<p>
													{i}. {item}
												</p>
											))}{' '}
										</p>
									) : (
										<p
											className='flex-1 rounded bg-gray-200 p-2'
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
			</CommonModal>
		</div>
	)
}
