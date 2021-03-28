<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

export class User {
  public nickname: string;
  public email: string;

  constructor(nickname: string, email: string) {
    this.nickname = nickname;
    this.email = email;
  }
}

@Component
export default class UserRowComponent extends Vue {
  @Prop({ required: true, type: User })
  private user!: User;
}
</script>
