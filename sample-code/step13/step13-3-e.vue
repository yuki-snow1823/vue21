<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { signInAsync } from '@/store/profile';

@Component
export default class SignInComponent extends Vue {
  /**
   * サインインします。
   */
  private async signIn() {
    try {
      await signInAsync();
      this.$router.push('/');
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
</script>
