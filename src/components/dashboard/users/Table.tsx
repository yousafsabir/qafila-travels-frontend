'use client'

import * as React from 'react'
import { CheckCircle2, XCircle, Filter } from 'lucide-react'
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'

import { useSearchQuery } from '@/lib/hooks'
import { type TableUser, type User, type CreateUser } from '@/lib/interfaces/users'
import { useCreateUser, useGetUsers, useUpdateUser } from '@/lib/mutations/users'
import { cn } from '@/lib/utils'
import { Button } from '@/components/common/ui/button'
import { Checkbox } from '@/components/common/ui/checkbox'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu'
import {
	CommonTable,
	CommonForm,
	CommonAccordion,
	CommonModal,
	ShowDetails,
} from '@/components/common'
import { createUserForm, updateUserForm, searchUserForm } from '@/components/dashboard/users/forms'

export function DataTableDemo({ className }: { className?: string }) {
	const searchQuery = useSearchQuery()

	const users = useGetUsers(searchQuery.queryStr)
	const createUser = useCreateUser()
	const updateUser = useUpdateUser()
	const [detailUser, setDetailUser] = React.useState<User | null>(null)
	const [formType, setFormType] = React.useState<'create' | 'edit'>('create')
	const formRef = React.useRef<React.ElementRef<'button'>>(null)
	const detailsRef = React.useRef<React.ElementRef<'button'>>(null)

	const onSubmit = async (values: CreateUser) => {
		await createUser.mutateAsync(values)
	}

	const onUpdate = async (values: any) => {
		await updateUser.mutateAsync({ ...values, _id: detailUser?._id || '' })
	}

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
								formFields={searchUserForm}
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
				data={users.data?.users || []}
				loading={users.isLoading}
				onCreate={() => {
					setFormType('create')
					formRef?.current?.click()
				}}
				page={searchQuery.pagination.page}
				limit={searchQuery.pagination.limit}
				lastPage={users.data?.pagination.last_page || 0}
				totalDocuments={users.data?.pagination.total_count || 0}
				setPage={searchQuery.setPage}
				setLimit={searchQuery.setLimit}
			/>
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
