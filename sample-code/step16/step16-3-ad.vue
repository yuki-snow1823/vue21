<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { profileStore } from '@/store/profile/profile';
import { MyExampleComponentParameter } from '@/components/MyExample.vue';

@Component({ inheritAttrs: false })
export default class SignInComponent extends Vue {
  private parentValue: MyExampleComponentParameter = { foo: 'foo', bar: 'bar' };

  private created() {
    console.log('親コンポーネント: created');
  }

  private mounted() {
    console.log('親コンポーネント: mounted');
  }

  /**
   * サインインします。
   */
  private async signIn() {
    try {
      await profileStore.signInAsync();
      this.$router.push('/');
    } catch (error) {
      console.log('error: ', error);
    }
  }

  private customEventHandler(value: number) {
    console.log('value: ', value);
  }
}
</script>
