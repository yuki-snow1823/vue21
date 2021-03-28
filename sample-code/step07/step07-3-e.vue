<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

export interface User {
  nickname: string;
  email: string;
}

@Component
export default class UserRowComponent extends Vue {
  @Prop({ required: true })
  private user!: User;

  private editable = false;

  private edit() {
    this.editable = true;
    this.$nextTick(() => {
      // DOM更新後に実行
      this.$refs.editNickname.focus();
    });
  }
}
</script>
