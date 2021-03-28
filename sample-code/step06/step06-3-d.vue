<script>
import { defineComponent, reactive } from '@vue/composition-api';
import userRowComponent, { User } from '@/components/UserRow.vue';

export default defineComponent({
  components: {
    'user-row': userRowComponent,
  },
  setup() {
    const state = reactive({
      users: [],
      nickname: '',
      email: '',
      nicknameFilter: '',
    });

    return {
      state,
    };
  },
});
</script>