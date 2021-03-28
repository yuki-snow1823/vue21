<template>
  <div>
    <h1>カレンダー[{{ type }}]</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class CalendarComponent extends Vue {
  @Prop({
    required: true,
    validator: (value: string) => {
      return ['month', 'week', 'day'].includes(value);
    },
  })
  private type!: string;
}
</script>
