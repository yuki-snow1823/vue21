<script>
import { defineComponent } from '@vue/composition-api';
import { profileStore, profileMockData } from '@/store/profile';

export default defineComponent({
  setup(prop, context) {
    /**
     * サインインします。
     */
    const signIn = () => {
      profileStore.profile = profileMockData;
      context.root.$router.push('/');
    };

    return {
      signIn,
    };
  },
});
</script>
