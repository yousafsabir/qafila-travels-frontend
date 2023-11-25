import { HttpCommonResponse, CommonGetAllResponse } from '.'

export interface Umrah {
	_id: string
	umrah_sr_no: string
	date_of_entry: string
	invoice_number: string
	guest_name: string
	no_of_visas: number
	cost_per_visa: number
	sale_per_visa: number
	vat: number
	municipality_fee: number
	total_cost: number
	total_sales: number
	profit: number
	vendor_name: string
	group_id: string
	client_name: string
	created_at: string
	updated_at: string
}

export interface CreateUmrah extends Omit<Umrah, '_id' | 'created_at' | 'updated_at'> {}

export interface TableUmrah {
	invoice_number: string
	guest_name: string
	no_of_visas: string
	cost_per_visa: string
}

export interface GetUmrahsResponse extends CommonGetAllResponse {
	umrahs: Umrah[]
}

export interface GetUmrahResponse extends HttpCommonResponse {
	umrah: Umrah
}
