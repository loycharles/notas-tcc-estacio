import { create } from 'zustand'

import { Models } from 'appwrite'

type User = Models.User<Models.Preferences>

interface UserStore {
  user: User | null
}

export const useUserStore = create<UserStore>(() => ({
  user: null,
}))

const { getState, setState } = useUserStore

export const updateUser = (user: User | null) => setState({ user })

export const USER_STORE_GETTERS = {
  user: (state: UserStore) => state.user as User,
}
