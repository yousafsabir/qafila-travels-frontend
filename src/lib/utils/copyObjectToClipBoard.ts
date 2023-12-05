import { snakeCaseToNormal } from './snakeCaseToNormal'

export function copyObjectToClipBoard(obj: Record<string, any>): void {
	let text = ''
	Object.entries(obj).forEach(([key, value]) => {
		text += snakeCaseToNormal(key, { capitalize: true })
		if (typeof value === 'boolean') {
			text += ` = ${value ? 'yes' : 'no'}\n`
		} else if (!value) {
			text += ' = <empty>\n'
		} else if (typeof value === 'object' && typeof value.length === 'number') {
			if (value.length) {
				text += ' = \n'
				;(value as Array<any>).forEach((value) => {
					text += `${value},\n`
				})
			} else {
				text += ' = <no data>\n'
			}
		} else {
			text += ` = ${value}\n`
		}
	})
	navigator.clipboard.writeText(text)
}
