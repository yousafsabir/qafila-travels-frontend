'use client'

import * as React from 'react'
import { Filter } from 'lucide-react'

import { useSearchQuery } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import {
	CommonForm,
	CommonModal,
	ShowDetails,
	CommonTable,
	CommonAccordion,
} from '@/components/common'
import { type Umrah, UmrahClass } from './interfaces'
import { useGetUmrahs, useCreateUmrah, useUpdateUmrah } from './mutations'
import { createUmrahForm, searchUmrahForm, updateUmrahForm } from './forms'

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

	const columns = Object.keys(new UmrahClass())

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
				onEdit={onEditUmrah}
				onViewDetails={viewUmrahDetails}
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
