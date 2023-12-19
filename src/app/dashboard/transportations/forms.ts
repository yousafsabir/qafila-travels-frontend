import * as z from 'zod'

import { type ExtendedForm, type DefaultValueTypes, type IFormField } from '@/lib/interfaces'
import { Transportation } from './interfaces'
import { getFormFields } from '@/lib/utils'

const transportationForm: Record<
	keyof Omit<Transportation, '_id' | 'created_at' | 'updated_at'>,
	IFormField<Transportation>
> = {
	sr_no: {
		label: 'Sr. No',
		key: 'sr_no',
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
	vehicle_type: {
		label: 'Vehicle Type',
		key: 'vehicle_type',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Vehicle Type is required`),
	},
	arrival_time: {
		label: 'Arrival Time',
		key: 'arrival_time',
		type: 'date',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Arrival Time is required`),
	},
	trip_segments: {
		label: 'Trip Segments',
		key: 'trip_segments',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Trip Segments is required`),
	},
	way: {
		label: 'way',
		key: 'way',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Way is required`),
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
	cost_per_segment: {
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
	sale_per_segment: {
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
	vat: {
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
	municipality_fee: {
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
	total_sale: {
		label: 'Total Sale',
		key: 'total_sale',
		type: 'number',
		valueType: 'derived',
		derivationType: 'arithmetic',
		expression: `
			_a = sale_per_segment * trip_segments;
			_b = _a * municipality_fee / 100;
			_c = ( _a + _b ) * vat / 100;
			return = _a + _b + _c
		`,
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, `Total Sale is required`)
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
	no_of_pax: {
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
	reservation_status: {
		label: 'Reservation Status',
		key: 'reservation_status',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Reservation Status is required`),
	},
}

export const createTransportationForm: ExtendedForm<Transportation> = [
	{
		type: 'accordion',
		heading: 'Registration',
		fields: getFormFields<Transportation>(transportationForm, [
			'sr_no',
			'invoice_number',
			'date_of_entry',
		]),
	},
	{
		type: 'accordion',
		heading: 'Booking',
		fields: getFormFields<Transportation>(transportationForm, [
			'vehicle_type',
			'arrival_time',
			'trip_segments',
			'way',
		]),
	},
	{
		type: 'accordion',
		heading: 'Vendor Details',
		fields: getFormFields<Transportation>(transportationForm, [
			'vendor_name',
			'cost_per_segment',
			'total_cost',
			'vendor_invoice',
		]),
	},
	{
		type: 'accordion',
		heading: 'Client',
		fields: getFormFields<Transportation>(transportationForm, [
			'client_name',
			'sale_per_segment',
			'vat',
			'municipality_fee',
			'discount',
			'total_sale',
		]),
	},
	{
		type: 'accordion',
		heading: 'Commission',
		fields: getFormFields<Transportation>(transportationForm, ['profit']),
	},
	{
		type: 'accordion',
		heading: 'Other Fields',
		fields: getFormFields<Transportation>(transportationForm, [
			'no_of_pax',
			'reservation_status',
		]),
	},
]

export const searchTransportationForm: ExtendedForm<Transportation> = [
	{
		type: 'accordion',
		heading: 'Registration',
		fields: getFormFields<Transportation>(
			transportationForm,
			['sr_no', 'invoice_number', 'date_of_entry'],
			{
				validation: 'none',
				calculation: false,
				derivedDefaultValue: false,
			},
		),
	},
	{
		type: 'accordion',
		heading: 'Booking',
		fields: getFormFields<Transportation>(
			transportationForm,
			['vehicle_type', 'arrival_time', 'trip_segments', 'way'],
			{
				validation: 'none',
				calculation: false,
			},
		),
	},
	{
		type: 'accordion',
		heading: 'Vendor Details',
		fields: getFormFields<Transportation>(
			transportationForm,
			['vendor_name', 'cost_per_segment', 'total_cost', 'vendor_invoice'],
			{
				validation: 'none',
				calculation: false,
			},
		),
	},
	{
		type: 'accordion',
		heading: 'Client',
		fields: getFormFields<Transportation>(
			transportationForm,
			[
				'client_name',
				'sale_per_segment',
				'vat',
				'municipality_fee',
				'discount',
				'total_sale',
			],
			{
				validation: 'none',
				calculation: false,
			},
		),
	},
	{
		type: 'accordion',
		heading: 'Commission',
		fields: getFormFields<Transportation>(transportationForm, ['profit'], {
			validation: 'none',
			calculation: false,
		}),
	},
	{
		type: 'accordion',
		heading: 'Other Fields',
		fields: getFormFields<Transportation>(
			transportationForm,
			['no_of_pax', 'reservation_status'],
			{
				validation: 'none',
				calculation: false,
			},
		),
	},
]

export const updateTransportationForm: ExtendedForm<Transportation> = [
	{
		type: 'accordion',
		heading: 'Registration',
		fields: getFormFields<Transportation>(
			transportationForm,
			['sr_no', 'invoice_number', 'date_of_entry'],
			{
				validation: 'optional',
			},
		),
	},
	{
		type: 'accordion',
		heading: 'Booking',
		fields: getFormFields<Transportation>(
			transportationForm,
			['vehicle_type', 'arrival_time', 'trip_segments', 'way'],
			{
				validation: 'optional',
			},
		),
	},
	{
		type: 'accordion',
		heading: 'Vendor Details',
		fields: getFormFields<Transportation>(
			transportationForm,
			['vendor_name', 'cost_per_segment', 'total_cost', 'vendor_invoice'],
			{
				validation: 'optional',
			},
		),
	},
	{
		type: 'accordion',
		heading: 'Client',
		fields: getFormFields<Transportation>(
			transportationForm,
			[
				'client_name',
				'sale_per_segment',
				'vat',
				'municipality_fee',
				'discount',
				'total_sale',
			],
			{
				validation: 'optional',
			},
		),
	},
	{
		type: 'accordion',
		heading: 'Commission',
		fields: getFormFields<Transportation>(transportationForm, ['profit'], {
			validation: 'optional',
		}),
	},
	{
		type: 'accordion',
		heading: 'Other Fields',
		fields: getFormFields<Transportation>(
			transportationForm,
			['no_of_pax', 'reservation_status'],
			{
				validation: 'optional',
			},
		),
	},
]
