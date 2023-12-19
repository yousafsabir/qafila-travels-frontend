'use client'

import { useEffect, Fragment, useState, useMemo } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format as fechaDateFormat } from 'fecha'

import { NO_VALUE } from '@/lib/config'
import { fieldCalculation, cn, genRandString } from '@/lib/utils'
import { type ExtendedForm, type IFormField } from '@/lib/interfaces'
import { defaultValueTypes, DefaultValueTypes, textInputTypes } from '@/lib/interfaces/formField'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { CommonAccordion } from '.'

type CommonForm = {
	type: 'form'
}

type CommonModalForm = {
	type: 'modal'
	closeModal: () => void
}

type CommonFormProps = {
	operationType: 'create' | 'edit'
	extendedForm: ExtendedForm<any>
	defaultObj?: any
	submitText: string
	cancelText: string
	submitFunc: (values: any) => void
} & (CommonForm | CommonModalForm)

export const CommonForm = (props: CommonFormProps) => {
	const extendedForm = useMemo<ExtendedForm<any>>(() => {
		return props.extendedForm.map((group) => {
			return {
				...group,
				fields: group.fields.map((field) => {
					if (field.type === 'heading') {
						return field
					}
					let defaultValue = ''
					if (props.operationType === 'edit') {
						if (props.defaultObj && props.defaultObj[field.key]) {
							defaultValue =
								field.type === 'date'
									? fechaDateFormat(
											new Date(props.defaultObj[field.key]),
											'YYYY-MM-DD',
									  )
									: String(props.defaultObj[field.key])
						} else if (field.defaultValue) {
							defaultValue = field.defaultValue
						}
					} else if (
						defaultValueTypes.includes(field.defaultValue as DefaultValueTypes)
					) {
						if ((field.defaultValue as DefaultValueTypes) === '_current_date_') {
							defaultValue = fechaDateFormat(new Date(), 'YYYY-MM-DD')
						} else if ((field.defaultValue as DefaultValueTypes) === '_uid_') {
							defaultValue = genRandString()
						}
					}

					if (defaultValue) {
						field.defaultValue = defaultValue
					}
					return field
				}),
			}
		})
	}, [])
	const calculatedValuesConfig = useMemo<
		Record<string, { expression: string; dependencies: string[] }>
	>(() => {
		let returnVal: Record<string, { expression: string; dependencies: string[] }> = {}
		// Looking for calculated values and setting them to calculatedValuesConfig
		extendedForm.forEach((group) => {
			group.fields.forEach((field) => {
				if (field.type === 'heading') {
					return
				}
				if (field.valueType === 'derived') {
					let calculationDeps = fieldCalculation.getDependencyArray(
						props.extendedForm,
						field.expression.replace(/\n|\t/g, ''),
					)
					returnVal[field.key as string] = {
						expression: field.expression.replace(/\n|\t/g, ''),
						dependencies: calculationDeps,
					}
				}
			})
		})
		return returnVal
	}, [])
	const defaultValues = useMemo<Record<string, any>>(() => {
		let returnVal: Record<string, any> = {}
		extendedForm.forEach((group) => {
			group.fields.forEach((field) => {
				if (field.type !== 'heading') {
					returnVal[String(field.key)] = field.defaultValue
				}
			})
		})
		return returnVal
	}, [extendedForm])
	const zodSchema = extractSchemaFromField(extendedForm)

	const form = useForm<any>({
		resolver: zodResolver(zodSchema),
		defaultValues,
		resetOptions: {
			keepDefaultValues: false,
		},
	})

	useEffect(() => {}, [])

	useEffect(() => {
		let subscription: any
		const handler = setTimeout(() => {
			subscription = form.watch((data) => {
				Object.entries(calculatedValuesConfig).forEach(([key, value]) => {
					if (fieldCalculation.checkFields(data, value.dependencies)) {
						const result = String(
							fieldCalculation.multiLineEvaluate(value.expression, data),
						)
						const prevValue = data[key]
						if (result !== prevValue) {
							form.setValue(key, result)
						}
					}
				})
			})
		}, 300)
		return () => {
			clearTimeout(handler)
			if (subscription) {
				subscription.unsubscribe()
			}
		}
	}, [form.watch])

	const onCancel = () => {
		// Resetting Form values manually because form.reset() won't work the way it needs to be
		// what's happening now: form.reset() resets the form to defaultValues, even though I set that to false
		// form.reset()
		extendedForm.forEach((group) => {
			group.fields.forEach((field) => {
				if (field.type === 'heading') return
				if (field.type === 'select') {
					form.setValue((field as any).key, NO_VALUE)
				} else {
					form.setValue((field as any).key, '')
				}
			})
		})

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
							if (defaultValues[key] !== value) {
								filteredObj[key] = value
							}
						}
					})
					props.submitFunc(filteredObj)
				})}
				className='space-y-3 rounded-lg bg-gray-50 px-8 py-8'>
				{extendedForm.map((group, i) => (
					<Fragment key={group.type + i}>
						{group.type === 'normal-group' ? (
							<div
								className={cn(
									'grid grid-cols-1 gap-x-2 gap-y-3 px-1 sm:grid-cols-2 lg:grid-cols-3',
									group.className,
								)}>
								<FormGroup
									fields={group.fields}
									form={form}
									operationType={props.operationType}
								/>
							</div>
						) : group.type === 'accordion' ? (
							<CommonAccordion
								accordions={[
									{
										label: group.heading,
										content: (
											<FormGroup
												fields={group.fields}
												form={form}
												operationType={props.operationType}
											/>
										),
										classNames: {
											wrapper: group.classNames?.wrapper,
											trigger: group.classNames?.trigger,
											content: cn(
												'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-1 gap-x-2 gap-y-3',
												group.classNames?.content,
											),
										},
									},
								]}
							/>
						) : null}
					</Fragment>
				))}
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

