'use client'

import { QueryClient, QueryClientProvider, QueryClientProviderProps } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export function QueryProvider({ children }: { children?: React.ReactNode }) {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
