import { useQuery } from '@tanstack/react-query'

import { httpClient } from '@/lib/config'
import { getCookie } from '@/lib/utils'
import { getMe } from './apis'

export function useGetMe() {
	return useQuery({
		queryKey: ['get_me'],
		queryFn: () => {
			const authToken = getCookie('access_token')
			httpClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
			return getMe()
		},
	})
}