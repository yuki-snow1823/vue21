<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from '@vue/composition-api';
import { profileStore } from '@/store/profile/profile';
import { MyExampleComponentParameter } from '@/components/MyExample.vue';

export default defineComponent({
  setup(prop, context) {
    console.log('親コンポーネント: created');
    const state = reactive({
      parentValue: { foo: 'foo', bar: 'bar' } as MyExampleComponentParameter,
    });
    onMounted(() => {
      console.log('親コンポーネント: mounted');
    });
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
    const customEventHandler = (value: number) => {
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
