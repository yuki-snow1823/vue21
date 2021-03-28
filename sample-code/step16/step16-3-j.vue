<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { profileStore } from '@/store/profile/profile';
import { MyExampleComponentParameter } from '@/components/MyExample.vue';

@Component
export default class SignInComponent extends Vue {
  private parentValue: MyExampleComponentParameter = { foo: 'foo', bar: 'bar' };
  
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
}
</script>
