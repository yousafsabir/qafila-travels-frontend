import * as z from 'zod'

import { IFormField } from '@/lib/interfaces'
import { Umrah } from '@/lib/interfaces/umrahs'

export const createUmrahForm: IFormField<Umrah>[] = [
	{
		label: 'Sr No.',
		key: 'umrah_sr_no',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, 'Sr No. is required')
			.transform((a) => Number(a)),
	},
	{
		label: 'Date of Entry',
		key: 'date_of_entry',
		type: 'date',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, 'Date of Entry is required'),
	},
	{
		label: 'Invoice Number',
		key: 'invoice_number',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, `Invoice Number is required`)
			.transform((a) => Number(a)),
	},
	{
		label: 'Guest Name',
		key: 'guest_name',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Guest Name is required`),
	},
	{
		label: 'No. Of Visas',
		key: 'no_of_visas',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, `No. Of Visas is required`)
			.transform((a) => Number(a)),
	},
	{
		label: 'Cost Per Visa',
		key: 'cost_per_visa',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, `Cost Per Visa is required`)
			.transform((a) => Number(a)),
	},
	{
		label: 'Sale Per Visa',
		key: 'sale_per_visa',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, `Sale Per Visa is required`)
			.transform((a) => Number(a)),
	},
	{
		label: 'Total Cost',
		key: 'total_cost',
		type: 'number',
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
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Vendor Name is required`),
	},
	{
		label: 'Group Id',
		key: 'group_id',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Vendor Invoice Number is required`),
	},
	{
		label: 'Client Name',
		key: 'client_name',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Client Name is required`),
	},
]

export const searchUmrahForm: IFormField<Umrah>[] = [
	{
		label: 'Sr No.',
		key: 'umrah_sr_no',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.any(),
	},
	{
		label: 'Invoice Number',
		key: 'invoice_number',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z.any(),
	},
	{
		label: 'Guest Name',
		key: 'guest_name',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.any(),
	},
	{
		label: 'No. Of Visas',
		key: 'no_of_visas',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z.any(),
	},
	{
		label: 'Total Cost',
		key: 'total_cost',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z.any(),
	},
	{
		label: 'Vendor Name',
		key: 'vendor_name',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.any(),
	},
	{
		label: 'Client Name',
		key: 'client_name',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.any(),
	},
]

export const updateUmrahForm: IFormField<Umrah>[] = [
	{
		label: 'Sr No.',
		key: 'umrah_sr_no',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, 'Sr No. is required')
			.transform((a) => Number(a))
			.optional(),
	},
	{
		label: 'Date of Entry',
		key: 'date_of_entry',
		type: 'date',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, 'Date of Entry is required').optional(),
	},
	{
		label: 'Invoice Number',
		key: 'invoice_number',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, `Invoice Number is required`)
			.transform((a) => Number(a))
			.optional(),
	},
	{
		label: 'Guest Name',
		key: 'guest_name',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Guest Name is required`).optional(),
	},
	{
		label: 'No. Of Visas',
		key: 'no_of_visas',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, `No. Of Visas is required`)
			.transform((a) => Number(a))
			.optional(),
	},
	{
		label: 'Cost Per Visa',
		key: 'cost_per_visa',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, `Cost Per Visa is required`)
			.transform((a) => Number(a))
			.optional(),
	},
	{
		label: 'Sale Per Visa',
		key: 'sale_per_visa',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, `Sale Per Visa is required`)
			.transform((a) => Number(a))
			.optional(),
	},
	{
		label: 'Total Cost',
		key: 'total_cost',
		type: 'number',
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
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Vendor Name is required`).optional(),
	},
	{
		label: 'Group Id',
		key: 'group_id',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Vendor Invoice Number is required`).optional(),
	},
	{
		label: 'Client Name',
		key: 'client_name',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Client Name is required`).optional(),
	},
]
