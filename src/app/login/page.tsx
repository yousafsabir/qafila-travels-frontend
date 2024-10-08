import { Metadata } from 'next'

import { SignInForm } from './SignInForm'

export const metadata: Metadata = {
	title: 'Login',
}

export default function Login() {
	return (
		<main className='flex min-h-screen items-center bg-gray-200'>
			<section className='mx-auto flex-1 max-w-2xl px-8 xs:px-14'>
				<SignInForm />
			</section>
		</main>
	)
}
