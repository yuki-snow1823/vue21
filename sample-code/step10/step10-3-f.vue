<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { profileMockData } from '@/store/profile';

@Component
export default class FooterComponent extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;

  /**
   * サブメニューアイテム
   */
  private items = [
    { title: 'プロフィール', icon: 'account_circle', methodName: 'profile' },
    { title: '共有する', icon: 'share', methodName: 'share' },
  ];

  /**
   * サインインしているユーザー
   */
  private signInUser = profileMockData;

  /**
   * メソッド名を指定してコンポーネントのメソッドを呼び出します。
   * @param {string} methodName 呼び出すメソッド名
   */
  private handleMethod(methodName: string) {
    this[methodName]();
  }

  /**
   * 指定したパスに画面遷移を行います。
   * @param {string} path 遷移先のパス
   */
  private routerPush(path: string) {
    this.$router.push(
      path,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  }

  /**
   * プロフィール画面に遷移します。
   */
  private profile() {
    this.routerPush('/profile');
  }

  /**
   * 共有画面に遷移します。
   */
  private share() {
    this.routerPush('/share');
  }

  /**
   * サインアウトします。
   */
  private signOut() {
    this.routerPush('/sign-in');
  }
}
</script>
