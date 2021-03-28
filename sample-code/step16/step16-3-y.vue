<script>
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  onMounted,
} from '@vue/composition-api';

export default defineComponent({
  inheritAttrs: false,
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    console.log('子コンポーネント: created');
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
    onMounted(() => {
      console.log('子コンポーネント: mounted');
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
