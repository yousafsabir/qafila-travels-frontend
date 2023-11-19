import { HttpCommonResponse } from '.'

export interface Hotel {
	_id: string
	check_in_date: string
	check_out_date: string
	client_name: string
	cost_per_night: string
	date_of_entry: string
	guest_name: string
	hcn_number: string
	hotel_name: string
	hotel_sr_no: string
	invoice_number: string
	meal_plan: string
	municipality_fee: string
	number_of_nights: string
	profit: string
	reservation_status: string
	room_type: string
	sales_per_night: string
	total_cost: string
	total_sales: string
	vat: string
	vendor_invoice: string
	vendor_name: string
	view: string
}

export interface CreateHotel {
	SNo: string
	DateOfEntry: string
	InvoiceNumber: string
	GuestName: string
	CheckInDate: string
	CheckoutDate: string
	NumberOfNights: string
	RoomType: string
	View: string
	MealPlan: string
	HotelName: string
	CostPerNight: string
	SalesPerNight: string
	TotalCost: string
	VATPercent: string
	MunicipalityFeePercent: string
	TotalSales: string
	Profit: string
	VendorName: string
	VendorInvoiceNumber: string
	ClientName: string
	HCNNumber: string
	ReservationStatus: string
}

export interface TableHotel {
	client_name: string
	hotel_name: string
	hotel_sr_no: string
	hcn_number: string
}

export interface GetHotelsResponse extends HttpCommonResponse {
	hotels: Hotel[]
}

export interface GetHotelResponse extends HttpCommonResponse {
	hotels: Hotel
}
