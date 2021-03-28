<template>
  <div>
    <h1>カレンダー[{{ type }}]</h1>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    type: {
      required: true,
      validator: value => {
        return ['month', 'week', 'day'].includes(value);
      },
    },
  },
});
</script>