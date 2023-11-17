import * as z from 'zod'

type ITextField = {
	type: 'text' | 'email' | 'password'
	label: string
	key: string
	defaultValue: string
	placeholder: string
	validation: z.ZodTypeAny | null
}

type INumberField = {
	type: 'number'
	label: string
	key: string
	defaultValue: string
	placeholder: string
	validation: z.ZodTypeAny | null
}

type ISelectField = {
	type: 'select'
	label: string
	key: string
	values: {
		label: string
		value: string
	}[]
	defaultValue: string
	placeholder: string
	validation: z.ZodTypeAny | null
}

export type IFormField = ITextField | INumberField | ISelectField
