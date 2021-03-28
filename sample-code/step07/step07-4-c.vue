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
  private nicknameFilter = '';

  public get filteredUsers() {
    return this.users.filter(user =>
      user.nickname.includes(this.nicknameFilter),
    );
  }
}
</script>
