import * as z from 'zod'

import { type ExtendedForm, type IFormField } from '@/lib/interfaces'
import { CreateUser } from './interfaces'
import { getFormFields } from '@/lib/utils'

const userForm: Record<
	keyof Omit<CreateUser, '_id' | 'created_at' | 'updated_at'>,
	IFormField<CreateUser>
> = {
	email: {
		label: 'Email',
		key: 'email',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, 'Email is required').email('Invalid email'),
	},
	user_name: {
		label: 'Username',
		key: 'user_name',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, 'Username is required'),
	},
	name: {
		label: 'Name',
		key: 'name',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string(),
	},
	phone: {
		label: 'Phone',
		key: 'phone',
		type: 'number',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().transform((a) => Number(a)),
	},
	role: {
		label: 'Role',
		key: 'role',
		type: 'select',
		valueType: 'normal',
		values: [
			{
				label: 'User',
				value: 'user',
			},
			{
				label: 'Admin',
				value: 'admin',
			},
		],
		defaultValue: '',
		placeholder: 'Select Role',
		validation: z.enum(['user', 'admin']),
	},
	access_level: {
		label: 'Access Level',
		key: 'access_level',
		type: 'select',
		valueType: 'normal',
		values: [
			{
				label: 'Read Access',
				value: 'read',
			},
			{
				label: 'Create & Read Access',
				value: 'create,read',
			},
			{
				label: 'Create, Read & Update Access',
				value: 'create,read,update',
			},
			{
				label: 'Create, Read, Update & Delete Access',
				value: 'create,read,update,delete',
			},
		],
		defaultValue: '',
		placeholder: 'Select Access Level',
		validation: z.enum([
			'read',
			'create,read',
			'create,read,update',
			'create,read,update,delete',
		]),
	},
	isBanned: {
		label: 'Is Banned',
		key: 'isBanned',
		type: 'select',
		valueType: 'normal',
		values: [
			{
				label: 'Yes',
				value: 'true',
			},
			{
				label: 'No',
				value: 'false',
			},
		],
		defaultValue: '',
		placeholder: 'Change Ban Status',
		validation: z.enum(['true', 'false']).transform((a) => (a === 'true' ? true : false)),
	},
	isCreator: {
		label: 'Is Creator',
		key: 'isCreator',
		type: 'select',
		valueType: 'normal',
		values: [
			{
				label: 'Yes',
				value: 'true',
			},
			{
				label: 'No',
				value: 'false',
			},
		],
		defaultValue: '',
		placeholder: 'Change Creator Status',
		validation: z.enum(['true', 'false']).transform((a) => (a === 'true' ? true : false)),
	},
	isVerified: {
		label: 'Is Verified',
		key: 'isVerified',
		type: 'select',
		valueType: 'normal',
		values: [
			{
				label: 'Yes',
				value: 'true',
			},
			{
				label: 'No',
				value: 'false',
			},
		],
		defaultValue: '',
		placeholder: 'Change Verified Status',
		validation: z.enum(['true', 'false']).transform((a) => (a === 'true' ? true : false)),
	},
	password: {
		label: 'Password',
		key: 'password',
		type: 'text',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, 'Password is required')
			.min(8, 'Password must have than 8 characters'),
	},
	current_balance: {
		label: 'Current Balance',
		key: 'current_balance',
		type: 'number',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().transform((a) => Number(a)),
	},
	transactionIds: {
		label: 'Transactions',
		key: 'transactionIds',
		type: 'number',
		valueType: 'normal',
		defaultValue: '',
		placeholder: '',
		validation: z.string().transform((a) => Number(a)),
	},
}

export const createUserForm: ExtendedForm<CreateUser> = [
	{
		type: 'normal-group',
		fields: getFormFields<CreateUser>(userForm, [
			'email',
			'user_name',
			'name',
			'phone',
			'role',
			'access_level',
			'isBanned',
			'isCreator',
			'isVerified',
			'password',
		]),
	},
]

export const searchUserForm: ExtendedForm<CreateUser> = [
	{
		type: 'normal-group',
		fields: getFormFields<CreateUser>(
			userForm,
			[
				'email',
				'user_name',
				'name',
				'phone',
				'role',
				'access_level',
				'isBanned',
				'isCreator',
				'isVerified',
			],
			{
				validation: 'none',
				calculation: false,
			},
		),
	},
]

export const updateUserForm: ExtendedForm<CreateUser> = [
	{
		type: 'normal-group',
		fields: getFormFields<CreateUser>(
			userForm,
			[
				'email',
				'user_name',
				'name',
				'phone',
				'role',
				'access_level',
				'isBanned',
				'isCreator',
				'isVerified',
			],
			{
				validation: 'optional',
			},
		),
	},
]
