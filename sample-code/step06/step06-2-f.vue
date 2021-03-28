<script>
import { defineComponent, ref, nextTick } from '@vue/composition-api';

export function User(nickname, email) {
  this.nickname = nickname;
  this.email = email;
}

export default defineComponent({
  props: {
    user: {
      type: User,
      required: true,
    },
  },
  setup() {
    const editable = ref(false);
    const editNickname = ref(null);

    const edit = () => {
      editable.value = true;
      nextTick(() => {
        // DOM更新後に実行
        editNickname.value.focus();
      });
    };

    return {
      editable,
      editNickname,
      edit,
    };
  },
});
</script>
