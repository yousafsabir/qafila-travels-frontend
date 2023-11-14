module.exports = {
	apps: [
		{
			name: 'next-app',
			script: 'npm',
			args: 'run start',
			env: {
				NEXT_PUBLIC_NODE_ENV: 'production',
				PORT: 3000,
			},
		},
	],
}
