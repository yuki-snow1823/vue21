<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SignInComponent extends Vue {
  /**
   * サインインします。
   */
  private signIn() {
    this.$router.push('/');
  }
}
</script>
