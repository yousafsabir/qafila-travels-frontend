import * as z from 'zod'

import { NO_VALUE } from '@/lib/config'
import { defaultValueTypes, type DefaultValueTypes, type IFormField } from '@/lib/interfaces'

export function getFormFields<T>(
	form: Record<keyof Omit<T, '_id' | 'created_at' | 'updated_at'>, IFormField<T>>,
	keys: 'all' | (keyof T | IFormField<T>)[],
	options: {
		validation?: 'optional' | 'none'
		calculation?: boolean
		derivedDefaultValue?: boolean
	} = {
		validation: undefined,
		calculation: true,
		derivedDefaultValue: true,
	},
): IFormField<T>[] {
	if (keys === 'all') {
		let excludedKeys = ['_id', 'created_at', 'updated_at']
		keys = Object.keys(form).filter((key) => !excludedKeys.includes(key)) as (keyof T)[]
	}
	return keys.map((key) => {
		if (typeof key === 'string') {
			let field = { ...form[key as keyof Omit<T, '_id' | 'created_at' | 'updated_at'>] }
			if (field.type === 'heading') {
				return field
			} else {
				if (options.validation === 'optional') {
					field.validation = field.validation?.optional() as never
				} else if (options.validation === 'none') {
					field.validation = z.any()
					if (field.type === 'select')
						field.values = [
							{
								label: '--Select--',
								value: NO_VALUE,
							},
							...field.values,
						]
				}
			}
			if (!options.calculation && field.valueType === 'derived') {
				// ChanginG Derived Field to Normal
				// @ts-ignore
				field.valueType = 'normal'
				// @ts-ignore
				delete field.derivationType
				// @ts-ignore
				delete field.expression
			}
			if (
				!options.derivedDefaultValue &&
				defaultValueTypes.includes(field.defaultValue as DefaultValueTypes)
			) {
				field.defaultValue = ''
			}
			return field
		} else {
			return key as IFormField<T>
		}
	})
}
