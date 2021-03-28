<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { profileStore } from '@/store/profile';

export default defineComponent({
  setup() {
    const state = reactive({
      // プロフィール
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      profile: profileStore.profile!,
      // 新しいユーザー名
      newUserName: null as string | null,
      // 新しいニックネーム
      newNickname: null as string | null,
      // 新しいテーマカラー
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      newThemeColor: profileStore.profile!.themeColor,
      // ユーザー名編集ダイアログをオープンするかどうかを示す値です。
      isOpenEditUserNameDialog: false,
      // ニックネーム編集ダイアログをオープンするかどうかを示す値です。
      isOpenEditNicknameDialog: false,
    });
    /**
     * アバターを保存します。
     * @param file アバターの画像ファイル
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    const saveFileContent = (file: File) => {};
    /**
     * テーマカラーを保存します。
     */
    const saveThemeColor = () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      profileStore.profile!.themeColor = state.newThemeColor;
    };
    /**
     * ユーザー名の編集を開始します。
     */
    const editUserName = () => {
      state.newUserName = state.profile.userName;
      state.isOpenEditUserNameDialog = true;
    };
    /**
     * ユーザー名の編集を終了します。
     */
    const closeEditUserNameDialog = () => {
      state.isOpenEditUserNameDialog = false;
    };
    /**
     * ユーザー名を保存します。
     */
    const saveUserName = () => {
      if (state.newUserName) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        profileStore.profile!.userName = state.newUserName;
      }
      state.isOpenEditUserNameDialog = false;
    };
    /**
     * ニックネームの編集を開始します。
     */
    const editNickname = () => {
      state.newNickname = state.profile.nickname;
      state.isOpenEditNicknameDialog = true;
    };
    /**
     * ニックネームの編集を終了します。
     */
    const closeEditNicknameDialog = () => {
      state.isOpenEditNicknameDialog = false;
    };
    /**
     * ニックネームを保存します。
     */
    const saveNickname = () => {
      if (state.newNickname) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        profileStore.profile!.nickname = state.newNickname;
      }
      state.isOpenEditNicknameDialog = false;
    };

    return {
      ...toRefs(state),
      saveFileContent,
      saveThemeColor,
      editUserName,
      closeEditUserNameDialog,
      saveUserName,
      editNickname,
      closeEditNicknameDialog,
      saveNickname,
    };
  },
});
</script>
