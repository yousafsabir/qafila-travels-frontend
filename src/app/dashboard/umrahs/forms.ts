import * as z from 'zod'

import { type ExtendedForm, type DefaultValueTypes, type IFormField } from '@/lib/interfaces'
import { type Umrah } from './interfaces'
import { getFormFields } from '@/lib/utils'

const umrahForm: Record<
	keyof Omit<Umrah, '_id' | 'created_at' | 'updated_at'>,
	IFormField<Umrah>
> = {
	umrah_sr_no: {
		label: 'Sr. No',
		key: 'umrah_sr_no',
		type: 'text',
		valueType: 'normal',
		defaultValue: '_uid_' as DefaultValueTypes,
		placeholder: '',
		validation: z.string().min(1, 'Sr. No'),
	},
	invoice_number: {
		label: 'Invoice Number',
		key: 'invoice_number',
		type: 'text',
		valueType: 'normal',
		defaultValue: '_uid_' as DefaultValueTypes,
		placeholder: '',
		validation: z.string().min(1, 'Invoice Number'),
	},
	date_of_entry: {
		label: 'Date of Entry',
		key: 'date_of_entry',
		type: 'date',
		valueType: 'normal',
		defaultValue: '_current_date_' as DefaultValueTypes,
		placeholder: '',
		validation: z.string().min(1, 'Date of Entry is required'),
	},
	guest_name: {
		label: 'Guest Name',
		key: 'guest_name',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Guest Name is required`),
	},
	no_of_visas: {
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
	vendor_name: {
		label: 'Vendor Name',
		key: 'vendor_name',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Vendor Name is required`),
	},
	cost_per_visa: {
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
	total_cost: {
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
	group_id: {
		label: 'Group Id',
		key: 'group_id',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Vendor Invoice Number is required`),
	},
	client_name: {
		label: 'Client Name',
		key: 'client_name',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Client Name is required`),
	},
	sale_per_visa: {
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
	vat: {
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
	municipality_fee: {
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
	discount: {
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
	total_sales: {
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
	profit: {
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
}

export const createUmrahForm: ExtendedForm<Umrah> = [
	{
		type: 'accordion',
		heading: 'Registration',
		fields: getFormFields<Umrah>(umrahForm as any, [
			'umrah_sr_no',
			'invoice_number',
			'date_of_entry',
		]),
	},
	{
		type: 'accordion',
		heading: 'Visa',
		fields: getFormFields<Umrah>(umrahForm as any, ['guest_name', 'no_of_visas']),
	},
	{
		type: 'accordion',
		heading: 'Vendor Details',
		fields: getFormFields<Umrah>(umrahForm as any, [
			'vendor_name',
			'cost_per_visa',
			'total_cost',
			'group_id',
		]),
	},
	{
		type: 'accordion',
		heading: 'Client',
		fields: getFormFields<Umrah>(umrahForm as any, [
			'client_name',
			'sale_per_visa',
			'vat',
			'municipality_fee',
			'discount',
			'total_sales',
		]),
	},
	{
		type: 'accordion',
		heading: 'Commission',
		fields: getFormFields<Umrah>(umrahForm as any, ['profit']),
	},
]

export const searchUmrahForm: ExtendedForm<Umrah> = [
	{
		type: 'accordion',
		heading: 'Registration',
		fields: getFormFields<Umrah>(
			umrahForm as any,
			['umrah_sr_no', 'invoice_number', 'date_of_entry'],
			{
				validation: 'none',
				calculation: false,
			},
		),
	},
	{
		type: 'accordion',
		heading: 'Visa',
		fields: getFormFields<Umrah>(umrahForm as any, ['guest_name', 'no_of_visas'], {
			validation: 'none',
			calculation: false,
		}),
	},
	{
		type: 'accordion',
		heading: 'Vendor Details',
		fields: getFormFields<Umrah>(
			umrahForm as any,
			['vendor_name', 'cost_per_visa', 'total_cost', 'group_id'],
			{
				validation: 'none',
				calculation: false,
			},
		),
	},
	{
		type: 'accordion',
		heading: 'Client',
		fields: getFormFields<Umrah>(
			umrahForm as any,
			['client_name', 'sale_per_visa', 'vat', 'municipality_fee', 'discount', 'total_sales'],
			{
				validation: 'none',
				calculation: false,
			},
		),
	},
	{
		type: 'accordion',
		heading: 'Commission',
		fields: getFormFields<Umrah>(umrahForm as any, ['profit'], {
			validation: 'none',
			calculation: false,
		}),
	},
]

export const updateUmrahForm: ExtendedForm<Umrah> = [
	{
		type: 'accordion',
		heading: 'Registration',
		fields: getFormFields<Umrah>(
			umrahForm as any,
			['umrah_sr_no', 'invoice_number', 'date_of_entry'],
			{
				validation: 'optional',
			},
		),
	},
	{
		type: 'accordion',
		heading: 'Visa',
		fields: getFormFields<Umrah>(umrahForm as any, ['guest_name', 'no_of_visas'], {
			validation: 'optional',
		}),
	},
	{
		type: 'accordion',
		heading: 'Vendor Details',
		fields: getFormFields<Umrah>(
			umrahForm as any,
			['vendor_name', 'cost_per_visa', 'total_cost', 'group_id'],
			{
				validation: 'optional',
			},
		),
	},
	{
		type: 'accordion',
		heading: 'Client',
		fields: getFormFields<Umrah>(
			umrahForm as any,
			['client_name', 'sale_per_visa', 'vat', 'municipality_fee', 'discount', 'total_sales'],
			{
				validation: 'optional',
			},
		),
	},
	{
		type: 'accordion',
		heading: 'Commission',
		fields: getFormFields<Umrah>(umrahForm as any, ['profit'], {
			validation: 'optional',
		}),
	},
]
