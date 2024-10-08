'use client'

import * as React from 'react'
import { Filter } from 'lucide-react'

import { useSearchQuery } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { CommonTable, CommonForm, CommonAccordion, CommonModal, ShowDetails } from '@/components'
import { type User, type CreateUser, UserClass } from './interfaces'
import {
	useCreateUser,
	useGetUsers,
	useUpdateUser,
	useDeleteUsers,
	useUploadUsers,
} from './mutations'
import { createUserForm, updateUserForm, searchUserForm } from './forms'

export function UsersTable({ className }: { className?: string }) {
	const searchQuery = useSearchQuery()

	const users = useGetUsers(searchQuery.queryStr)
	const createUser = useCreateUser()
	const updateUser = useUpdateUser()
	const uploadUsers = useUploadUsers()
	const deleteUsers = useDeleteUsers()
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

	const onUploadUsers = async (file: File) => {
		await uploadUsers.mutateAsync(file)
	}

	const onDeleteUsers = async (ids: string[]) => {
		await deleteUsers.mutateAsync(ids)
	}

	const columns = Object.keys(new UserClass()).filter((column) => column !== '_id')

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
								extendedForm={searchUserForm}
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
				tableKey='users'
				columns={columns}
				hideRowActions={['create_invoice']}
				data={users.data?.users || []}
				loading={users.isLoading}
				onCreate={() => {
					setDetailUser(null)
					setFormType('create')
					formRef?.current?.click()
				}}
				onEdit={onEditUser}
				onUpload={onUploadUsers}
				onViewDetails={viewCustomerDetails}
				onDeleteMany={onDeleteUsers}
				page={searchQuery.pagination.page}
				limit={searchQuery.pagination.limit}
				lastPage={users.data?.pagination.last_page || 0}
				totalDocuments={users.data?.pagination.total_count || 0}
				setPage={searchQuery.setPage}
				setLimit={searchQuery.setLimit}
			/>
			<CommonModal ref={formRef} className='sm:min-w-[510px] lg:min-w-[800px]'>
				<CommonForm
					type='modal'
					defaultObj={detailUser}
					operationType={formType}
					closeModal={() => formRef.current?.click()}
					extendedForm={formType === 'create' ? createUserForm : updateUserForm}
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
