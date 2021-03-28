// テスト対象の関数
import { foo } from '@/library/foo';

// foo 関数のテスト
describe('foo', () => {
  // foo 関数が true を返したときの挙動を確認するテスト
  it('function foo (validate) return true', async () => {
    // テスト対象関数を実行
    const result = await foo('123');
    // 戻り値が true であることを検証
    expect(result).toBeTruthy();
  });
  // foo 関数が false を返したときの挙動を確認するテスト
  it('function foo (validate) return false', async () => {
    // テスト対象関数を実行
    const result = await foo('1234');
    // 戻り値が false であることを検証
    expect(result).toBeFalsy();
  });
});
