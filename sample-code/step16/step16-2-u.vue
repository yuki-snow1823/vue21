<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="6" class="text-center">
      <p class="display-1 py-12">
        サンプルアプリケーションにサインインする
      </p>
      <div>
        <v-btn
          width="300"
          large
          color="#1DA1F2"
          class="white--text text-none"
          @click="signIn"
        >
          Sign in with SNS1
        </v-btn>
      </div>
      <div class="mt-3">
        <v-btn
          width="300"
          large
          color="#DD2A7B"
          class="white--text text-none"
          @click="signIn"
        >
          Sign in with SNS2
        </v-btn>
      </div>
      <div class="mt-3">
        <v-btn
          width="300"
          large
          color="#3B5998"
          class="white--text text-none"
          @click="signIn"
        >
          Sign in with SNS3
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { profileStore } from '@/store/profile/profile';

@Component
export default class SignInComponent extends Vue {
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
