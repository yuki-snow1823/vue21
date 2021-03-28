<script>
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from '@vue/composition-api';
import { profileStore } from '@/store/profile';

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
      signInUser: computed(() => {
        return profileStore.profile;
      }),
    });
    /**
     * メソッド名を指定してコンポーネントのメソッドを呼び出します。
     * @param {string} methodName 呼び出すメソッド名
     */
    const handleMethod = methodName => {
      eval(methodName)();
    };
    /**
     * 指定したパスに画面遷移を行います。
     * @param {string} path 遷移先のパス
     */
    const routerPush = path => {
      context.root.$router.push(
        path,
        () => {},
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
      profileStore.profile = null;
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
