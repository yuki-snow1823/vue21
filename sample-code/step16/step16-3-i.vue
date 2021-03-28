<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { profileStore } from '@/store/profile/profile';
import { MyExampleComponentParameter } from '@/components/MyExample.vue';

export default defineComponent({
  setup(prop, context) {
    const state = reactive({
      parentValue: { foo: 'foo', bar: 'bar' } as MyExampleComponentParameter,
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

    return {
      ...toRefs(state),
      signIn,
    };
  },
});
</script>
