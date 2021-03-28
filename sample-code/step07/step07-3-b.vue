<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

export interface User {
  nickname: string;
  email: string;
}

const userValidator = (user: User) => {
  if (!user || !user.nickname || !user.email) {
    return false;
  }

  return true;
};

@Component
export default class UserRowComponent extends Vue {
  @Prop({ required: true, validator: userValidator })
  private user!: User;
}
</script>
