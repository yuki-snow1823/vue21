<script>
import Vue from 'vue';

export default Vue.extend({
  props: ['user'],
  data: function() {
    return { editable: false };
  },
  methods: {
    edit: function() {
      this.editable = true;
      this.$nextTick(() => {
        // DOM更新後に実行
        this.$refs.editNickname.focus();
      });
    },
  },
});
</script>
