import userClipboard from 'vue-clipboard3'
/**
 * # 剪切板相关
 * @author Hamm
 */
export class AirClipboard {
  /**
   * # 剪切板复制指定的内容
   * @param content 复制的内容
   */
  static async copy(content: string): Promise<unknown> {
    const { toClipboard } = userClipboard()
    return toClipboard(content)
  }
}
