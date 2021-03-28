/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
// テスト対象のコンポーネント
import FooterComponent from '@/components/Footer.vue';

// 単体テストで使用する Vue インスタンスを生成
const localVue = createLocalVue();

describe('Footer.vue', () => {
  let vuetify: any;
  // テスト実行前に Vuetify の状態を初期化
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('test', () => {
    // テスト対象のコンポーネントをマウント
    const wrapper = mount(FooterComponent, {
      localVue,
      vuetify,
    });
  });
});
