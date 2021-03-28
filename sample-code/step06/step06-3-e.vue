<script>
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from '@vue/composition-api';
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
      filteredUsers: computed(() => {
        return state.users.filter(user =>
          user.nickname.includes(state.nicknameFilter),
        );
      }),
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>