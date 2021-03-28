<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

export interface User {
  nickname: string;
  email: string;
}

type Refs<T extends object> = Vue['$refs'] & T;

@Component
export default class UserRowComponent extends Vue {
  $refs!: Refs<{
    editNickname: HTMLFormElement;
  }>;

  @Prop({ required: true })
  private user!: User;

  private editable = false;

  private edit() {
    this.editable = true;
    this.$nextTick(() => {
      // DOM更新後に実行
      (this.$refs.editNickname as HTMLFormElement).focus();
    });
  }
}
</script>
