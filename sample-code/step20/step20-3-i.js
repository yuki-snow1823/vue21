/* eslint-disable no-unused-vars */
import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
// テスト対象のコンポーネント
import FooterComponent from '@/components/Footer.vue';

// プロフィール情報のモックデータ
const nickname = '波平';
const mockData = {
  data: {
    nickname: nickname,
  },
};

// 単体テストで使用する Vue インスタンスを生成
const localVue = createLocalVue();
// インスタンスプロパティでストアにアクセスできるようにする
localVue.use(Vuex);

describe('Footer.vue', () => {
  let vuetify;
  // テスト実行前に Vuetify の状態を初期化
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  // テスト対象のコンポーネントをマウントするヘルパー関数
  const mountHelper = (storeOptions, options) => {
    return mount(FooterComponent, {
      localVue,
      vuetify,
      store: new Vuex.Store(storeOptions),
      ...options,
    });
  };

  it('test', () => {
    // モックストアを定義
    const storeOptions = {
      modules: {
        profile: {
          namespaced: true,
          getters: {
            profile: () => mockData.data,
          },
        },
      },
    };
    // テスト対象のコンポーネントをマウント
    const wrapper = mountHelper(storeOptions);
  });
});
