<script>
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from '@vue/composition-api';
import MixinExample from '@/mixins/mixin-example';

export default defineComponent({
  mixins: [MixinExample],
  inheritAttrs: false,
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
    const click = () => {
      context.emit('custom-event', 100);
    };

    return {
      ...toRefs(state),
      click,
    };
  },
});
</script>
