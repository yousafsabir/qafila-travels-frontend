/**
 * `genRandString()` gives back random string of alphanumeric characters upto given length 
 * @param {number} len 
 * @returns 
 */
export function genRandString(len: number): string {
	return Math.random()
		.toString(36)
		.substring(2, len + 2)
}
