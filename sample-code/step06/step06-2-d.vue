<script> 
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const editable = ref(false);

    return {
      editable,
    };
  },
});
</script>
