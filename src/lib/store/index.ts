import { create } from 'zustand'
import { User } from '@/lib/interfaces/users'

interface StoreState {
	admin: User | null
	url: string | null
	setAdmin: (data: User | null) => void
	setUrl: (url: string | null) => void
}

const useStore = create<StoreState>()((set) => ({
	admin: null,
	url: null,
	setAdmin: (data) => set({ admin: data }),
	setUrl: (url) => set({ url: url }),
}))

export default useStore
