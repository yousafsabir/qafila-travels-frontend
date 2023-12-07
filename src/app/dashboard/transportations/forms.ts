import * as z from 'zod'

import { ExtendedForm } from '@/lib/interfaces'
import { Transportation } from './interfaces'

export const createTransportationForm: ExtendedForm<Transportation> = [
	{
		type: 'normal-group',
		fields: [
			{
				type: 'heading',
				heading: 'Registration',
				className: 'mt-0',
			},
			{
				label: 'Date of Entry',
				key: 'date_of_entry',
				type: 'date',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, 'Date of Entry is required'),
			},
			{ type: 'heading', heading: 'Booking' },
			{
				label: 'Vehicle Type',
				key: 'vehicle_type',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Vehicle Type is required`),
			},
			{
				label: 'Arrival Time',
				key: 'arrival_time',
				type: 'date',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Arrival Time is required`),
			},
			{
				label: 'Trip Segments',
				key: 'trip_segments',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Trip Segments is required`),
			},
			{
				label: 'way',
				key: 'way',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Way is required`),
			},
			{
				type: 'heading',
				heading: 'Vendor Details',
			},
			{
				label: 'Vendor Name',
				key: 'vendor_name',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Vendor Name is required`),
			},
			{
				label: 'Cost Per Segment',
				key: 'cost_per_segment',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Cost Per Segment is required`)
					.transform((a) => Number(a)),
			},
			{
				label: 'Total Cost',
				key: 'total_cost',
				type: 'number',
				valueType: 'calculated',
				calculationType: 'arithmetic',
				expression: 'no_of_rooms * cost_per_night * number_of_nights',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Total Cost is required`)
					.transform((a) => Number(a)),
			},
			{
				label: 'Vendor Invoice Number',
				key: 'vendor_invoice',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Vendor Invoice Number is required`)
					.transform((a) => Number(a)),
			},
			{
				type: 'heading',
				heading: 'Client',
			},
			{
				label: 'Client Name',
				key: 'client_name',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Client Name is required`),
			},
			{
				label: 'Sale Per Segment',
				key: 'sale_per_segment',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Sale Per Segment is required`)
					.transform((a) => Number(a)),
			},
			{
				label: 'VAT (%)',
				key: 'vat',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `VAT (%) is required`)
					.transform((a) => Number(a)),
			},
			{
				label: 'Municipality Fee (%)',
				key: 'municipality_fee',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Municipality Fee (%) is required`)
					.transform((a) => Number(a)),
			},
			{
				label: 'Total Sale',
				key: 'total_sale',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Total Sale is required`)
					.transform((a) => Number(a)),
			},
			{
				type: 'heading',
				heading: 'Commission',
			},
			{
				label: 'Profit',
				key: 'profit',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Profit is required`)
					.transform((a) => Number(a)),
			},
			{
				type: 'heading',
				heading: 'Other Fields',
			},
			{
				label: 'No Of Pax',
				key: 'no_of_pax',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `No of Pax is required`)
					.transform((a) => Number(a)),
			},
			{
				label: 'Reservation Status',
				key: 'reservation_status',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Reservation Status is required`),
			},
		],
	},
]

export const searchTransportationForm: ExtendedForm<Transportation> = [
	{
		type: 'normal-group',
		fields: [
			{
				label: 'Date of Entry',
				key: 'date_of_entry',
				type: 'date',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.any(),
			},
			{
				label: 'Vehicle Type',
				key: 'vehicle_type',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.any(),
			},
			{
				label: 'Arrival Time',
				key: 'arrival_time',
				type: 'date',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.any(),
			},
			{
				label: 'way',
				key: 'way',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.any(),
			},
			{
				label: 'Total Cost',
				key: 'total_cost',
				type: 'number',
				valueType: 'calculated',
				calculationType: 'arithmetic',
				expression: 'no_of_rooms * cost_per_night * number_of_nights',
				defaultValue: '',
				placeholder: '',
				validation: z.any(),
			},
			{
				label: 'Vendor Name',
				key: 'vendor_name',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.any(),
			},
			{
				label: 'Vendor Invoice Number',
				key: 'vendor_invoice',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.any(),
			},
			{
				label: 'Client Name',
				key: 'client_name',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.any(),
			},
			{
				label: 'Reservation Status',
				key: 'reservation_status',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.any(),
			},
		],
	},
]

export const updateTransportationForm: ExtendedForm<Transportation> = [
	{
		type: 'normal-group',
		fields: [
			{
				label: 'Date of Entry',
				key: 'date_of_entry',
				type: 'date',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, 'Date of Entry is required').optional(),
			},
			{
				label: 'Vehicle Type',
				key: 'vehicle_type',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Vehicle Type is required`).optional(),
			},
			{
				label: 'Arrival Time',
				key: 'arrival_time',
				type: 'date',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Arrival Time is required`).optional(),
			},
			{
				label: 'Trip Segments',
				key: 'trip_segments',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Trip Segments is required`).optional(),
			},
			{
				label: 'way',
				key: 'way',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Way is required`).optional(),
			},
			{
				label: 'No Of Pax',
				key: 'no_of_pax',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `No of Pax is required`)
					.transform((a) => Number(a))
					.optional(),
			},
			{
				label: 'Cost Per Segment',
				key: 'cost_per_segment',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Cost Per Segment is required`)
					.transform((a) => Number(a))
					.optional(),
			},
			{
				label: 'Sale Per Segment',
				key: 'sale_per_segment',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Sale Per Segment is required`)
					.transform((a) => Number(a))
					.optional(),
			},
			{
				label: 'Total Cost',
				key: 'total_cost',
				type: 'number',
				valueType: 'calculated',
				calculationType: 'arithmetic',
				expression: 'no_of_rooms * cost_per_night * number_of_nights',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Total Cost is required`)
					.transform((a) => Number(a))
					.optional(),
			},
			{
				label: 'VAT (%)',
				key: 'vat',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `VAT (%) is required`)
					.transform((a) => Number(a))
					.optional(),
			},
			{
				label: 'Municipality Fee (%)',
				key: 'municipality_fee',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Municipality Fee (%) is required`)
					.transform((a) => Number(a))
					.optional(),
			},
			{
				label: 'Total Sale',
				key: 'total_sale',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Total Sale is required`)
					.transform((a) => Number(a))
					.optional(),
			},
			{
				label: 'Profit',
				key: 'profit',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Profit is required`)
					.transform((a) => Number(a))
					.optional(),
			},
			{
				label: 'Vendor Name',
				key: 'vendor_name',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Vendor Name is required`).optional(),
			},
			{
				label: 'Vendor Invoice Number',
				key: 'vendor_invoice',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Vendor Invoice Number is required`)
					.transform((a) => Number(a))
					.optional(),
			},
			{
				label: 'Client Name',
				key: 'client_name',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Client Name is required`).optional(),
			},
			{
				label: 'Reservation Status',
				key: 'reservation_status',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Reservation Status is required`).optional(),
			},
		],
	},
]
