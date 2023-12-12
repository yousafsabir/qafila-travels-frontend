import * as z from 'zod'

import { type ExtendedForm, type DefaultValueTypes } from '@/lib/interfaces'
import { Hotel } from './interfaces'

export const createHotelForm: ExtendedForm<Hotel> = [
	{
		type: 'accordion',
		heading: 'Registration',
		fields: [
			{
				label: 'Sr. No',
				key: 'hotel_sr_no',
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
		heading: 'Guest',
		fields: [
			{
				label: 'Guest Name',
				key: 'guest_name',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Guest Name is required`),
			},
			{
				label: 'Check In Date',
				key: 'check_in_date',
				type: 'date',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Check In Date is required`),
			},
			{
				label: 'Checkout Date',
				key: 'check_out_date',
				type: 'date',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Checkout Date is required`),
			},
			{
				label: 'Number Of Nights',
				key: 'number_of_nights',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Number Of Nights is required`)
					.transform((a) => Number(a)),
			},
			{
				label: 'Room Type',
				key: 'room_type',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Room Type is required`),
			},
			{
				label: 'Room View',
				key: 'view',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `View is required`),
			},
			{
				label: 'Number of Rooms',
				key: 'no_of_rooms',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Number Of Rooms is required`)
					.transform((a) => Number(a)),
			},
			{
				label: 'Hotel Name',
				key: 'hotel_name',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Hotel Name is required`),
			},
			{
				label: 'Meal Plan',
				key: 'meal_plan',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Meal Plan is required`),
			},
		],
	},
	{
		type: 'accordion',
		heading: 'Vendor Details',
		fields: [
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
				label: 'Cost Per Night',
				key: 'cost_per_night',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Cost Per Night is required`)
					.transform((a) => Number(a)),
			},
			{
				label: 'Total Cost',
				key: 'total_cost',
				type: 'number',
				valueType: 'derived',
				derivationType: 'arithmetic',
				expression: 'return = no_of_rooms * cost_per_night * number_of_nights',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Total Cost is required`)
					.transform((a) => Number(a)),
			},
			{
				label: 'HCN Number',
				key: 'hcn_number',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().optional(),
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
				label: 'Sales Per Night',
				key: 'sales_per_night',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Sales Per Night is required`)
					.transform((a) => Number(a)),
			},
			{
				label: 'VAT (%)',
				key: 'vat',
				type: 'number',
				valueType: 'normal',
				defaultValue: '0',
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
				defaultValue: '0',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Municipality Fee (%) is required`)
					.transform((a) => Number(a)),
			},
			{
				label: 'Discount',
				key: 'discount',
				type: 'number',
				valueType: 'normal',
				defaultValue: '0',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Discount is required`)
					.transform((a) => Number(a)),
			},
			{
				label: 'Total Sales',
				key: 'total_sales',
				type: 'number',
				valueType: 'derived',
				derivationType: 'arithmetic',
				expression: `
					a = sales_per_night * number_of_nights * no_of_rooms;
					b = a * municipality_fee / 100;
					c = (a + b) * vat / 100;
					return = a + b + c
					`,
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Total Sales is required`)
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
				label: 'Reservation Status',
				key: 'reservation_status',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Reservation Status is required`),
			},
			{
				label: 'Finance Status',
				key: 'finance_status',
				type: 'select',
				values: [
					{
						label: 'Checked',
						value: 'checked',
					},
					{
						label: 'Issue',
						value: 'issue',
					},
					{
						label: 'Un-checked',
						value: 'unchecked',
					},
				],
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.enum(['checked', 'issue', 'unchecked'], {
					required_error: 'Finance Status is required',
				}),
			},
		],
	},
]

export const searchHotelForm: ExtendedForm<Hotel> = [
	{
		type: 'normal-group',
		fields: [
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
				label: 'Date of Entry',
				key: 'date_of_entry',
				type: 'date',
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
				label: 'HCN Number',
				key: 'hcn_number',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.any(),
			},
			{
				label: 'Meal Plan',
				key: 'meal_plan',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.any(),
			},
			{
				label: 'Finance Status',
				key: 'finance_status',
				type: 'select',
				values: [
					{
						label: 'Checked',
						value: 'checked',
					},
					{
						label: 'Issue',
						value: 'issue',
					},
					{
						label: 'Un-checked',
						value: 'unchecked',
					},
				],
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.any(),
			},
		],
	},
]

export const updateHotelForm: ExtendedForm<Hotel> = [
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
				validation: z.string().min(1, 'Date of Entry is required').optional(),
			},
		],
	},
	{
		type: 'accordion',
		heading: 'Guest',
		fields: [
			{
				label: 'Guest Name',
				key: 'guest_name',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Guest Name is required`).optional(),
			},
			{
				label: 'Check In Date',
				key: 'check_in_date',
				type: 'date',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Check In Date is required`).optional(),
			},
			{
				label: 'Checkout Date',
				key: 'check_out_date',
				type: 'date',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Checkout Date is required`).optional(),
			},
			{
				label: 'Number Of Nights',
				key: 'number_of_nights',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Number Of Nights is required`)
					.transform((a) => Number(a))
					.optional(),
			},
			{
				label: 'Room Type',
				key: 'room_type',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Room Type is required`).optional(),
			},
			{
				label: 'Room View',
				key: 'view',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `View is required`).optional(),
			},
			{
				label: 'Number of Rooms',
				key: 'no_of_rooms',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Number Of Rooms is required`)
					.transform((a) => Number(a))
					.optional(),
			},
			{
				label: 'Hotel Name',
				key: 'hotel_name',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Hotel Name is required`).optional(),
			},
			{
				label: 'Meal Plan',
				key: 'meal_plan',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Meal Plan is required`).optional(),
			},
		],
	},
	{
		type: 'accordion',
		heading: 'Vendor Details',
		fields: [
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
				label: 'Cost Per Night',
				key: 'cost_per_night',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Cost Per Night is required`)
					.transform((a) => Number(a))
					.optional(),
			},
			{
				label: 'Total Cost',
				key: 'total_cost',
				type: 'number',
				valueType: 'derived',
				derivationType: 'arithmetic',
				expression: 'return = no_of_rooms * cost_per_night * number_of_nights',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Total Cost is required`)
					.transform((a) => Number(a))
					.optional(),
			},
			{
				label: 'HCN Number',
				key: 'hcn_number',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().optional().optional(),
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
				validation: z.string().min(1, `Client Name is required`).optional(),
			},
			{
				label: 'Sales Per Night',
				key: 'sales_per_night',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Sales Per Night is required`)
					.transform((a) => Number(a))
					.optional(),
			},
			{
				label: 'VAT (%)',
				key: 'vat',
				type: 'number',
				valueType: 'normal',
				defaultValue: '0',
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
				defaultValue: '0',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Municipality Fee (%) is required`)
					.transform((a) => Number(a))
					.optional(),
			},
			{
				label: 'Total Sales',
				key: 'total_sales',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Total Sales is required`)
					.transform((a) => Number(a))
					.optional(),
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
					.transform((a) => Number(a))
					.optional(),
			},
		],
	},
]
