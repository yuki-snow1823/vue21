<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from '@vue/composition-api';
import userRowComponent, { User } from '@/components/UserRow.vue';

export default defineComponent({
  components: {
    'user-row': userRowComponent,
  },
  setup() {
    const state = reactive({
      users: [] as User[],
      nickname: '',
      email: '',
      nicknameFilter: '',
      filteredUsers: computed((): User[] => {
        return state.users.filter(user =>
          user.nickname.includes(state.nicknameFilter),
        );
      }),
    });
    const saveUser = () => {
      // 登録したユーザーをメモリに保持
      const user: User = {
        nickname: state.nickname,
        email: state.email,
      };
      state.users.push(user);

      // ブラウザ標準のダイアログで登録内容を表示
      alert(
        'ニックネーム: ' +
          state.nickname +
          '、メールアドレス: ' +
          state.email +
          'で登録しました。',
      );
    };
    const displayUsers = () => {
      let message = state.users.length + ' 人のユーザーが登録されています。';
      for (const user of state.users) {
        message += '\n' + user.nickname;
      }
      alert(message);
    };

    return {
      ...toRefs(state),
      saveUser,
      displayUsers,
    };
  },
});
</script>
