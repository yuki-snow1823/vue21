<template>
  <tr>
    <td>
      <span v-if="!editable" @click="edit()">{{ user.nickname }}</span>
      <input
        v-show="editable"
        ref="editNickname"
        v-model="user.nickname"
        @blur="editable = false"
      />
    </td>
    <td>{{ user.email }}</td>
  </tr>
</template>

<script> 
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const editable = ref(false);

    return {
      editable,
    };
  },
});
</script>

<style module>
td input {
  width: 95%;
}
</style>
