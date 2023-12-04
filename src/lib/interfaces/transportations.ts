import { HttpCommonResponse, CommonGetAllResponse } from '.'

export class TransportationClass {
	constructor(
		public _id: string = '',
		public sr_no: string = '',
		public date_of_entry: string = '',
		public invoice_number: string = '',
		public vehicle_type: string = '',
		public arrival_time: string = '',
		public trip_segments: string = '',
		public way: string = '',
		public no_of_pax: string = '',
		public cost_per_segment: string = '',
		public vat: string = '',
		public municipality_fee: string = '',
		public sale_per_segment: string = '',
		public total_cost: string = '',
		public total_sale: string = '',
		public profit: string = '',
		public vendor_name: string = '',
		public vendor_invoice: string = '',
		public client_name: string = '',
		public reservation_status: string = '',
	) {}
}

export type Transportation = TransportationClass

export type CreateTransportation = Omit<Transportation, '_id' | 'sr_no' | 'invoice_number'>

export type UpdateTransportation = Partial<Omit<Transportation, '_id'>>

export type TransportationTable = Pick<
	Transportation,
	'client_name' | 'date_of_entry' | 'no_of_pax' | 'total_cost'
>

export type GetTransportationResponse = HttpCommonResponse & {
	transportation: Transportation
}

export type GetTransportationsResponse = CommonGetAllResponse & {
	transportations: Transportation[]
}
