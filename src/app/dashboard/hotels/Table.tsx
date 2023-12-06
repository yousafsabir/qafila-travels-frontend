'use client'

import * as React from 'react'
import { Filter } from 'lucide-react'

import { useSearchQuery } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { CommonForm, CommonModal, ShowDetails, CommonTable, CommonAccordion } from '@/components'
import { type Hotel, type CreateHotel, HotelClass } from './interfaces'
import { useGetHotels, useCreateHotel, useUpdateHotel, useDeleteHotels } from './mutations'
import { createHotelForm, searchHotelForm, updateHotelForm } from './forms'

export function HotelsTable({ className }: { className?: string }) {
	const searchQuery = useSearchQuery()

	const hotels = useGetHotels(searchQuery.queryStr)
	const createHotel = useCreateHotel()
	const updateHotel = useUpdateHotel()
	const deleteHotels = useDeleteHotels()
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

	const onDeleteHotels = async (ids: string[]) => {
		await deleteHotels.mutateAsync(ids)
	}

	const columns = Object.keys(new HotelClass())

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
								formFields={searchHotelForm}
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
				data={hotels.data?.hotels || []}
				loading={hotels.isLoading}
				onCreate={() => {
					setFormType('create')
					formRef?.current?.click()
				}}
				onEdit={onEditHotel}
				onViewDetails={viewHotelDetails}
				onDeleteMany={onDeleteHotels}
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
