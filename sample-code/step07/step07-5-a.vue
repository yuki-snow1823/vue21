<script lang="ts">
import { defineComponent, ref, nextTick, PropType } from '@vue/composition-api';

export interface User {
  nickname: string;
  email: string;
}

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  setup() {
    const editable = ref(false);
    const editNickname = ref<HTMLFormElement | null>(null);

    const edit = () => {
      editable.value = true;
      nextTick(() => {
        // DOM更新後に実行
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        editNickname.value!.focus();
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
