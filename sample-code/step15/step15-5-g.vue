<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup(prop, context) {
    /**
     * サインインします。
     */
    const signIn = async () => {
      try {
        await context.root.$store.dispatch('profile/signIn');
        context.root.$router.push('/');
      } catch (error) {
        console.log('error: ', error);
      }
    };

    return {
      signIn,
    };
  },
});
</script>
