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
// import Vue from 'vue';

// export function User(nickname, email) {
//   this.nickname = nickname;
//   this.email = email;
// }

// export default Vue.extend({
//   props: {
//     user: {
//       type: User,
//       required: true,
//     },
//   },
//   data: function() {
//     return { editable: false };
//   },
//   methods: {
//     edit: function() {
//       this.editable = true;
//       this.$nextTick(() => {
//         // DOM更新後に実行
//         this.$refs.editNickname.focus();
//       });
//     },
//   },
// });
// </script>

import { defineComponent, ref, nextTick } from '@vue/composition-api';

export function User(nickname, email) {
  this.nickname = nickname;
  this.email = email;
}

export default defineComponent({
  props: {
    user: {
      type: User,
      required: true,
    },
  },
  setup() {
    // ここが何しているのかいまいちわからない
    const editable = ref(false);
    const editNickname = ref(null);

    const edit = () => {
      editable.value = true;
      nextTick(() => {
        // DOM更新後に実行
        editNickname.value.focus();
      });
    };

    return {
      editable,
      editNickname,
      edit,
    };
  },
});
</script>

<style module>
td input {
  width: 95%;
}
</style>
