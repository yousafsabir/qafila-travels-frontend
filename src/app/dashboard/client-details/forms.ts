import * as z from 'zod'

import { type ExtendedForm, type DefaultValueTypes, type IFormField } from '@/lib/interfaces'
import { type ClientDetails } from './interfaces'
import { getFormFields } from '@/lib/utils'

const clientDetailsForm: Record<
	keyof Omit<ClientDetails, '_id' | 'created_at' | 'updated_at'>,
	IFormField<ClientDetails>
> = {
	client_name: {
		label: 'Sr. No',
		key: 'client_name',
		type: 'text',
		valueType: 'normal',
		defaultValue: '_uid_' as DefaultValueTypes,
		placeholder: '',
		validation: z.string().min(1, 'Name'),
	},
	email: {
		label: 'Invoice Number',
		key: 'email',
		type: 'email',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, 'Email'),
	},
	phone_number: {
		label: 'Phone',
		key: 'phone_number',
		type: 'number',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().transform((a) => Number(a)),
	},
	company_name: {
		label: 'Company Name',
		key: 'company_name',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Company Name is required`),
	},
	address: {
		label: 'Address',
		key: 'address',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Address is required`),
	},
	city: {
		label: 'City',
		key: 'city',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `City is required`),
	},
	country: {
		label: 'Country',
		key: 'country',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Country is required`),
	},
	client_page_link: {
		label: 'Client Page Link',
		key: 'client_page_link',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Client Page Link is required`),
	},
	page_view: {
		label: 'Page View',
		key: 'page_view',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Page View is required`),
	},
	nationality: {
		label: 'Nationality',
		key: 'nationality',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, `Nationality is required`),
	},
}

export const createClientDetailsForm: ExtendedForm<ClientDetails> = [
	{
		type: 'normal-group',
		fields: getFormFields<ClientDetails>(clientDetailsForm, 'all'),
	},
]

export const searchClientDetailsForm: ExtendedForm<ClientDetails> = [
	{
		type: 'normal-group',
		fields: getFormFields<ClientDetails>(clientDetailsForm, 'all', {
			validation: 'none',
			calculation: false,
			derivedDefaultValue: false,
		}),
	},
]

export const updateClientDetailsForm: ExtendedForm<ClientDetails> = [
	{
		type: 'normal-group',
		fields: getFormFields<ClientDetails>(clientDetailsForm, 'all', {
			validation: 'optional',
		}),
	},
]
