<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import userRowComponent, { User } from '@/components/UserRow.vue';

@Component({
  components: {
    'user-row': userRowComponent,
  },
})
export default class EditComponent extends Vue {}
</script>
