<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Profile } from '@/store/profile.model';
import { profileStore } from '@/store/profile';

@Component
export default class ProfileComponent extends Vue {
  /**
   * プロフィール
   */
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private profile: Profile = profileStore.profile!;

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
   * アバターを保存します。
   * @param file アバターの画像ファイル
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  private saveFileContent(file: File) {}

  /**
   * テーマカラーを保存します。
   */
  private saveThemeColor() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    profileStore.profile!.themeColor = this.newThemeColor;
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
  private saveUserName() {
    if (this.newUserName) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      profileStore.profile!.userName = this.newUserName;
    }
    this.isOpenEditUserNameDialog = false;
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      profileStore.profile!.nickname = this.newNickname;
    }
    this.isOpenEditNicknameDialog = false;
  }
}
</script>
