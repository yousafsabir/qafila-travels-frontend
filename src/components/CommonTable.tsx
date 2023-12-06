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
} from '@tanstack/react-table'
import Loading from 'react-loading'
import { ChevronRight, ChevronsRight, ChevronLeft, ChevronsLeft } from 'lucide-react'
import toast from 'react-hot-toast'

import { PAGINATION_LIMIT } from '@/lib/config'
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

export function CommonTable(props: {
	data: any
	columns: string[]
	onCreate: () => void
	onEdit: (index: number) => void
	onViewDetails: (index: number) => void
	page: number
	limit: number
	lastPage: number
	totalDocuments: number
	setPage: (page: number) => void
	setLimit: (limit: number) => void
	loading: boolean
}) {
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
								<p className='flex-1 break-words overflow-ellipsis'>
									{(value as Array<any>).join(', ')}
								</p>
							) : (
								<p
									className='flex-1 break-words overflow-ellipsis'
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
				cell: ({ row }) => {
					const index = row.index
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
									<DropdownMenuItem onClick={() => props.onViewDetails(index)}>
										View Details
									</DropdownMenuItem>
									<DropdownMenuItem>Duplicate</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => {
											copyObjectToClipBoard(row.original)
											toast.success('Copied Details')
										}}>
										Copy Details as Text
									</DropdownMenuItem>
									<DropdownMenuItem>Create Invoice & Voucher</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<Button
								variant='ghost'
								className='h-8 w-8 p-0'
								onClick={() => props.onEdit(index)}>
								<span className='sr-only'>Edit</span>
								<FileEdit className='h-4 w-4 text-green-500' />
							</Button>
							<Button variant='ghost' className='h-8 w-8 p-0'>
								<span className='sr-only'>Delete</span>
								<Trash className='h-4 w-4 text-red-500' />
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
			<div className='flex items-center py-4'>
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
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='ml-auto'>
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
				<Button variant={'outline'} onClick={props.onCreate} className='ml-4'>
					Create
				</Button>
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
