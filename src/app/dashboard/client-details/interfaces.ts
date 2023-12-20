import { HttpCommonResponse, CommonGetAllResponse } from '@/lib/interfaces'

export class ClientDetailsClass {
	constructor(
		public _id: string = '',
		public client_name: string = '',
		public email: string = '',
		public phone_number: string = '',
		public company_name: string = '',
		public address: string = '',
		public city: string = '',
		public country: string = '',
		public client_page_link: string = '',
		public page_view: string = '',
		public nationality: string = '',
		public created_at: string = '',
		public updated_at: string = '',
	) {}
}

export interface ClientDetails extends ClientDetailsClass {}

type abc = keyof ClientDetails

export interface CreateClientDetails
	extends Omit<ClientDetails, '_id' | 'created_at' | 'updated_at'> {}

export interface GetClientsDetailsResponse extends CommonGetAllResponse {
	client_details: ClientDetails[]
}

export interface GetClientDetailsResponse extends HttpCommonResponse {
	client_details: ClientDetails
}
