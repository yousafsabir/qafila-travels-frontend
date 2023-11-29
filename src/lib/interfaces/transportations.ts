import { HttpCommonResponse, CommonGetAllResponse } from '.'

export type Transportation = {
	_id: string
	sr_no: string
	date_of_entry: string
	invoice_number: string
	vehicle_type: string
	arrival_time: string
	trip_segments: string
	way: string
	no_of_pax: string
	cost_per_segment: string
	vat: string
	municipality_fee: string
	sale_per_segment: string
	total_cost: string
	total_sale: string
	profit: string
	vendor_name: string
	vendor_invoice: string
	client_name: string
	reservation_status: string
}

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
