<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { signInAsync } from '@/store/profile';

export default defineComponent({
  setup(prop, context) {
    /**
     * サインインします。
     */
    const signIn = async () => {
      try {
        await signInAsync();
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
