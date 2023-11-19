'use client'

import { useEffect, Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/common/ui/form'
import { type IFormField } from '@/lib/interfaces'
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

export const CommonForm = ({
	formType,
	formFields,
	updateObj,
	submitFunc,
	closeModal,
}: {
	formType: 'create' | 'edit'
	formFields: IFormField[]
	updateObj?: any
	submitFunc: (values: any) => void
	closeModal: () => void
}) => {
	let defaultValues: Record<string, any> = {}
	if (formType === 'edit') {
		formFields = formFields.map((field) => {
			Object.entries(updateObj).forEach(([key, value]) => {
				if (key === field.key) {
					field.defaultValue = String(value) as any
					defaultValues[key] = String(value) as any
				}
			})
			return field
		})
	}

	const zodSchema = extractSchemaFromField(formFields)
	const form = useForm<any>({
		resolver: zodResolver(zodSchema),
		defaultValues: defaultValues,
	})

	const onCancel = () => {
		form.reset()
		closeModal()
	}

	useEffect(() => {
		form.reset()
	}, [formType])

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(submitFunc)}
				className='space-y-3 rounded-lg bg-gray-50 px-8 py-8'>
				<div className='grid grid-cols-2 gap-x-2 gap-y-3'>
					{formFields.map((aField, i) => (
						<Fragment key={i}>
							{['email', 'text', 'password', 'number', 'date'].includes(aField.type) ? (
								<FormField
									control={form.control}
									name={aField.key}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{aField.label}</FormLabel>
											<FormControl>
												<Input
													placeholder={aField.placeholder}
													type={aField.type}
													{...field}
													defaultValue={
														formType === 'edit'
															? (function () {
																	return aField.defaultValue
															  })()
															: ''
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							) : aField.type === 'select' ? (
								<FormField
									control={form.control}
									name={aField.key}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{aField.label}</FormLabel>
											<FormControl>
												<Select
													onValueChange={field.onChange}
													defaultValue={
														formType === 'edit'
															? aField.defaultValue
															: ''
													}
													{...field}>
													<SelectTrigger className=''>
														<SelectValue
															placeholder={aField.placeholder}
														/>
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															{aField.values.map((value, i) => (
																<SelectItem value={value.value} key={i}>
																	{value.label}
																</SelectItem>
															))}
														</SelectGroup>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							) : null}
						</Fragment>
					))}
				</div>
				<div className='mt-6 flex justify-center gap-2'>
					<Button variant={'outline'} className='px-8' type='button' onClick={onCancel}>
						Cancel
					</Button>
					<Button className='px-8' type='submit'>
						{formType === 'create' ? 'Create' : 'Update'}
					</Button>
				</div>
			</form>
		</Form>
	)
}

function extractSchemaFromField(formFields: IFormField[]) {
	let schemaObj: Record<string, z.ZodTypeAny> = {}
	for (let field of formFields) {
		if (field.validation) {
			schemaObj[field.key] = field.validation
		}
	}
	return z.object({
		...schemaObj,
	})
}
