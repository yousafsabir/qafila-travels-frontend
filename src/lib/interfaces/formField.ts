import * as z from 'zod'

type NormalValue = {
	/**
	 * @description value that is not calculated from other values in the same object
	 */
	valueType: 'normal'
}

type CalculatedValue = {
	/**
	 * @description value that is calculated from other values in the same object
	 */
	valueType: 'calculated'
	calculationType: 'arithmetic' | 'string-interpolated'
	/**
	 * @description Expression that would be resolved in calculation
	 *
	 * @example
	 * Arithmetic Expression would be something: "var_1 + var_2 / (var_3 * var_4)"
	 * While String interpolated one would be something like: "var_1 var_2"
	 *
	 * @see Note: Be careful while specifying variable keys in the expression, because
	 * they can't be validated in any way. This would cause unexpected results
	 */
	expression: string // arithmetic regexp: ^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[+\-*/])(?=.*[ _]).+$
}

export const defaultValueTypes = ['_current_date_', '_uid_'] as const // underscores to keep it separate from other deafult values

/**
 * Please use typescript's intellisense when using it in form for derived defaultValue
 */
export type DefaultValueTypes = (typeof defaultValueTypes)[number]

type CommonInputData<T> = {
	/**
	 * @description text of the label of the input field
	 */
	label: string
	/**
	 * @description key, by which the value is going to be stored in an object
	 */
	key: keyof T
	/**
	 * @description to set an input's default value. mainly used for editing
	 */
	defaultValue: DefaultValueTypes | string
	/**
	 * @description placeholder of an input
	 */
	placeholder: string
	/**
	 * @description validation of the field by zod
	 */
	validation: z.ZodTypeAny | null
} & (NormalValue | CalculatedValue)

export const textInputTypes = ['text', 'email', 'password', 'date', 'number', 'file'] as const

export type ITextInputField<T> = CommonInputData<T> & {
	type: typeof textInputTypes[number]
	classNames?: {
		wrapper?: string
		label?: string
		input?: string
	}
}

type ISelectField<T> = CommonInputData<T> & {
	type: 'select'
	valueType: 'normal' // Selects can't have calculated values for now
	values: {
		label: string
		value: string
	}[]
	classNames?: {
		wrapper?: string
		label?: string
		selectTrigger?: string
		selectTriggerValue?: string
		selectItem?: string
	}
}

// TODO: make an array of such elements which are not form fields
type ISubHeading = {
	type: 'heading'
	heading: string
	className?: string
}

/**
 * @description Common Form Field Type
 */
export type IFormField<T> = ITextInputField<T> | ISelectField<T> | ISubHeading

type FormGroup<T> = {
	fields: IFormField<T>[]
} & (
	| {
			type: 'accordion'
			heading: string
			classNames?: {
				wrapper?: string
				trigger?: string
				content?: string
			}
	  }
	| { type: 'normal-group'; heading?: string; className?: string }
)

export type ExtendedForm<T> = Array<FormGroup<T>>
