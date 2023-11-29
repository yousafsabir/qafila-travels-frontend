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
	defaultValue: string
	/**
	 * @description placeholder of an input
	 */
	placeholder: string
	/**
	 * @description validation of the field by zod
	 */
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

/**
 * @description hello world
 */
export type IFormField<T> = ITextField<T> | ISelectField<T>
