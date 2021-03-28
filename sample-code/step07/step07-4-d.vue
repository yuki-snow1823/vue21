<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import userRowComponent, { User } from '@/components/UserRow.vue';

@Component({
  components: {
    'user-row': userRowComponent,
  },
})
export default class EditComponent extends Vue {
  private users: User[] = [];
  private nickname = '';
  private email = '';
  private nicknameFilter = '';

  public get filteredUsers() {
    return this.users.filter(user =>
      user.nickname.includes(this.nicknameFilter),
    );
  }

  private saveUser() {
    // 登録したユーザーをメモリに保持
    const user: User = {
      nickname: this.nickname,
      email: this.email,
    };
    this.users.push(user);

    // ブラウザ標準のダイアログで登録内容を表示
    alert(
      'ニックネーム: ' +
        this.nickname +
        '、メールアドレス: ' +
        this.email +
        'で登録しました。',
    );
  }

  private displayUsers() {
    let message = this.users.length + ' 人のユーザーが登録されています。';
    for (const user of this.users) {
      message += '\n' + user.nickname;
    }
    alert(message);
  }
}
</script>
