<script> 
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const editable = ref(false);

    const edit = () => {
      this.editable = true;
      this.$nextTick(() => {
        // DOM更新後に実行
        this.$refs.editNickname.focus();
      });
    };

    return {
      editable,
      edit,
    };
  },
});
</script>
