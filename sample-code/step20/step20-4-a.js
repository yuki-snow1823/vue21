/* eslint-disable no-unused-vars */
import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
// テスト対象のコンポーネント
import FooterComponent from '@/components/Footer.vue';
// モック化対象のモジュール
import store from '@/store';

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

// store モジュールをモック化
jest.mock('@/store', () => {
  return {
    getters: jest.fn(),
  };
});

describe('Footer.vue', () => {
  let vuetify;
  // テスト実行前に Vuetify の状態、モック実装を初期化
  beforeEach(() => {
    vuetify = new Vuetify();
    store.getters = { 'profile/profile': { ...mockData.data } };
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
    // getter のモックを実装
    store.getters = { 'profile/profile': { nickname: '海平' } };
    // テスト対象のコンポーネントをマウント
    const wrapper = mountHelper(storeOptions);
    // コンポーネントの描画テキストを検証
    expect(wrapper.text()).toMatch(nickname);
  });
});
