import { IFormField } from '@/lib/interfaces'
import * as z from 'zod'

export const createHotelForm: IFormField[] = [
	{
		label: 'Sr No.',
		key: 'SNo',
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
		key: 'DateOfEntry',
		type: 'date',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, 'Date of Entry is required'),
	},
	{
		label: 'Invoice Number',
		key: 'InvoiceNumber',
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
		key: 'GuestName',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Guest Name is required`),
	},
	{
		label: 'Check In Date',
		key: 'CheckInDate',
		type: 'date',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Check In Date is required`),
	},
	{
		label: 'Checkout Date',
		key: 'CheckoutDate',
		type: 'date',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Checkout Date is required`),
	},
	{
		label: 'Number Of Nights',
		key: 'NumberOfNights',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, `Number Of Nights is required`)
			.transform((a) => Number(a)),
	},
	{
		label: 'Room Type',
		key: 'RoomType',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Room Type is required`),
	},
	{
		label: 'View',
		key: 'View',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `View is required`),
	},
	{
		label: 'Meal Plan',
		key: 'MealPlan',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Meal Plan is required`),
	},
	{
		label: 'Hotel Name',
		key: 'HotelName',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Hotel Name is required`),
	},
	{
		label: 'Cost Per Night',
		key: 'CostPerNight',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, `Cost Per Night is required`)
			.transform((a) => Number(a)),
	},
	{
		label: 'Sales Per Night',
		key: 'SalesPerNight',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, `Sales Per Night is required`)
			.transform((a) => Number(a)),
	},
	{
		label: 'Total Cost',
		key: 'TotalCost',
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
		key: 'VATPercent',
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
		key: 'MunicipalityFeePercent',
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
		key: 'TotalSales',
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
		key: 'Profit',
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
		key: 'VendorName',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Vendor Name is required`),
	},
	{
		label: 'Vendor Invoice Number',
		key: 'VendorInvoiceNumber',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, `Vendor Invoice Number is required`)
			.transform((a) => Number(a)),
	},
	{
		label: 'Client Name',
		key: 'ClientName',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Client Name is required`),
	},
	{
		label: 'HCN Number',
		key: 'HCNNumber',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, `HCN Number is required`)
			.transform((a) => Number(a)),
	},
	{
		label: 'Reservation Status',
		key: 'ReservationStatus',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Reservation Status is required`),
	},
]
export const updateHotelForm: IFormField[] = [
	{
		label: 'Sr No.',
		key: 'SNo',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, 'Sr No. is required').email('Invalid email').optional(),
	},
	{
		label: 'Date of Entry',
		key: 'DateOfEntry',
		type: 'date',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, 'Date of Entry is required').optional(),
	},
	{
		label: 'Invoice Number',
		key: 'InvoiceNumber',
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
		key: 'GuestName',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Guest Name is required`).optional(),
	},
	{
		label: 'Check In Date',
		key: 'CheckInDate',
		type: 'date',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Check In Date is required`).optional(),
	},
	{
		label: 'Checkout Date',
		key: 'CheckoutDate',
		type: 'date',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Checkout Date is required`).optional(),
	},
	{
		label: 'Number Of Nights',
		key: 'NumberOfNights',
		type: 'number',
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
		key: 'RoomType',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Room Type is required`).optional(),
	},
	{
		label: 'View',
		key: 'View',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `View is required`).optional(),
	},
	{
		label: 'Meal Plan',
		key: 'MealPlan',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Meal Plan is required`).optional(),
	},
	{
		label: 'Hotel Name',
		key: 'HotelName',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Hotel Name is required`).optional(),
	},
	{
		label: 'Cost Per Night',
		key: 'CostPerNight',
		type: 'number',
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
		key: 'SalesPerNight',
		type: 'number',
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
		key: 'TotalCost',
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
		key: 'VATPercent',
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
		key: 'MunicipalityFeePercent',
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
		key: 'TotalSales',
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
		key: 'Profit',
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
		key: 'VendorName',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Vendor Name is required`).optional(),
	},
	{
		label: 'Vendor Invoice Number',
		key: 'VendorInvoiceNumber',
		type: 'number',
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
		key: 'ClientName',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Client Name is required`).optional(),
	},
	{
		label: 'HCN Number',
		key: 'HCNNumber',
		type: 'number',
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
		key: 'ReservationStatus',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Reservation Status is required`).optional(),
	},
]
