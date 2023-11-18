import { IFormField } from '@/lib/interfaces'
import * as z from 'zod'

export const createUserForm: IFormField[] = [
	{
		label: 'Email',
		key: 'email',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, 'Email is required').email('Invalid email'),
	},
	{
		label: 'Username',
		key: 'username',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, 'Username is required'),
	},
	{
		label: 'Name',
		key: 'name',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string(),
	},
	{
		label: 'Phone',
		key: 'phone',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z.string().transform((a) => Number(a)),
	},
	{
		label: 'Role',
		key: 'role',
		type: 'select',
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
	{
		label: 'Access Level',
		key: 'access_level',
		type: 'select',
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
	{
		label: 'Password',
		key: 'password',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, 'Password is required')
			.min(8, 'Password must have than 8 characters'),
	},
]

export const updateUserForm: IFormField[] = [
	{
		label: 'Email',
		key: 'email',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, 'Email is required').email('Invalid email').optional(),
	},
	{
		label: 'Username',
		key: 'username',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().min(1, 'Username is required').optional(),
	},
	{
		label: 'Name',
		key: 'name',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z.string().optional(),
	},
	{
		label: 'Phone',
		key: 'phone',
		type: 'number',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.transform((a) => Number(a))
			.optional(),
	},
	{
		label: 'Role',
		key: 'role',
		type: 'select',
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
		validation: z.enum(['user', 'admin']).optional(),
	},
	{
		label: 'Access Level',
		key: 'access_level',
		type: 'select',
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
		validation: z
			.enum(['read', 'create,read', 'create,read,update', 'create,read,update,delete'])
			.optional(),
	},
	{
		label: 'Password',
		key: 'password',
		type: 'text',
		defaultValue: '',
		placeholder: '',
		validation: z
			.string()
			.min(1, 'Password is required')
			.min(8, 'Password must have than 8 characters')
			.optional(),
	},
]
