<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  watch,
  nextTick,
} from '@vue/composition-api';
import { validate, ValidationObserver } from 'vee-validate';
import { ValidationItems } from '@/validation/validation-items';
import { profileStore } from '@/store/profile/profile';

export default defineComponent({
  setup() {
    const state = reactive({
      editUserNameDialogOverlay: false,
      userNameValidationObserver: null as InstanceType<
        typeof ValidationObserver
      > | null,
      nicknameValidationObserver: null as InstanceType<
        typeof ValidationObserver
      > | null,
      // プロフィール
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      profile: profileStore.getProfile!,
      // 新しいユーザー名
      newUserName: null as string | null,
      // 新しいニックネーム
      newNickname: null as string | null,
      // 新しいテーマカラー
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      newThemeColor: profileStore.getProfile!.themeColor,
      // ユーザー名編集ダイアログをオープンするかどうかを示す値です。
      isOpenEditUserNameDialog: false,
      // ニックネーム編集ダイアログをオープンするかどうかを示す値です。
      isOpenEditNicknameDialog: false,
      // アバターのバリデーションエラーです。
      avatarErrors: null as string[] | null,
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
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          state
            .userNameValidationObserver!.validate({ silent: true })
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
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          state
            .nicknameValidationObserver!.validate({ silent: true })
            .then(result => {
              state.nicknameSaveDisabled = !result;
            });
        });
      },
    );
    /**
     * アバターを保存します。
     * @param file アバターの画像ファイル
     */
    const saveFileContent = (file: File) => {
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
      profileStore.updateThemeColorAsync(state.newThemeColor);
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
      if (state.newUserName) {
        state.editUserNameDialogOverlay = true;
        try {
          await profileStore.updateUserNameAsync(state.newUserName);
        } finally {
          state.editUserNameDialogOverlay = false;
        }
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
        profileStore.updateNicknameAsync(state.newNickname);
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
