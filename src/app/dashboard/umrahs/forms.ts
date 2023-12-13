import * as z from 'zod'

import { ExtendedForm, DefaultValueTypes } from '@/lib/interfaces'
import { Umrah } from './interfaces'

export const createUmrahForm: ExtendedForm<Umrah> = [
	{
		type: 'accordion',
		heading: 'Registration',
		fields: [
			{
				label: 'Sr. No',
				key: 'umrah_sr_no',
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
		heading: 'Visa',
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
				label: 'No. Of Visas',
				key: 'no_of_visas',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `No. Of Visas is required`)
					.transform((a) => Number(a)),
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
				label: 'Cost Per Visa',
				key: 'cost_per_visa',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Cost Per Visa is required`)
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
				label: 'Group Id',
				key: 'group_id',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Vendor Invoice Number is required`),
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
				label: 'Sale Per Visa',
				key: 'sale_per_visa',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Sale Per Visa is required`)
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
				label: 'Discount (%)',
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
					_a = (sale_per_visa * no_of_visas) - discount / 100
					_b = _a * municipality_fee / 100;
					_c = ( _a + _b ) * vat / 100;
					return = _a + _b + _c
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
]

export const searchUmrahForm: ExtendedForm<Umrah> = [
	{
		type: 'normal-group',
		fields: [
			{
				label: 'Sr No.',
				key: 'umrah_sr_no',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.any(),
			},
			{
				label: 'Invoice Number',
				key: 'invoice_number',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.any(),
			},
			{
				label: 'Guest Name',
				key: 'guest_name',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.any(),
			},
			{
				label: 'No. Of Visas',
				key: 'no_of_visas',
				type: 'number',
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
				label: 'Client Name',
				key: 'client_name',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.any(),
			},
		],
	},
]

export const updateUmrahForm: ExtendedForm<Umrah> = [
	{
		type: 'accordion',
		heading: 'Visa',
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
				label: 'No. Of Visas',
				key: 'no_of_visas',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `No. Of Visas is required`)
					.transform((a) => Number(a))
					.optional(),
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
				label: 'Cost Per Visa',
				key: 'cost_per_visa',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Cost Per Visa is required`)
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
				label: 'Group Id',
				key: 'group_id',
				type: 'text',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z.string().min(1, `Vendor Invoice Number is required`).optional(),
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
				label: 'Sale Per Visa',
				key: 'sale_per_visa',
				type: 'number',
				valueType: 'normal',
				defaultValue: '',
				placeholder: '',
				validation: z
					.string()
					.min(1, `Sale Per Visa is required`)
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
				valueType: 'derived',
				derivationType: 'arithmetic',
				expression: `
					_a = (sale_per_visa * no_of_visas) - discount / 100
					_b = _a * municipality_fee / 100;
					_c = ( _a + _b ) * vat / 100;
					return = _a + _b + _c
				`,
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
