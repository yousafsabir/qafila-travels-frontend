import * as z from 'zod'

import { IFormField } from '@/lib/interfaces'
import { Hotel } from '@/lib/interfaces/hotels'

export const createHotelForm: IFormField<Hotel>[] = [
	{
		label: 'Date of Entry',
		key: 'date_of_entry',
		type: 'date',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, 'Date of Entry is required'),
	},
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
		label: 'Room Type',
		key: 'room_type',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Room Type is required`),
	},
	{
		label: 'View',
		key: 'view',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `View is required`),
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
		label: 'Total Sales',
		key: 'total_sales',
		type: 'number',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, `Total Sales is required`)
			.transform((a) => Number(a)),
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
		label: 'Vendor Name',
		key: 'vendor_name',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Vendor Name is required`),
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
		label: 'Client Name',
		key: 'client_name',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Client Name is required`),
	},
	{
		label: 'HCN Number',
		key: 'hcn_number',
		type: 'number',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, `HCN Number is required`)
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
]

export const searchHotelForm: IFormField<Hotel>[] = [
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
]

export const updateHotelForm: IFormField<Hotel>[] = [
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
		label: 'Room Type',
		key: 'room_type',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Room Type is required`).optional(),
	},
	{
		label: 'View',
		key: 'view',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `View is required`).optional(),
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
		label: 'Total Cost',
		key: 'total_cost',
		type: 'number',
		valueType: 'normal',
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
		label: 'HCN Number',
		key: 'hcn_number',
		type: 'number',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, `HCN Number is required`)
			.transform((a) => Number(a))
			.optional(),
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
		validation: z
			.enum(['checked', 'issue', 'unchecked'], {
				required_error: 'Finance Status is required',
			})
			.optional(),
	},
]
