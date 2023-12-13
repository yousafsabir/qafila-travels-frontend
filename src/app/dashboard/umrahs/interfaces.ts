import { HttpCommonResponse, CommonGetAllResponse } from '@/lib/interfaces'

export class UmrahClass {
	constructor(
		public _id: string = '',
		public umrah_sr_no: string = '',
		public date_of_entry: string = '',
		public invoice_number: string = '',
		public guest_name: string = '',
		public no_of_visas: number = 123,
		public cost_per_visa: number = 123,
		public discount: number = 123,
		public sale_per_visa: number = 123,
		public vat: number = 123,
		public municipality_fee: number = 123,
		public total_cost: number = 123,
		public total_sales: number = 123,
		public profit: number = 123,
		public vendor_name: string = '',
		public group_id: string = '',
		public client_name: string = '',
		public created_at: string = '',
		public updated_at: string = '',
	) {}
}

export interface Umrah extends UmrahClass {}

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
