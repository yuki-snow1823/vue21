<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { searchUsers } from '@/store/shared-user';

@Component
export default class ShareComponent extends Vue {
  /**
   * 検索に使用するユーザーのニックネームの一部
   */
  private partOfNickname: string | null = null;

  /**
   * フィルタリングしたユーザーを取得します。
   */
  private get filteredUsers() {
    if (!this.partOfNickname) {
      return null;
    }

    return searchUsers(this.partOfNickname);
  }

  /**
   * 指定したユーザーにカレンダーを共有します。
   * @param userId カレンダーを共有するユーザーのID
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  private share(userId: string) {}
}
</script>
