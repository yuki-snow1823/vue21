<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

export interface MyExampleComponentParameter {
  foo: string;
  bar: string;
}

@Component({ inheritAttrs: false })
export default class MyExample extends Vue {
  @Prop({ required: true })
  private value!: MyExampleComponentParameter;

  private get computedFooValue() {
    return this.value.foo;
  }

  private set computedFooValue(value) {
    this.$emit('input', {
      foo: value,
      bar: this.value.bar,
    });
  }

  @Emit('custom-event')
  private click() {
    return 100;
  }
}
</script>
