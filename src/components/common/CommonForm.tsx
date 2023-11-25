'use client'

import { useEffect, Fragment, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { NO_VALUE } from '@/lib/config'
import { type IFormField } from '@/lib/interfaces'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/common/ui/form'
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

type CommonForm = {
	type: 'form'
	operationType: 'create' | 'edit'
	formFields: IFormField[]
	defaultObj?: any
	submitText: string
	cancelText: string
	submitFunc: (values: any) => void
}

type CommonModalForm = {
	type: 'modal'
	operationType: 'create' | 'edit'
	formFields: IFormField[]
	defaultObj?: any
	submitText: string
	cancelText: string
	submitFunc: (values: any) => void
	closeModal: () => void
}

type CommonFormProps = CommonForm | CommonModalForm

export const CommonForm = (props: CommonFormProps) => {
	let [defaultValues, setDefaultValues] = useState<Record<string, any>>({})
	let [formFields, setFormFields] = useState<IFormField[]>([])

	useEffect(() => {
		if (props.operationType === 'edit') {
			setFormFields(
				props.formFields.map((field) => {
					Object.entries(props.defaultObj || {}).forEach(([key, value]) => {
						if (key === field.key) {
							field.defaultValue = String(value) as any
							setDefaultValues((prev) => ({ ...prev, [key]: String(value) }))
						}
					})
					return field
				}),
			)
		} else {
			setFormFields(props.formFields)
		}
	}, [])

	const zodSchema = extractSchemaFromField(formFields)
	const form = useForm<any>({
		resolver: zodResolver(zodSchema),
		defaultValues: defaultValues,
	})

	const onCancel = () => {
		defaultValues = {}

		// Resetting Form values manually because form.reset() won't work
		formFields.forEach((field) => {
			if (field.type === 'select') {
				form.setValue(field.key, NO_VALUE)
			} else {
				form.setValue(field.key, '')
			}
		})
		form.reset()
		if (props.type === 'modal') props.closeModal()
		if (props.type === 'form') props.submitFunc({})
	}

	useEffect(() => {
		form.reset()
	}, [props.operationType])

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((values) => {
					let filteredObj: Record<string, any> = {}
					Object.entries(values).forEach(([key, value]) => {
						if (value !== NO_VALUE && (value || typeof value === 'boolean')) {
							// TODO: below logic should be this: defaultValues[key] && defaultValues[key] !== value but reducing it due to current backend
							if (defaultValues[key] !== value) {
								filteredObj[key] = value
							}
						}
					})
					props.submitFunc(filteredObj)
				})}
				className='space-y-3 rounded-lg bg-gray-50 px-8 py-8'>
				<div className='grid grid-cols-2 gap-x-2 gap-y-3'>
					{formFields.map((aField, i) => (
						<Fragment key={i}>
							{['email', 'text', 'password', 'number', 'date'].includes(
								aField.type,
							) ? (
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
														props.operationType === 'edit'
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
														props.operationType === 'edit'
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
																<SelectItem
																	value={value.value}
																	key={i}>
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
				<div className='flex justify-center gap-2 pt-6'>
					<Button variant={'outline'} className='px-8' type='button' onClick={onCancel}>
						{props.cancelText}
					</Button>
					<Button className='px-8' type='submit'>
						{props.submitText}
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
