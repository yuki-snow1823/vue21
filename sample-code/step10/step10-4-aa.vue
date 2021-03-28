<script>
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from '@vue/composition-api';
import { searchUsers } from '@/store/shared-user';

export default defineComponent({
  setup() {
    const state = reactive({
      // 検索に使用するユーザーのニックネームの一部
      partOfNickname: null,
      // フィルタリングしたユーザーを取得します。
      filteredUsers: computed(() => {
        if (!state.partOfNickname) {
          return null;
        }
        return searchUsers(state.partOfNickname);
      }),
    });
    /**
     * 指定したユーザーにカレンダーを共有します。
     * @param userId カレンダーを共有するユーザーのID
     */
    // eslint-disable-next-line no-unused-vars
    const share = userId => {};

    return {
      ...toRefs(state),
      share,
    };
  },
});
</script>
