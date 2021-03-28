<script>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from '@vue/composition-api';

export default defineComponent({
  setup(prop, context) {
    console.log('親コンポーネント: created');
    const state = reactive({
      parentValue: { foo: 'foo', bar: 'bar' },
    });
    onMounted(() => {
      console.log('親コンポーネント: mounted');
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
    const customEventHandler = value => {
      console.log('value: ', value);
    };

    return {
      ...toRefs(state),
      signIn,
      customEventHandler,
    };
  },
});
</script>
