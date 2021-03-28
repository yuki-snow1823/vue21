<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FooterComponent from '@/components/FooterComponent.vue';

@Component({
  components: {
    Footer: FooterComponent,
  },
})
export default class AppComponent extends Vue {}
</script>
