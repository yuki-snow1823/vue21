<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import {
  profileStore,
  updateThemeColor,
  updateUserNameAsync,
  updateNickname,
} from '@/store/profile';
import { validate, ValidationObserver } from 'vee-validate';
import { ValidationItems } from '@/validation/validation-items';

type Refs<T extends object> = Vue['$refs'] & T;

@Component
export default class ProfileComponent extends Vue {
  $refs!: Refs<{
    userNameValidationObserver: InstanceType<typeof ValidationObserver>;
    nicknameValidationObserver: InstanceType<typeof ValidationObserver>;
  }>;

  /**
   * プロフィール
   */
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private profile = profileStore.profile!;

  /**
   * 新しいユーザー名
   */
  private newUserName: string | null = null;

  /**
   * 新しいニックネーム
   */
  private newNickname: string | null = null;

  /**
   * 新しいテーマカラー
   */
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private newThemeColor = profileStore.profile!.themeColor;

  /**
   * ユーザー名編集ダイアログをオープンするかどうかを示す値です。
   */
  private isOpenEditUserNameDialog = false;

  /**
   * ニックネーム編集ダイアログをオープンするかどうかを示す値です。
   */
  private isOpenEditNicknameDialog = false;

  /**
   * アバターのバリデーションエラーです。
   */
  private avatarErrors: string[] | null = null;

  /**
   * 新しいユーザー名の保存が無効であるかどうかを示す値です。
   */
  private userNameSaveDisabled = false;

  /**
   * 新しいニックネームの保存が無効であるかどうかを示す値です。
   */
  private nicknameSaveDisabled = false;

  /**
   * バリデーションルールです。
   */
  private get validationRules() {
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
  }

  /**
   * 新しいユーザー名の保存が無効かどうかを判断します。
   * 新しいユーザー名の値が変更される度に判定を行います。
   */
  @Watch('newUserName')
  private validateUserName() {
    this.$nextTick(() => {
      this.$refs.userNameValidationObserver
        .validate({ silent: true })
        .then(result => {
          this.userNameSaveDisabled = !result;
        });
    });
  }

  /**
   * 新しいニックネームの保存が無効かどうかを判断します。
   * 新しいニックネームの値が変更される度に判定を行います。
   */
  @Watch('newNickname')
  private validateNickname() {
    this.$nextTick(() => {
      this.$refs.nicknameValidationObserver
        .validate({ silent: true })
        .then(result => {
          this.nicknameSaveDisabled = !result;
        });
    });
  }

  /**
   * アバターを保存します。
   * @param file アバターの画像ファイル
   */
  private saveFileContent(file: File) {
    this.avatarErrors = null;

    if (!file) {
      // ファイル選択ダイアログでキャンセルされた場合などで、
      // ファイルが選択されていない場合は何もしない。
      return;
    }

    validate(file, this.validationRules.avatar, { name: 'アバター' }).then(
      result => {
        if (!result.valid) {
          this.avatarErrors = result.errors;
          return;
        }

        // バリデーション成功。WebAPIを呼び出してアバター画像を保存する。
      },
    );
  }

  /**
   * テーマカラーを保存します。
   */
  private saveThemeColor() {
    updateThemeColor(this.newThemeColor);
  }

  /**
   * ユーザー名の編集を開始します。
   */
  private editUserName() {
    this.newUserName = this.profile.userName;
    this.isOpenEditUserNameDialog = true;
  }

  /**
   * ユーザー名の編集を終了します。
   */
  private closeEditUserNameDialog() {
    this.isOpenEditUserNameDialog = false;
  }

  /**
   * ユーザー名を保存します。
   */
  private async saveUserName() {
    try {
      if (this.newUserName) {
        await updateUserNameAsync(this.newUserName);
      }
      this.isOpenEditUserNameDialog = false;
    } catch (error) {
      console.log('error: ', error.response?.data?.title);
    }
  }

  /**
   * ニックネームの編集を開始します。
   */
  private editNickname() {
    this.newNickname = this.profile.nickname;
    this.isOpenEditNicknameDialog = true;
  }

  /**
   * ニックネームの編集を終了します。
   */
  private closeEditNicknameDialog() {
    this.isOpenEditNicknameDialog = false;
  }

  /**
   * ニックネームを保存します。
   */
  private saveNickname() {
    if (this.newNickname) {
      updateNickname(this.newNickname);
    }
    this.isOpenEditNicknameDialog = false;
  }
}
</script>
