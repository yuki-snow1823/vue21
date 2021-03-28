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
  mutations: {
    /**
     * 新しいユーザー名を State に保存します。
     * @param userName ユーザー名
     */
    updateUserName(state, userName) {
      state.profile.userName = userName;
    },
    /**
     * 新しいニックネームを State に保存します。
     * @param nickname ニックネーム
     */
    updateNickname(state, nickname) {
      state.profile.nickname = nickname;
    },
    /**
     * 新しいテーマカラーを State に保存します。
     * @param themeColor テーマカラー
     */
    updateThemeColor(state, themeColor) {
      state.profile.themeColor = themeColor;
    },
    /**
     * プロフィールを State に保存します。
     * @param profile プロフィール
     */
    saveProfile(state, profile) {
      state.profile = profile;
    },
    /**
     * State からプロフィールをクリアします。
     */
    clearProfile(state) {
      state.profile = null;
    },
  },
  actions: {},
};
