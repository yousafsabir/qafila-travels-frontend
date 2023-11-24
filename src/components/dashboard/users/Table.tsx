'use client'

import * as React from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
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
import Loading from 'react-loading'

import { useSearchQuery } from '@/lib/hooks'
import { type TableUser, type User, type CreateUser } from '@/lib/interfaces/users'
import { useCreateUser, useGetUsers, useUpdateUser } from '@/lib/mutations/users'
import { cn } from '@/lib/utils'
import { Button } from '@/components/common/ui/button'
import { Checkbox } from '@/components/common/ui/checkbox'
import { CommonModal, ShowDetails } from '@/components/common'
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
import { CommonForm } from '@/components/common'
import { createUserForm, updateUserForm, searchUserForm } from '@/components/dashboard/users/forms'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/common/ui/table'

export function DataTableDemo({ className }: { className?: string }) {
	const searchQuery = useSearchQuery()

	// const users = React.useMemo(() => useGetUsers(searchQuery.queryStr), [])
	const users = useGetUsers(searchQuery.queryStr)
	const createUser = useCreateUser()
	const updateUser = useUpdateUser()
	const [detailUser, setDetailUser] = React.useState<User | null>(null)

	const onSubmit = async (values: CreateUser) => {
		await createUser.mutateAsync(values)
	}

	const onUpdate = async (values: any) => {
		await updateUser.mutateAsync({ ...values, _id: detailUser?._id || '' })
	}

	const [sorting, setSorting] = React.useState<SortingState>([])
	const [formType, setFormType] = React.useState<'create' | 'edit'>('create')
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})
	const formRef = React.useRef<React.ElementRef<'button'>>(null)
	const detailsRef = React.useRef<React.ElementRef<'button'>>(null)

	const viewCustomerDetails = (index: number) => {
		if (users.data && users.data.users[index]) {
			setDetailUser(users.data.users[index] as User)
			detailsRef.current?.click()
		}
	}

	const onEditUser = (index: number) => {
		if (users.data && users.data.users[index]) {
			setFormType('edit')
			setDetailUser(users.data.users[index] as User)
			formRef.current?.click()
		}
	}

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
			accessorKey: 'user_name',
			header: 'Username',
			cell: ({ row }) => <div>{row.getValue('user_name')}</div>,
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
								View User
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => onEditUser(index)}>
								Edit User
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			},
		},
	]

	const table = useReactTable({
		data: users.data?.users || [],
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel({ initialSync: true }),
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
			<CommonForm
				type='form'
				defaultObj={searchQuery.filterObj}
				operationType='edit'
				formFields={searchUserForm}
				submitText='Search'
				cancelText='Cancel'
				submitFunc={searchQuery.setQuery}
			/>
			<hr className='bg-gray-300' />
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
					onClick={() => {
						setFormType('create')
						formRef?.current?.click()
					}}
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
						{users.isLoading ? (
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
					defaultObj={detailUser}
					operationType={formType}
					closeModal={() => formRef.current?.click()}
					formFields={formType === 'create' ? createUserForm : updateUserForm}
					submitText={formType === 'create' ? 'Create' : 'Update'}
					cancelText='Cancel'
					submitFunc={(values) =>
						formType === 'create'
							? onSubmit(values as CreateUser)
							: onUpdate(values as any)
					}
				/>
			</CommonModal>
			<CommonModal ref={detailsRef}>
				<ShowDetails
					obj={detailUser ? detailUser : {}}
					close={() => detailsRef.current?.click()}
				/>
			</CommonModal>
		</div>
	)
}
