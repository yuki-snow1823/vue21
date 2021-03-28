<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { profileStore } from '@/store/profile/profile';
import { myExample } from '@/directives/my-example';

@Component({
  directives: {
    myExample,
  },
})
export default class SignInComponent extends Vue {
  private exampleHandler(event: Event) {
    console.log(
      'event.target.value: ',
      (event.target as HTMLInputElement).value,
    );
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
}
</script>
