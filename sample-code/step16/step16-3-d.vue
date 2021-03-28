<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

export interface MyExampleComponentParameter {
  foo: string;
  bar: string;
}

@Component
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
}
</script>