function FormGroup(props: {
	fields: IFormField<any>[]
	operationType: CommonFormProps['operationType']
	form: UseFormReturn
}) {
	return (
		<>
			{props.fields.map((aField, i) => (
				<Fragment key={i}>
					{aField.type === 'heading' ? (
						<h3
							className={cn(
								'col-span-full mt-5 border-b border-gray-300 text-xl font-bold text-blue-500',
								aField.className,
							)}>
							{aField.heading}
						</h3>
					) : aField.type === 'select' ? (
						<FormField
							control={props.form.control}
							name={(aField as any).key}
							render={({ field }) => (
								<FormItem className={aField.classNames?.wrapper}>
									<FormLabel className={aField.classNames?.label}>
										{aField.label}
									</FormLabel>
									<FormControl>
										<Select {...field} onValueChange={field.onChange}>
											<SelectTrigger
												className={aField.classNames?.selectTrigger}>
												<SelectValue
													className={
														aField.classNames?.selectTriggerValue
													}
													placeholder={aField.placeholder}
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{aField.values.map((value, i) => (
														<SelectItem
															value={value.value}
															key={i}
															className={
																aField.classNames?.selectItem
															}>
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
					) : textInputTypes.includes(aField.type) ? (
						<FormField
							control={props.form.control}
							name={(aField as any).key}
							render={({ field }) => (
								<FormItem
									className={aField.classNames && aField.classNames.wrapper}>
									<FormLabel
										className={aField.classNames && aField.classNames.label}>
										{aField.label}
									</FormLabel>
									<FormControl>
										<Input
											type={aField.type}
											{...field}
											placeholder={aField.placeholder}
											className={aField?.classNames?.input}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					) : null}
				</Fragment>
			))}
		</>
	)
}

function extractSchemaFromField(form: ExtendedForm<any>) {
	let schemaObj: Record<string, z.ZodTypeAny> = {}
	for (let group of form) {
		for (let field of group.fields) {
			if (field.type !== 'heading' && field.validation) {
				schemaObj[(field as any).key] = field.validation
			}
		}
	}
	return z.object({
		...schemaObj,
	})
}
