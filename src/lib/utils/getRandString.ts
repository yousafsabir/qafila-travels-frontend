/**
 * `genRandString()` gives back random string of alphanumeric characters upto given length
 * @param {number} len default: 16
 * @returns
 */
export function genRandString(len: number = 16): string {
	return Math.random()
		.toString(36)
		.substring(2, len + 2)
}
