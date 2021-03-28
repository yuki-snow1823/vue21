<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { myExample } from '@/directives/my-example';

export default defineComponent({
  directives: {
    myExample,
  },
  setup(prop, context) {
    const state = reactive({
      foo: null,
      bar: null,
    });
    const exampleHandler = event => {
      console.log('event.target.value: ', event.target.value);
    };
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
      exampleHandler,
      signIn,
    };
  },
});
</script>
