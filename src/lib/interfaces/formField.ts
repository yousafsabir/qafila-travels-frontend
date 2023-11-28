import * as z from 'zod'

type ITextField<T> = {
	type: 'text' | 'email' | 'password' | 'date'
	label: string
	key: keyof T
	defaultValue: string
	placeholder: string
	validation: z.ZodTypeAny | null
}

type INumberField<T> = {
	type: 'number'
	label: string
	key: keyof T
	defaultValue: string
	placeholder: string
	validation: z.ZodTypeAny | null
}

type ISelectField<T> = {
	type: 'select'
	label: string
	key: keyof T
	values: {
		label: string
		value: string
	}[]
	defaultValue: string
	placeholder: string
	validation: z.ZodTypeAny | null
}

export type IFormField<T> = ITextField<T> | INumberField<T> | ISelectField<T>
