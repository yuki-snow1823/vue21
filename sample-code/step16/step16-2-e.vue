<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { profileStore } from '@/store/profile/profile';
import { myExample } from '@/directives/my-example';

export default defineComponent({
  directives: {
    myExample,
  },
  setup(prop, context) {
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
      exampleHandler,
      signIn,
    };
  },
});
</script>
