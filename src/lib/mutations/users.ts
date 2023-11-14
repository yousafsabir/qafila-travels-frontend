import { useMutation } from '@tanstack/react-query'

import { httpClient } from '@/lib/config'
import { userLogin } from '@/lib/apis/users'
import { UserLogin } from '@/lib/interfaces/users'

export function useLogin() {
	return useMutation({
		mutationKey: ['admin_login'],
		mutationFn: (params: UserLogin) => userLogin(params),
		onSuccess: (response) => {
			if (response.status === 200) {
				httpClient.extend({
					headers: {
						Authorization: `Bearer ${response.access_token}`,
					},
				})
			}
		},
	})
}
