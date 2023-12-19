import * as z from 'zod'

import { type ExtendedForm, type DefaultValueTypes, type IFormField } from '@/lib/interfaces'
import { Hotel } from './interfaces'
import { getFormFields } from '@/lib/utils'

const hotelForm: Record<
	keyof Omit<Hotel, '_id' | 'created_at' | 'updated_at'>,
	IFormField<Hotel>
> = {
	hotel_sr_no: {
		label: 'Sr. No',
		key: 'hotel_sr_no',
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
	check_in_date: {
		label: 'Check In Date',
		key: 'check_in_date',
		type: 'date',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Check In Date is required`),
	},
	check_out_date: {
		label: 'Checkout Date',
		key: 'check_out_date',
		type: 'date',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Checkout Date is required`),
	},
	number_of_nights: {
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
	room_type: {
		label: 'Room Type',
		key: 'room_type',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Room Type is required`),
	},
	view: {
		label: 'Room View',
		key: 'view',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `View is required`),
	},
	no_of_rooms: {
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
	hotel_name: {
		label: 'Hotel Name',
		key: 'hotel_name',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Hotel Name is required`),
	},
	meal_plan: {
		label: 'Meal Plan',
		key: 'meal_plan',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Meal Plan is required`),
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
	cost_per_night: {
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
	total_cost: {
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
	hcn_number: {
		label: 'HCN Number',
		key: 'hcn_number',
		type: 'number',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().optional(),
	},
	vendor_invoice: {
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
	client_name: {
		label: 'Client Name',
		key: 'client_name',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Client Name is required`),
	},
	sales_per_night: {
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
	total_sales: {
		label: 'Total Sales',
		key: 'total_sales',
		type: 'number',
		valueType: 'derived',
		derivationType: 'arithmetic',
		expression: `
				_a = sales_per_night * number_of_nights * no_of_rooms;
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
	reservation_status: {
		label: 'Reservation Status',
		key: 'reservation_status',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Reservation Status is required`),
	},
	finance_status: {
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
}

export const createHotelForm: ExtendedForm<Hotel> = [
	{
		type: 'accordion',
		heading: 'Registration',
		fields: getFormFields<Hotel>(hotelForm, ['hotel_sr_no', 'invoice_number', 'date_of_entry']),
	},
	{
		type: 'accordion',
		heading: 'Guest',
		fields: getFormFields<Hotel>(hotelForm, [
			'guest_name',
			'check_in_date',
			'check_out_date',
			'number_of_nights',
			'room_type',
			'view',
			'no_of_rooms',
			'hotel_name',
			'meal_plan',
		]),
	},
	{
		type: 'accordion',
		heading: 'Vendor Details',
		fields: getFormFields<Hotel>(hotelForm, [
			'vendor_name',
			'cost_per_night',
			'total_cost',
			'hcn_number',
			'vendor_invoice',
		]),
	},
	{
		type: 'accordion',
		heading: 'Client',
		fields: getFormFields<Hotel>(hotelForm, [
			'client_name',
			'sales_per_night',
			'vat',
			'municipality_fee',
			'discount',
			'total_sales',
		]),
	},
	{
		type: 'accordion',
		heading: 'Commission',
		fields: getFormFields<Hotel>(hotelForm, ['profit']),
	},
	{
		type: 'accordion',
		heading: 'Other Fields',
		fields: getFormFields<Hotel>(hotelForm, ['reservation_status', 'finance_status']),
	},
]

export const searchHotelForm: ExtendedForm<Hotel> = [
	{
		type: 'accordion',
		heading: 'Registration',
		fields: getFormFields<Hotel>(
			hotelForm,
			['hotel_sr_no', 'invoice_number', 'date_of_entry'],
			{ validation: 'none', calculation: false, derivedDefaultValue: false },
		),
	},
	{
		type: 'accordion',
		heading: 'Guest',
		fields: getFormFields<Hotel>(
			hotelForm,
			[
				'guest_name',
				'check_in_date',
				'check_out_date',
				'number_of_nights',
				'room_type',
				'view',
				'no_of_rooms',
				'hotel_name',
				'meal_plan',
			],
			{ validation: 'none', calculation: false },
		),
	},
	{
		type: 'accordion',
		heading: 'Vendor Details',
		fields: getFormFields<Hotel>(
			hotelForm,
			['vendor_name', 'cost_per_night', 'total_cost', 'hcn_number', 'vendor_invoice'],
			{ validation: 'none', calculation: false },
		),
	},
	{
		type: 'accordion',
		heading: 'Client',
		fields: getFormFields<Hotel>(
			hotelForm,
			[
				'client_name',
				'sales_per_night',
				'vat',
				'municipality_fee',
				'discount',
				'total_sales',
			],
			{ validation: 'none', calculation: false },
		),
	},
	{
		type: 'accordion',
		heading: 'Commission',
		fields: getFormFields<Hotel>(hotelForm, ['profit'], {
			validation: 'none',
			calculation: false,
		}),
	},
	{
		type: 'accordion',
		heading: 'Other Fields',
		fields: getFormFields<Hotel>(hotelForm, ['reservation_status', 'finance_status'], {
			validation: 'none',
			calculation: false,
		}),
	},
]

export const updateHotelForm: ExtendedForm<Hotel> = [
	{
		type: 'accordion',
		heading: 'Registration',
		fields: getFormFields<Hotel>(
			hotelForm,
			['hotel_sr_no', 'invoice_number', 'date_of_entry'],
			{ validation: 'optional' },
		),
	},
	{
		type: 'accordion',
		heading: 'Guest',
		fields: getFormFields<Hotel>(
			hotelForm,
			[
				'guest_name',
				'check_in_date',
				'check_out_date',
				'number_of_nights',
				'room_type',
				'view',
				'no_of_rooms',
				'hotel_name',
				'meal_plan',
			],
			{ validation: 'optional' },
		),
	},
	{
		type: 'accordion',
		heading: 'Vendor Details',
		fields: getFormFields<Hotel>(
			hotelForm,
			['vendor_name', 'cost_per_night', 'total_cost', 'hcn_number', 'vendor_invoice'],
			{ validation: 'optional' },
		),
	},
	{
		type: 'accordion',
		heading: 'Client',
		fields: getFormFields<Hotel>(
			hotelForm,
			[
				'client_name',
				'sales_per_night',
				'vat',
				'municipality_fee',
				'discount',
				'total_sales',
			],
			{ validation: 'optional' },
		),
	},
	{
		type: 'accordion',
		heading: 'Commission',
		fields: getFormFields<Hotel>(hotelForm, ['profit'], { validation: 'optional' }),
	},
	{
		type: 'accordion',
		heading: 'Other Fields',
		fields: getFormFields<Hotel>(hotelForm, ['reservation_status', 'finance_status'], {
			validation: 'optional',
		}),
	},
]
