import { create } from 'zustand'
import { User } from '@/lib/interfaces/users'

interface StoreState {
	admin: User | null
	setAdmin: (data: User | null) => void
}

const useStore = create<StoreState>()((set) => ({
	admin: null,
	setAdmin: (data) => set({ admin: data }),
}))

export default useStore
