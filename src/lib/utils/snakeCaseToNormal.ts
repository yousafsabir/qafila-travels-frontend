export function snakeCaseToNormal(variable: string): string {
	return variable.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ')
}
