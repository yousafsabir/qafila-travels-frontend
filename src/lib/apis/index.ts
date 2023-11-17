export const apiUrls = {
	users: {
		login: 'api/auth/login',
		create: 'api/auth/create_user',
		me: 'api/auth/get_me',
		getAll: 'api/auth/get_users',
		update: 'api/auth/update_user',
		delete: 'api/auth/delete_user',
	},
	hotels: {
		create: 'hotels/add_hotels',
		getAll: 'hotels/get_hotels',
		getOne: 'hotels/get_hotel_by_id',
		deleteOne: 'hotels/delete_hotel_by_id',
		updateOne: 'hotels/update_hotel_by_id',
	},
}
