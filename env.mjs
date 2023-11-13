import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	client: {
		NEXT_PUBLIC_NODE_ENV: z
			.enum(['development', 'production'])
			.optional()
			.default('development'),
		NEXT_PUBLIC_API_URL: z
			.string()
			.regex(
				new RegExp(
					/^(http:\/\/|https:\/\/)(localhost:\d+|[\w-]+(\.[\w-]+)+)(:\d+)?(\/.*)?$/,
				),
			),
	},
})
