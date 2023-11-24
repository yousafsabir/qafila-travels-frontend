export interface HttpError {
	status: number
	message: string
}

export interface HttpCommonResponse {
	message: string
	status: number
}

export interface Pagination {
	page: number
	limit: number
	last_page: number
	total_count: number
}

export interface CommonGetAllResponse extends HttpCommonResponse {
	pagination: Pagination
}
