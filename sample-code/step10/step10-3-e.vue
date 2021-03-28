<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { profileMockData } from '@/store/profile';

export default defineComponent({
  setup(prop, context) {
    const state = reactive({
      // サブメニューアイテム
      items: [
        {
          title: 'プロフィール',
          icon: 'account_circle',
          methodName: 'profile',
        },
        { title: '共有する', icon: 'share', methodName: 'share' },
      ],
      // サインインしているユーザー
      signInUser: profileMockData,
    });
    /**
     * メソッド名を指定してコンポーネントのメソッドを呼び出します。
     * @param {string} methodName 呼び出すメソッド名
     */
    const handleMethod = (methodName: string) => {
      eval(methodName)();
    };
    /**
     * 指定したパスに画面遷移を行います。
     * @param {string} path 遷移先のパス
     */
    const routerPush = (path: string) => {
      context.root.$router.push(
        path,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
      );
    };
    /**
     * プロフィール画面に遷移します。
     */
    const profile = () => {
      routerPush('/profile');
    };
    /**
     * 共有画面に遷移します。
     */
    const share = () => {
      routerPush('/share');
    };
    /**
     * サインアウトします。
     */
    const signOut = () => {
      routerPush('/sign-in');
    };

    return {
      ...toRefs(state),
      handleMethod,
      profile,
      share,
      signOut,
      routerPush,
    };
  },
});
</script>
