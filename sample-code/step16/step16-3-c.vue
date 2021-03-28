<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  PropType,
} from '@vue/composition-api';

export interface MyExampleComponentParameter {
  foo: string;
  bar: string;
}

export default defineComponent({
  props: {
    value: {
      type: Object as PropType<MyExampleComponentParameter>,
      required: true,
    },
  },
  setup(props, context) {
    const state = reactive({
      computedFooValue: computed({
        get: () => {
          return props.value.foo;
        },
        set: value => {
          context.emit('input', {
            foo: value,
            bar: props.value.bar,
          });
        },
      }),
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
