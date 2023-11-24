import * as React from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
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

import { PAGINATION_LIMIT } from '@/lib/config'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/common/ui/table'
import { Button } from '@/components/common/ui/button'

export function CommonTable(props: {
	data: any
	columns: ColumnDef<any>[]
	onCreate: () => void
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
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})

	const table = useReactTable({
		data: props.data,
		columns: props.columns,
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
					<DropdownMenuContent align='end'>
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
										{column.id}
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
