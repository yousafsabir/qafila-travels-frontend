import * as z from 'zod'

export const CreateUserSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	user_name: z.string().min(1, 'Username is required'),
	name: z.string().min(1, 'Name is required'),
	phone: z.string().min(1, 'Phone is required'),
	role: z.enum([
		'user',
		'admin',
	]),
	access_level: z.enum([
		'create',
		'create,read',
		'create,read,update',
		'create,read,update,delete',
	]),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must have than 8 characters'),
})

export type ICreateUserSchema = z.infer<typeof CreateUserSchema>
