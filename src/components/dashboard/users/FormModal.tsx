'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateUser } from '@/lib/mutations/users'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/common/ui/form'
import { CreateUser } from '@/lib/interfaces'
import { CreateUserSchema } from '@/lib/validations'
import { Input } from '@/components/common/ui/input'
import { Button } from '@/components/common/ui/button'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/common/ui/select'

export const FormModal = ({ closeModal }: { closeModal: () => void }) => {
	const form = useForm<CreateUser>({
		resolver: zodResolver(CreateUserSchema),
	})

	const createUser = useCreateUser()

	const onSubmit = async (values: CreateUser) => {
		await createUser.mutateAsync(values)
	}

	const onCancel = () => {
		form.reset()
		closeModal()
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-3 rounded-lg bg-gray-50 px-8 py-8'>
				<div className='grid grid-cols-2 gap-x-2 gap-y-3'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder='Enter Name' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='user_name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder='Enter username' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder='Enter Email' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='phone'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone Number</FormLabel>
								<FormControl>
									<Input type='phone' {...field} />
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
									<Input placeholder='Enter password' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='access_level'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Access Level</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} {...field}>
										<SelectTrigger className=''>
											<SelectValue placeholder='Select Access Level' />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Select Access Level</SelectLabel>
												<SelectItem value='create'>Read Access</SelectItem>
												<SelectItem value='create,read'>
													Create & Read Access
												</SelectItem>
												<SelectItem value='create,read,update'>
													Create, Read & Update Access
												</SelectItem>
												<SelectItem value='create,read,update,delete'>
													Create, Read, Update & Delete Access
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='role'
						render={({ field }) => (
							<FormItem>
								<FormLabel>User Role</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} {...field}>
										<SelectTrigger className=''>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Select User Role</SelectLabel>
												<SelectItem value='user'>User</SelectItem>
												<SelectItem value='admin'>Admin</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='mt-6 flex justify-center gap-2'>
					<Button variant={'outline'} className='px-8' type='button' onClick={onCancel}>
						Cancel
					</Button>
					<Button className='px-8' type='submit'>
						Create
					</Button>
				</div>
			</form>
		</Form>
	)
}
