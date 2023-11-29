import * as z from 'zod'

type NormalValue = {
	valueType: 'normal'
}

type CalculatedValue = {
	valueType: 'calculated'
	calculationType: 'arithmetic' | 'string-interpolated'
	calculation: string
}

type CommonInputData<T> = {
	label: string
	key: keyof T
	defaultValue: string
	placeholder: string
	validation: z.ZodTypeAny | null
} & (NormalValue | CalculatedValue)

type ITextField<T> = CommonInputData<T> & {
	type: 'text' | 'email' | 'password' | 'date' | 'number'
}

type ISelectField<T> = CommonInputData<T> & {
	type: 'select'
	values: {
		label: string
		value: string
	}[]
}

export type IFormField<T> = ITextField<T> | ISelectField<T>
