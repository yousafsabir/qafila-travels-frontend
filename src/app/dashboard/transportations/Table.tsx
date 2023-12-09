'use client'

import * as React from 'react'
import { Filter } from 'lucide-react'

import { useSearchQuery } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { CommonForm, CommonModal, ShowDetails, CommonTable, CommonAccordion } from '@/components'
import { type Transportation, type CreateTransportation, TransportationClass } from './interfaces'
import {
	useGetTransportations,
	useCreateTransportation,
	useUpdateTransportation,
	useDeleteTransportations,
} from './mutations'
import {
	createTransportationForm,
	searchTransportationForm,
	updateTransportationForm,
} from './forms'

export function TransportationsTable({ className }: { className?: string }) {
	const searchQuery = useSearchQuery()

	const transportations = useGetTransportations(searchQuery.queryStr)
	const createTransportation = useCreateTransportation()
	const updateTransportation = useUpdateTransportation()
	const deleteTransportations = useDeleteTransportations()
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

	const onDeleteTransportations = async (ids: string[]) => {
		await deleteTransportations.mutateAsync(ids)
	}

	const columns = Object.keys(new TransportationClass())

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
								extendedForm={searchTransportationForm}
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
				onEdit={onEditTransportation}
				onViewDetails={viewTransportationDetails}
				onDeleteMany={onDeleteTransportations}
				page={searchQuery.pagination.page}
				limit={searchQuery.pagination.limit}
				lastPage={transportations.data?.pagination.last_page || 0}
				totalDocuments={transportations.data?.pagination.total_count || 0}
				setPage={searchQuery.setPage}
				setLimit={searchQuery.setLimit}
			/>
			<CommonModal ref={formRef} className='sm:min-w-[510px] lg:min-w-[800px]'>
				<CommonForm
					type='modal'
					defaultObj={detailTransportation}
					operationType={formType}
					closeModal={() => formRef.current?.click()}
					extendedForm={
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
