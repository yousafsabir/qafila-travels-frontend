'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/common/ui/form'
import { FormSchema, type IFormSchema } from '@/lib/validations'
import { Input } from '@/components/common/ui/input'
import { Button } from '@/components/common/ui/button'

export const SignInForm = () => {
	const form = useForm<IFormSchema>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = (values: IFormSchema) => {
		console.log(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='bg-gray-50 rounded-lg px-8 py-8'>
				<div className='space-y-2'>
					<h1 className='text-center text-5xl font-extrabold text-black pt-4 mb-14'>Login</h1>
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
