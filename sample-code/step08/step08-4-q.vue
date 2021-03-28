<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import FooterComponent from '@/components/FooterComponent.vue';

export default defineComponent({
  components: {
    Footer: FooterComponent,
  },
});
</script>
