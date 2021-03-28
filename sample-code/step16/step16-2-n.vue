<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { profileStore } from '@/store/profile/profile';
import { myExample } from '@/directives/my-example';

export default defineComponent({
  directives: {
    myExample,
  },
  setup(prop, context) {
    const state = reactive({
      foo: null as string | null,
      bar: null as string | null,
    });
    const exampleHandler = (event: Event) => {
      console.log(
        'event.target.value: ',
        (event.target as HTMLInputElement).value,
      );
    };
    /**
     * サインインします。
     */
    const signIn = async () => {
      try {
        await profileStore.signInAsync();
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
