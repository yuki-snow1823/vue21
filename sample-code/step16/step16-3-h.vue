<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api';

export default defineComponent({
  setup(prop, context) {
    const state = reactive({
      parentValue: { foo: 'foo', bar: 'bar' },
    });
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
      ...toRefs(state),
      signIn,
    };
  },
});
</script>
