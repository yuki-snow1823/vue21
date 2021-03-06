<script>
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  watch,
  nextTick,
} from '@vue/composition-api';
import {
  profileStore,
  updateThemeColor,
  updateUserNameAsync,
  updateNickname,
} from '@/store/profile';
import { validate } from 'vee-validate';
import { ValidationItems } from '@/validation/validation-items';

export default defineComponent({
  setup(prop, context) {
    const state = reactive({
      userNameValidationObserver: null,
      nicknameValidationObserver: null,
      // プロフィール
      profile: profileStore.profile,
      // 新しいユーザー名
      newUserName: null,
      // 新しいニックネーム
      newNickname: null,
      // 新しいテーマカラー
      newThemeColor: profileStore.profile.themeColor,
      // ユーザー名編集ダイアログをオープンするかどうかを示す値です。
      isOpenEditUserNameDialog: false,
      // ニックネーム編集ダイアログをオープンするかどうかを示す値です。
      isOpenEditNicknameDialog: false,
      // アバターのバリデーションエラーです。
      avatarErrors: null,
      // 新しいユーザー名の保存が無効であるかどうかを示す値です。
      userNameSaveDisabled: false,
      // 新しいユーザー名の保存が無効であるかどうかを示す値です。
      nicknameSaveDisabled: false,
      // バリデーションルールです。
      validationRules: computed(() => {
        return {
          nickname: {
            required: true,
            ...ValidationItems.nickname,
          },
          userName: {
            required: true,
            ...ValidationItems.userName,
          },
          avatar: {
            ...ValidationItems.avatar,
          },
        };
      }),
    });
    /**
     * 新しいユーザー名の保存が無効かどうかを判断します。
     * 新しいユーザー名の値が変更される度に判定を行います。
     */
    watch(
      () => state.newUserName,
      () => {
        nextTick(() => {
          state.userNameValidationObserver
            .validate({ silent: true })
            .then(result => {
              state.userNameSaveDisabled = !result;
            });
        });
      },
    );
    /**
     * 新しいニックネームの保存が無効かどうかを判断します。
     * 新しいニックネームの値が変更される度に判定を行います。
     */
    watch(
      () => state.newNickname,
      () => {
        nextTick(() => {
          state.nicknameValidationObserver
            .validate({ silent: true })
            .then(result => {
              state.nicknameSaveDisabled = !result;
            });
        });
      },
    );
    // テーマカラーを更新するアクションです。
    const updateThemeColorAction = themeColor =>
      context.root.$store.dispatch('profile/updateThemeColor', themeColor);
    // ユーザー名を更新するアクションです。
    const updateUserNameAction = userName =>
      context.root.$store.dispatch('profile/updateUserName', userName);
    // ニックネームを更新するアクションです。
    const updateNicknameAction = nickname =>
      context.root.$store.dispatch('profile/updateNickname', nickname);
    /**
     * アバターを保存します。
     * @param file アバターの画像ファイル
     */
    const saveFileContent = file => {
      state.avatarErrors = null;
      if (!file) {
        // ファイル選択ダイアログでキャンセルされた場合などで、
        // ファイルが選択されていない場合は何もしない。
        return;
      }
      validate(file, state.validationRules.avatar, {
        name: 'アバター',
      }).then(result => {
        if (!result.valid) {
          state.avatarErrors = result.errors;
          return;
        }
        // バリデーション成功。WebAPIを呼び出してアバター画像を保存する。
      });
    };
    /**
     * テーマカラーを保存します。
     */
    const saveThemeColor = () => {
      updateThemeColorAction(state.newThemeColor);
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
    const saveUserName = async () => {
      try {
        if (state.newUserName) {
          await updateUserNameAction(state.newUserName);
        }
        state.isOpenEditUserNameDialog = false;
      } catch (error) {
        console.log('error: ', error.response?.data?.title);
      }
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
        updateNicknameAction(state.newNickname);
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
