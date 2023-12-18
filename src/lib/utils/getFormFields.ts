import * as z from 'zod'

import { IFormField } from '@/lib/interfaces'
import { NO_VALUE } from '@/lib/config'

export function getFormFields<T>(
	form: Record<keyof Omit<T, '_id' | 'created_at' | 'updated_at'>, IFormField<T>>,
	keys: (keyof T)[],
	options: {
		validation?: 'optional' | 'none'
		calculation?: boolean
	} = {
		validation: undefined,
		calculation: true,
	},
): IFormField<T>[] {
	return keys.map((key) => {
		let field = form[key as keyof Omit<T, '_id' | 'created_at' | 'updated_at'>]
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
		return field
	})
}
