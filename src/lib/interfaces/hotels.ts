import { HttpCommonResponse, CommonGetAllResponse } from '.'

export class HotelClass {
	constructor(
		public _id: string = '',
		public check_in_date: string = '',
		public check_out_date: string = '',
		public client_name: string = '',
		public cost_per_night: string = '',
		public date_of_entry: string = '',
		public guest_name: string = '',
		public hcn_number: string = '',
		public hotel_name: string = '',
		public hotel_sr_no: string = '',
		public invoice_number: string = '',
		public meal_plan: string = '',
		public municipality_fee: string = '',
		public number_of_nights: string = '',
		public profit: string = '',
		public reservation_status: string = '',
		public finance_status: string = '',
		public no_of_rooms: string = '',
		public room_type: string = '',
		public sales_per_night: string = '',
		public total_cost: string = '',
		public total_sales: string = '',
		public vat: string = '',
		public vendor_invoice: string = '',
		public vendor_name: string = '',
		public view: string = '',
	) {}
}

export interface Hotel extends HotelClass {}

export interface CreateHotel extends Omit<Hotel, '_id' | 'hotel_sr_no' | 'invoice_number'> {}

export interface TableHotel {
	client_name: string
	hotel_name: string
	hotel_sr_no: string
	hcn_number: string
}

export interface GetHotelsResponse extends CommonGetAllResponse {
	hotels: Hotel[]
}

export interface GetHotelResponse extends HttpCommonResponse {
	hotels: Hotel
}
