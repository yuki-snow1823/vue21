/* eslint-disable no-undef */
// テスト対象のストア
import store from '@/store/index';
// モック化対象のオブジェクト
import axios from 'axios';

// プロフィールのストアのテスト
describe('profile store', () => {
  // テスト実行前にモック化を解除し、プロフィールを初期化
  beforeEach(() => {
    jest.restoreAllMocks();
    store.commit('profile/clearProfile');
  });

  // プロフィール情報のモックデータ
  const userId = '66006b29-727e-4ed8-a3c8-95d4438f66d4';
  const userName = 'naminami';
  const mockData = {
    data: {
      userId: userId,
      userName: userName,
    },
  };

  // サインインに成功したときの挙動を確認するテスト
  it('signInAsync success', async () => {
    // axios.get をモック化
    mockAxiosGet(mockData);
    // テスト対象の action を実行
    await store.dispatch('profile/signIn');
    // getter を呼び出してプロフィール情報を取得
    const result = store.getters['profile/profile'];
    // GET で取得したレスポンスがプロフィール情報に反映されていることを検証
    expect(result?.userId).toBe(userId);
    expect(result?.userName).toBe(userName);
  });
  // ユーザー名の更新に成功したときの挙動を確認するテスト
  it('updateUserNameAction success', async () => {
    // サインインしている状態がテストの前提条件（sessionStorage はテスト対象外）
    store.state.profile.profile = { ...mockData.data };
    // axios.patch が HTTP ステータスコード 200 を返却するようにモック化
    mockAxiosPatch({ status: 200 });
    // 更新後のユーザー名
    const userName = 'naminami2';
    // テスト対象の action を実行
    await store.dispatch('profile/updateUserName', userName);
    // getter を呼び出してプロフィール情報を取得
    const result = store.getters['profile/profile'];
    // ユーザー名の変更が反映されていることを検証
    expect(result?.userName).toBe(userName);
  });
  // ユーザー名の更新に失敗したときの挙動を確認するテスト
  it('updateUserNameAction fail', async () => {
    // サインインしている状態がテストの前提条件（sessionStorage はテスト対象外）
    store.state.profile.profile = { ...mockData.data };
    // axios.patch が例外をスローするようにモック化
    jest.spyOn(axios, 'patch').mockImplementation(() => {
      throw new Error();
    });
    // テスト対象の action を実行し、例外がスローされることを確認
    await expect(
      store.dispatch('profile/updateUserName', 'fune'),
    ).rejects.toThrow();
    // getter を呼び出してプロフィール情報を取得
    const result = store.getters['profile/profile'];
    // ユーザー名の変更が反映されていないことを検証
    expect(result?.userName).toBe(userName);
  });
});
