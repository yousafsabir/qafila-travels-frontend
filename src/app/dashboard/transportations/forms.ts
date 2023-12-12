import * as z from 'zod'

import { type ExtendedForm, type DefaultValueTypes } from '@/lib/interfaces'
import { Transportation } from './interfaces'

export const createTransportationForm: ExtendedForm<Transportation> = [
	{
		type: 'accordion',
		heading: 'Registration',
		fields: [
			{
				label: 'Sr. No',
				key: 'sr_no',
				type: 'text',
				valueType: 'normal',
				defaultValue: '_uid_' as DefaultValueTypes,
				placeholder: '',
				validation: z.string().min(1, 'Sr. No'),
			},
			{
				label: 'Invoice Number',
				key: 'invoice_number',
				type: 'text',
				valueType: 'normal',
				defaultValue: '_uid_' as DefaultValueTypes,
				placeholder: '',
				validation: z.string().min(1, 'Invoice Number'),
			},
			{
				label: 'Date of Entry',
				key: 'date_of_entry',
				type: 'date',
				valueType: 'normal',
				defaultValue: '_current_date_' as DefaultValueTypes,
				placeholder: '',
				validation: z.string().min(1, 'Date of Entry is required'),
			},
		],
	},
	{
		type: 'accordion',
		heading: 'Booking',
		fields: [
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
				valueType: 'normal',
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
		],
	},
	{
		type: 'accordion',
		heading: 'Client',
		fields: [
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
		],
	},
	{
		type: 'accordion',
		heading: 'Commission',
		fields: [
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
		],
	},
	{
		type: 'accordion',
		heading: 'Other Fields',
		fields: [
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
				valueType: 'normal',
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
		type: 'accordion',
		heading: 'Registration',
		fields: [
			{
				label: 'Date of Entry',
				key: 'date_of_entry',
				type: 'date',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, 'Date of Entry is required'),
			},
		],
	},
	{
		type: 'accordion',
		heading: 'Booking',
		fields: [
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
				valueType: 'normal',
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
		],
	},
	{
		type: 'accordion',
		heading: 'Client',
		fields: [
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
		],
	},
	{
		type: 'accordion',
		heading: 'Commission',
		fields: [
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
		],
	},
]
