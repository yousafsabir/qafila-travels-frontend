export function genRandString(len: number): string {
	return Math.random()
		.toString(36)
		.substring(2, len + 2)
}
