<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from '@vue/composition-api';
import { searchUsers } from '@/store/shared-user';
import { SharedUser } from '@/store/shared-user.model';

export default defineComponent({
  setup() {
    const state = reactive({
      // 検索に使用するユーザーのニックネームの一部
      partOfNickname: null as string | null,
      // フィルタリングしたユーザーを取得します。
      filteredUsers: computed((): SharedUser[] | null => {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    const share = (userId: string) => {};

    return {
      ...toRefs(state),
      share,
    };
  },
});
</script>
