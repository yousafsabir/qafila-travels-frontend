'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import { useLogin } from './mutations'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/common/ui/form'
import { UserLogin } from './interfaces'
import { SignInSchema } from './validations'
import { Input } from '@/components/common/ui/input'
import { Button } from '@/components/common/ui/button'

export const SignInForm = () => {
	const router = useRouter()

	const form = useForm<UserLogin>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const login = useLogin()

	const onSubmit = async (values: UserLogin) => {
		await login.mutateAsync(values)
	}

	useEffect(() => {
		if (login.data?.status === 200) {
			router.push('/dashboard')
		}
		if (login.isError) {
			toast.error(String(login.data))
		}
	}, [login.data])

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='rounded-lg bg-gray-50 px-8 py-8'>
				<div className='space-y-2'>
					<h1 className='mb-14 pt-4 text-center text-5xl font-extrabold text-black'>
						Login
					</h1>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder='mail@example.com' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='Enter your password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button className='mt-6 w-full' type='submit'>
					Sign in
				</Button>
			</form>
		</Form>
	)
}
