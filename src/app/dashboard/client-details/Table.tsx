'use client'

import * as React from 'react'
import { Filter } from 'lucide-react'

import { useSearchQuery } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { CommonForm, CommonModal, ShowDetails, CommonTable, CommonAccordion } from '@/components'
import { type ClientDetails, ClientDetailsClass } from './interfaces'
import {
	useGetClientsDetails,
	useCreateClientDetails,
	useUpdateClientDetails,
	useDeleteClientsDetails,
	useUploadClientsDetails,
} from './mutations'
import { createClientDetailsForm, searchClientDetailsForm, updateClientDetailsForm } from './forms'

export function ClientsDetailsTable({ className }: { className?: string }) {
	const searchQuery = useSearchQuery()

	const clientsDetails = useGetClientsDetails()
	const createClientDetails = useCreateClientDetails()
	const updateClientDetails = useUpdateClientDetails()
	const uploadClientsDetails = useUploadClientsDetails()
	const deleteClientsDetails = useDeleteClientsDetails()
	const [detailClientDetails, setDetailClientDetails] = React.useState<ClientDetails | null>(null)
	const [formType, setFormType] = React.useState<'create' | 'edit'>('create')
	const formRef = React.useRef<React.ElementRef<'button'>>(null)
	const detailsRef = React.useRef<React.ElementRef<'button'>>(null)

	const onSubmit = async (values: any) => {
		await createClientDetails.mutateAsync(values)
	}

	const onUpdate = async (values: any) => {
		await updateClientDetails.mutateAsync({ ...values, _id: detailClientDetails?._id || '' })
	}

	const viewClientDetailsDetails = (index: number) => {
		{
			if (clientsDetails.data?.client_details && clientsDetails.data?.client_details[index]) {
				setDetailClientDetails(clientsDetails.data?.client_details[index] as ClientDetails)
				detailsRef.current?.click()
			}
		}
	}

	const onUploadClientsDetails = async (file: File) => {
		await uploadClientsDetails.mutateAsync(file)
	}

	const onEditClientDetails = (index: number) => {
		if (clientsDetails.data?.client_details && clientsDetails.data?.client_details[index]) {
			setFormType('edit')
			setDetailClientDetails(clientsDetails.data?.client_details[index] as ClientDetails)
			formRef.current?.click()
		}
	}

	const onDeleteClientsDetails = async (ids: string[]) => {
		await deleteClientsDetails.mutateAsync(ids)
	}

	const columns = Object.keys(new ClientDetailsClass()).filter((column) => column !== '_id')

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
								extendedForm={searchClientDetailsForm}
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
				tableKey='clientsDetails'
				columns={columns}
				data={clientsDetails.data?.client_details || []}
				loading={clientsDetails.isLoading}
				onCreate={() => {
					setDetailClientDetails(null)
					setFormType('create')
					formRef?.current?.click()
				}}
				onEdit={onEditClientDetails}
				onUpload={onUploadClientsDetails}
				onViewDetails={viewClientDetailsDetails}
				onDeleteMany={onDeleteClientsDetails}
				page={searchQuery.pagination.page}
				limit={searchQuery.pagination.limit}
				lastPage={clientsDetails.data?.pagination.last_page || 0}
				totalDocuments={clientsDetails.data?.pagination.total_count || 0}
				setPage={searchQuery.setPage}
				setLimit={searchQuery.setLimit}
			/>
			<CommonModal ref={formRef} className='sm:min-w-[510px] lg:min-w-[800px]'>
				<CommonForm
					type='modal'
					defaultObj={detailClientDetails}
					operationType={formType}
					closeModal={() => formRef.current?.click()}
					extendedForm={
						formType === 'create' ? createClientDetailsForm : updateClientDetailsForm
					}
					submitText={formType === 'create' ? 'Create' : 'Update'}
					cancelText='Cancel'
					submitFunc={(values) =>
						formType === 'create' ? onSubmit(values) : onUpdate(values)
					}
				/>
			</CommonModal>
			<CommonModal ref={detailsRef}>
				<ShowDetails
					obj={detailClientDetails ? detailClientDetails : {}}
					close={() => detailsRef.current?.click()}
				/>
			</CommonModal>
		</div>
	)
}
