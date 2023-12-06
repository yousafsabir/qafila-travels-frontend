export const apiUrls = {
	users: {
		login: 'api/auth/login',
		create: 'api/auth/create_user',
		me: 'api/auth/get_me',
		getAll: 'api/auth/get_users',
		update: 'api/auth/update_user',
		deleteMultiple: 'api/auth/delete_users',
	},
	hotels: {
		create: 'hotels/add_hotels',
		getAll: 'hotels/get_hotels',
		getOne: 'hotels/get_hotel_by_id',
		deleteMultiple: 'hotels/delete_hotels',
		updateOne: 'hotels/update_hotel_by_id',
	},
	umrahs: {
		create: 'umrahs',
		getAll: 'umrahs',
		getOne: 'umrahs',
		updateOne: 'umrahs',
		deleteMultiple: 'umrahs/delete_umrahs',
	},
	transportations: {
		create: 'transportations/add_transportations',
		getAll: 'transportations/get_transportations',
		getOne: 'transportations/get_transportation_by_id',
		updateOne: 'transportations/update_transportation_by_id',
		deleteMultiple: 'transportations/delete_transportations',
	},
}
