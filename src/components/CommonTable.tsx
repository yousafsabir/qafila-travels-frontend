import * as React from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { FileEdit, Trash, CheckCircle2, XCircle } from 'lucide-react'
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
	type CellContext,
} from '@tanstack/react-table'
import Loading from 'react-loading'
import { ChevronRight, ChevronsRight, ChevronLeft, ChevronsLeft } from 'lucide-react'
import toast from 'react-hot-toast'

import { PAGINATION_LIMIT, env } from '@/lib/config'
import { snakeCaseToNormal, copyObjectToClipBoard } from '@/lib/utils'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuCheckboxItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import UploadData from './UploadData'

const commonTableRowActions = [
	'view_details',
	'copy_details',
	'duplicate',
	'create_invoice',
] as const

export type CommonTableProps = {
	tableKey: string
	data: any
	columns: string[]
	hideRowActions?: (typeof commonTableRowActions)[number][]
	onCreate: () => void
	onEdit: (index: number) => void
	onViewDetails: (index: number) => void
	onUpload: (file: File) => void
	onDeleteMany: (ids: string[]) => void
	page: number
	limit: number
	lastPage: number
	totalDocuments: number
	setPage: (page: number) => void
	setLimit: (limit: number) => void
	loading: boolean
}

export type TableMeta = Pick<CommonTableProps, 'onEdit'>

export function CommonTable(props: CommonTableProps) {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const initialVisibleColumns = React.useMemo(() => {
		let hiddenColumns: Record<string, boolean> = {}
		for (let i = 5; i < props.columns.length; i++) {
			hiddenColumns[props.columns[i]] = false
		}
		return hiddenColumns
	}, [])
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>(initialVisibleColumns)
	const [rowSelection, setRowSelection] = React.useState({})
	const tableColums = React.useMemo(() => {
		return [
			{
				id: 'select',
				header: ({ table }) => (
					<Checkbox
						checked={table.getIsAllPageRowsSelected()}
						onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
						aria-label='Select all'
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label='Select row'
					/>
				),
				enableSorting: false,
				enableHiding: false,
			},
			...props.columns.map((column) => ({
				accessorKey: column,
				header: <p className='capitalize'>{snakeCaseToNormal(column)}</p>,

				// @ts-ignore
				cell: ({ row }) => {
					const value = row.getValue(column)
					return (
						<div className='flex flex-col' key={column}>
							{typeof value === 'boolean' ? (
								<p className='flex-1'>
									{value ? (
										<CheckCircle2 className='h-4 w-4 text-green-500' />
									) : (
										<XCircle className='h-4 w-4 text-red-500' />
									)}
								</p>
							) : typeof value === 'object' && value && value[0] ? (
								<p className='flex-1 overflow-ellipsis break-words'>
									{(value as Array<any>).join(', ')}
								</p>
							) : (
								<p
									className='flex-1 overflow-ellipsis break-words'
									onClick={() => {
										navigator.clipboard.writeText(value)
										toast.success('Copied')
									}}>
									{value}
								</p>
							)}
						</div>
					)
				},
			})),
			{
				id: 'actions',
				enableHiding: false,
				cell: ({ row, table }) => {
					const index = row.index
					const meta = table.options.meta

					return (
						<>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant='ghost' className='h-8 w-8 p-0'>
										<span className='sr-only'>Open menu</span>
										<DotsHorizontalIcon className='h-4 w-4' />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									<DropdownMenuLabel>Actions</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<ActionDropdown
										row={row}
										hideRowActions={props.hideRowActions}
										onViewDetails={props.onViewDetails}
										tableKey={props.tableKey}
									/>
								</DropdownMenuContent>
							</DropdownMenu>
							<Button
								variant='ghost'
								className='h-8 w-8 p-0'
								// Not using props.onEdit directly due to memoization
								onClick={() => {
									if (meta?.onEdit) {
										meta.onEdit(index)
									}
								}}>
								<span className='sr-only'>Edit</span>
								<FileEdit className='h-4 w-4 text-green-500' />
							</Button>
						</>
					)
				},
			},
		] as ColumnDef<any>[]
	}, [])

	const table = useReactTable({
		data: props.data,
		columns: tableColums,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		meta: {
			onEdit: props.onEdit,
		},
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			pagination: {
				pageIndex: props.page,
				pageSize: props.limit,
			},
		},
	})
	return (
		<>
			<div className='flex items-center justify-between py-4'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className=''>
							Entries: {props.limit}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{PAGINATION_LIMIT.map((limit) => {
							return (
								<DropdownMenuItem key={limit} onClick={() => props.setLimit(limit)}>
									{limit}
								</DropdownMenuItem>
							)
						})}
					</DropdownMenuContent>
				</DropdownMenu>
				<div className='flex flex-wrap gap-4'>
					{(() => {
						const selectedRows = table.getFilteredSelectedRowModel().rows

						if (selectedRows.length) {
							return (
								<Button
									variant={'destructive'}
									onClick={() => {
										props.onDeleteMany(
											selectedRows.map((row) => row.original._id),
										)
										setRowSelection({})
									}}>
									Delete ({selectedRows.length})
								</Button>
							)
						} else {
							return null
						}
					})()}
					<UploadData onSubmit={props.onUpload} />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline'>
								Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='grid grid-cols-2'>
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className='capitalize'
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}>
											{snakeCaseToNormal(column.id)}
										</DropdownMenuCheckboxItem>
									)
								})}
						</DropdownMenuContent>
					</DropdownMenu>
					<Button variant={'outline'} onClick={props.onCreate}>
						Create
					</Button>
				</div>
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{props.loading ? (
							<TableRow>
								<TableCell
									colSpan={props.columns.length}
									className='h-24 text-center'>
									<Loading
										type='spin'
										className='mx-auto'
										width={20}
										height={20}
										color='#777'
									/>
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={props.columns.length}
									className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='mt-auto flex items-center justify-end space-x-2 py-4'>
				<div className='text-muted-foreground flex-1 text-sm'>
					{table.getFilteredSelectedRowModel().rows.length ? (
						<>
							{table.getFilteredSelectedRowModel().rows.length} of{' '}
							{table.getFilteredRowModel().rows.length} row(s) selected.
						</>
					) : (
						<>
							Showing {(props.page - 1) * props.limit + 1}-
							{(props.page - 1) * props.limit + props.data.length} of{' '}
							{props.totalDocuments} Documents
						</>
					)}
				</div>
				<div className='space-x-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => props.setPage(1)}
						disabled={props.page === 1}
						title='First Page'>
						<ChevronsLeft />
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => props.setPage(props.page - 1)}
						disabled={props.page === 1}
						title='Previous Page'>
						<ChevronLeft />
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => props.setPage(props.page + 1)}
						disabled={props.page === props.lastPage}
						title='Next Page'>
						<ChevronRight />
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => props.setPage(props.lastPage)}
						disabled={props.page === props.lastPage}
						title='Last Page'>
						<ChevronsRight />
					</Button>
				</div>
			</div>
		</>
	)
}

