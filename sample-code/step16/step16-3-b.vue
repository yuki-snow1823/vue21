<script>
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from '@vue/composition-api';

export default defineComponent({
  props: {
    value: {
      type: Object,
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
