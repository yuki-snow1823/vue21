<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { profileStore, profileMockData } from '@/store/profile';

@Component
export default class SignInComponent extends Vue {
  /**
   * サインインします。
   */
  private signIn() {
    profileStore.profile = profileMockData;
    this.$router.push('/');
  }
}
</script>