const ActionDropdown = (
	props: Pick<CommonTableProps, 'hideRowActions' | 'onViewDetails' | 'tableKey'> &
		Pick<CellContext<any, any>, 'row'>,
) => {
	const dropdownItems: Array<{
		key: (typeof commonTableRowActions)[number]
		item: React.ReactNode
	}> = [
		{
			key: 'view_details',
			item: (
				<DropdownMenuItem onClick={() => props.onViewDetails(props.row.index)}>
					View Details
				</DropdownMenuItem>
			),
		},
		{
			key: 'copy_details',
			item: (
				<DropdownMenuItem
					onClick={() => {
						copyObjectToClipBoard(props.row.original)
						toast.success('Copied Details')
					}}>
					Copy Details as Text
				</DropdownMenuItem>
			),
		},
		{
			key: 'duplicate',
			item: <DropdownMenuItem>Duplicate</DropdownMenuItem>,
		},
		{
			key: 'create_invoice',
			item: (
				<DropdownMenuItem>
					<a
						href={`${env.NEXT_PUBLIC_API_URL}/${props.tableKey}/invoice/${props.row.original._id}`}
						target='_blank'>
						Create Invoice & Voucher
					</a>
				</DropdownMenuItem>
			),
		},
	]

	return (
		<>
			{dropdownItems.map((item) => {
				if (props.hideRowActions && props.hideRowActions.includes(item.key)) {
					return null
				} else {
					return <React.Fragment key={item.key}>{item.item}</React.Fragment>
				}
			})}
		</>
	)
}
