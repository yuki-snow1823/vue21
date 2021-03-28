export const profileModule = {
  namespaced: true,
  state: {
    profile: null,
  },
  getters: {
    /**
     * プロフィールを取得します。
     */
    profile(state) {
      return state.profile;
    },
  },
  mutations: {},
  actions: {},
};
