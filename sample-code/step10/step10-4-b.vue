<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup(prop, context) {
    /**
     * サインインします。
     */
    const signIn = () => {
      context.root.$router.push('/');
    };

    return {
      signIn,
    };
  },
});
</script>
