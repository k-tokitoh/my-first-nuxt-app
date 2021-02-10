import { Store, MutationTree, ActionTree } from 'vuex'
import { Auth } from 'aws-amplify'

type RootState = {
  currentUser: object | null
}

export const state: () => RootState = () => ({
  currentUser: null,
})

export const store = new Store<RootState>({})

export const mutations: MutationTree<RootState> = {
  UPDATE_CURRENT_USER: (state, payload) => (state.currentUser = payload.user),
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchCurrentUser({ commit }) {
    const user = await Auth.currentUserInfo()
    commit('UPDATE_CURRENT_USER', { user: user })
  },
}
