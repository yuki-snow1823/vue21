import '@/plugins/composition-api';
import { reactive } from '@vue/composition-api';
import { update } from '@/store/shared-user';

export const profileStore = reactive({ profile: null });

/**
 * ユーザー名を更新します。
 * @param userName ユーザー名
 */
export const updateUserName = userName => {
  profileStore.profile.userName = userName;
  update(profileStore.profile);
};

/**
 * ニックネームを更新します。
 * @param nickname ニックネーム
 */
export const updateNickname = nickname => {
  profileStore.profile.nickname = nickname;
  update(profileStore.profile);
};

/**
 * テーマカラーを更新します。
 * @param themeColor テーマカラー
 */
export const updateThemeColor = themeColor => {
  profileStore.profile.themeColor = themeColor;
  update(profileStore.profile);
};
